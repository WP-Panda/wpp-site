#!/usr/bin/env python3
"""Статический снапшот вёрстки v2.wp-panda.pro: все страницы -> markup-v2/**/*.html.

Обход: sitemap'ы WordPress + ссылки со страниц. HTML сохраняется как есть
(ассеты остаются абсолютными URL на живой сайт).
"""
import os
import re
import sys
import time
import urllib.request
import urllib.parse
import urllib.error

BASE = os.environ.get("SNAPSHOT_BASE", "https://v2.wp-panda.pro")
HOST = urllib.parse.urlsplit(BASE).netloc
OUT = os.environ.get("SNAPSHOT_OUT", "markup-v2")
MAX_PAGES = int(os.environ.get("SNAPSHOT_MAX_PAGES", "500"))
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")

SKIP_PREFIX = ("/wp-admin", "/wp-login.php", "/wp-json", "/xmlrpc.php",
               "/feed", "/author/", "/?s=", "/wp-content/plugins/akismet")
ASSET_EXT = (".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico", ".css",
             ".js", ".mjs", ".zip", ".rar", ".7z", ".pdf", ".doc", ".docx",
             ".xml", ".json", ".woff", ".woff2", ".ttf", ".eot", ".otf",
             ".mp4", ".webm", ".mp3", ".csv", ".txt")

HREF_RE = re.compile(r"""href\s*=\s*["']([^"'#]+)["']""", re.I)
LOC_RE = re.compile(r"<loc>\s*([^<\s]+)\s*</loc>", re.I)


def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.headers.get("Content-Type", ""), r.read()


def norm(url):
    """Канонический URL страницы: https, без фрагмента и query."""
    p = urllib.parse.urlsplit(url)
    path = urllib.parse.unquote(p.path) or "/"
    return urllib.parse.urlsplit(BASE)._replace(
        scheme="https", netloc=HOST, path=path, query="", fragment=""
    ).geturl()


def is_page_url(url):
    p = urllib.parse.urlsplit(url)
    if p.netloc not in (HOST, "www." + HOST):
        return False
    path = p.path
    if path.startswith(SKIP_PREFIX):
        return False
    if path.lower().endswith(ASSET_EXT):
        return False
    return True


def relpath_for(url):
    path = urllib.parse.urlsplit(url).path
    path = urllib.parse.unquote(path)
    if path.endswith(".html") or path.endswith(".htm"):
        path = path.rsplit(".", 1)[0]
    if not path.endswith("/"):
        path += "/"
    rel = path.lstrip("/") + "index.html"
    if rel.startswith("/") or ".." in rel:
        raise ValueError("bad path: " + rel)
    return os.path.join(OUT, rel)


def collect_sitemap_urls():
    """Рекурсивно обходим sitemap'ы (wp-sitemap.xml и классические)."""
    found, queue = set(), ["/wp-sitemap.xml", "/sitemap_index.xml", "/sitemap.xml"]
    seen_sitemaps = set()
    while queue:
        sm = queue.pop(0)
        url = norm(sm)
        if url in seen_sitemaps:
            continue
        seen_sitemaps.add(url)
        try:
            _, ctype, body = fetch(url)
        except Exception as e:
            print("sitemap skip", url, e)
            continue
        if "xml" not in ctype and not body.lstrip().startswith(b"<?xml"):
            continue
        locs = [norm(u) for u in LOC_RE.findall(body.decode("utf-8", "replace"))]
        for loc in locs:
            if loc.endswith(".xml") or "sitemap" in urllib.parse.urlsplit(loc).path:
                queue.append(loc)
            elif is_page_url(loc):
                found.add(loc)
        time.sleep(0.1)
    return found


def main():
    os.makedirs(OUT, exist_ok=True)
    queue = sorted(collect_sitemap_urls()) + [norm("/")]
    seen = set(queue)
    saved, failed = [], []

    while queue and len(saved) < MAX_PAGES:
        url = queue.pop(0)
        try:
            status, ctype, body = fetch(url)
        except Exception as e:
            failed.append((url, str(e)))
            continue
        if status != 200 or "html" not in ctype.lower():
            failed.append((url, f"status={status} ctype={ctype}"))
            continue

        rel = relpath_for(url)
        os.makedirs(os.path.dirname(rel), exist_ok=True)
        with open(rel, "wb") as f:
            f.write(body)
        saved.append((url, rel))

        html_text = body.decode("utf-8", "replace")
        for href in HREF_RE.findall(html_text):
            href = href.strip()
            if href.startswith(("mailto:", "tel:", "javascript:", "data:")):
                continue
            absu = urllib.parse.urljoin(url if url.endswith("/") else url + "/", href)
            n = norm(absu)
            if is_page_url(n) and n not in seen:
                seen.add(n)
                queue.append(n)
        time.sleep(0.2)

    with open(os.path.join(OUT, "manifest.tsv"), "w", encoding="utf-8") as f:
        f.write("url\tfile\n")
        for url, rel in sorted(saved):
            f.write(f"{url}\t{os.path.relpath(rel, OUT)}\n")

    with open(os.path.join(OUT, "snapshot.txt"), "w", encoding="utf-8") as f:
        f.write(f"Источник: {BASE}\n")
        f.write(f"Страниц сохранено: {len(saved)}\n")
        f.write("HTML сохранён как есть; ссылки на ассеты — абсолютные на живой сайт.\n")

    if failed:
        with open(os.path.join(OUT, "failed.txt"), "w", encoding="utf-8") as f:
            for url, why in failed:
                f.write(f"{url}\t{why}\n")

    print(f"OK: страниц={len(saved)}, ошибок={len(failed)}")
    for url, rel in sorted(saved)[:60]:
        print(" ", url, "->", os.path.relpath(rel, OUT))
    if len(saved) > 60:
        print(f"  … и ещё {len(saved) - 60}")


if __name__ == "__main__":
    sys.exit(main())
