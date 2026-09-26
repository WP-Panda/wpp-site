/**
 * Генератор «статичных» копий компонентов для SSR-экспорта вёрстки.
 *
 * Копирует нужные файлы из src/ в scripts/prerender/gen-src/ и применяет
 * точечные текстовые патчи:
 *  - условные панели (меню/поиск/аккордеоны/модалки) рендерятся всегда,
 *    чтобы весь контент попал в статичный HTML;
 *  - добавляются data-* крючки для assets/js/main.js;
 *  - createPortal заменяется на обычный рендер (порталы не работают в SSR).
 *
 * Запуск: node scripts/prerender/patches.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const src = (p) => path.join(root, 'src', p);
const out = (p) => path.join(root, 'scripts/prerender/gen-src', p);

fs.mkdirSync(path.dirname(out('x')), { recursive: true });

const replacements = [];

/** Проверить и применить строковую замену (ожидаемое число вхождений). */
function patch(text, from, to, expect = 1, label = String(from).slice(0, 60)) {
  const parts = text.split(from);
  if (parts.length - 1 !== expect) {
    throw new Error(`Патч «${label}»: найдено ${parts.length - 1}, ожидалось ${expect}`);
  }
  replacements.push(`  ✓ ${label}`);
  return parts.join(to);
}

/** То же через регулярку. */
function patchRe(text, re, to, expect = 1, label = String(re).slice(0, 60)) {
  const n = (text.match(re) || []).length;
  if (n !== expect) throw new Error(`Патч «${label}»: найдено ${n}, ожидалось ${expect}`);
  replacements.push(`  ✓ ${label}`);
  return text.replace(re, to);
}

/** Переписать относительные импорты под новое расположение файла. */
function rewriteImports(text, origin) {
  // './x' -> src/<origin>/x ; '../x' -> src/x
  text = text.replace(/from '(\.\.?\/[^']+)'/g, (m, spec) => {
    const abs = path.posix.normalize(spec.startsWith('./') ? `${origin}/${spec.slice(2)}` : spec.slice(3));
    return `from '../../../src/${abs}'`;
  });
  return text;
}

function make(file, origin, fn) {
  let text = fs.readFileSync(src(file), 'utf8');
  replacements.length = 0;
  text = rewriteImports(text, origin);
  text = fn(text);
  const flat = path.basename(file).replace(/\.tsx?$/, '.static.tsx');
  fs.writeFileSync(out(flat), text);
  console.log(`${file} -> gen-src/${flat}`);
  for (const r of replacements) console.log(r);
}

/* ------------------------------------------------------------------ */
/* Header: панели поиска/уведомлений/меню рендерятся всегда            */
/* ------------------------------------------------------------------ */
make('components/Header.tsx', 'components', (t) => {
  t = patch(t, '{search && (', '{true && (', 1, 'поиск — рендерить всегда');
  t = patch(t, '{bell && (', '{true && (', 1, 'уведомления — рендерить всегда');
  t = patch(t, '{menu && !checkout && (', '{true && (', 1, 'мобильное меню — рендерить всегда');
  t = patch(
    t,
    '{menu ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}',
    '<X className="js-icon-open hidden h-[18px] w-[18px]" />\n                <Menu className="js-icon-closed h-[18px] w-[18px]" />',
    1,
    'иконки бургер/крестик — обе в разметке',
  );
  t = patch(t, '                        autoFocus\n', '', 1, 'убран autoFocus у поиска');
  return t;
});

/* ------------------------------------------------------------------ */
/* FAQ: ответы всех вопросов в разметке                                */
/* ------------------------------------------------------------------ */
make('pages/Faq.tsx', 'pages', (t) => {
  t = patch(t, '{isOpen && (', '{true && (', 1, 'ответы FAQ — рендерить всегда');
  return t;
});

/* ------------------------------------------------------------------ */
/* Галерея товара: без портала + все слайды в разметке                 */
/* ------------------------------------------------------------------ */
make('components/GalleryModal.tsx', 'components', (t) => {
  t = patch(t, 'return createPortal(', 'return (', 1, 'галерея: createPortal -> обычный рендер');
  t = patchRe(t, /\n\s*document\.body,\n\s*\);/, '\n  );\n', 1, 'галерея: убран второй аргумент портала');
  t = patch(
    t,
    `<div key={slide.key} className="fade-in mx-auto w-full" style={slide.kind === 'media' ? { maxWidth: 'min(100%, calc((100dvh - 235px) * 1.6))' } : undefined}>
            <ProductGallerySlide product={p} index={index} className="aspect-[16/10]" />
          </div>`,
    `{slides.map((s, i) => (
            <div key={s.key} data-slide={i} hidden={i !== index} className="mx-auto w-full" style={s.kind === 'media' ? { maxWidth: 'min(100%, calc((100dvh - 235px) * 1.6))' } : undefined}>
              <ProductGallerySlide product={p} index={i} className="aspect-[16/10]" />
            </div>
          ))}`,
    1,
    'галерея: все слайды в разметке',
  );
  t = patch(t, '{index + 1} / {slides.length}', '<span data-slide-counter>{index + 1}</span> / {slides.length}', 2, 'галерея: счётчики слайдов');
  t = patch(
    t,
    '<div className="truncate text-xs text-muted">{slide.label} — {slide.desc}</div>',
    '<div className="truncate text-xs text-muted">\n                {slides.map((s, i) => (<span key={i} data-slide-label={i} className="hidden">{s.label} — {s.desc}</span>))}\n                <span data-slide-label-current>{slide.label} — {slide.desc}</span>\n              </div>',
    1,
    'галерея: подписи всех слайдов',
  );
  return t;
});

/* ------------------------------------------------------------------ */
/* Предпросмотр товара: без портала                                    */
/* ------------------------------------------------------------------ */
make('components/ProductPreviewDialog.tsx', 'components', (t) => {
  t = patch(t, 'return createPortal(', 'return (', 1, 'предпросмотр: createPortal -> обычный рендер');
  t = patchRe(t, /\n\s*document\.body,\n\s*\);/, '\n  );\n', 1, 'предпросмотр: убран второй аргумент портала');
  t = patch(t, 'type="button" autoFocus onClick={onClose}', 'type="button" onClick={onClose}', 1, 'предпросмотр: убран autoFocus');
  return t;
});

/* ------------------------------------------------------------------ */
/* Блог: «Читайте также» — тематически близкие посты                   */
/* ------------------------------------------------------------------ */
make('pages/Blog.tsx', 'pages', (t) => {
  t = patch(
    t,
    'const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);',
    `const related = posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ post: p, score: (p.category === post.category ? 2 : 0) + (p.product === post.product ? 2 : 0) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.post)
    .slice(0, 3);`,
    1,
    'блог: тематические «Читайте также»',
  );
  return t;
});

/* ------------------------------------------------------------------ */
/* Товар: блок «Статьи о продукте» со ссылками на посты                */
/* ------------------------------------------------------------------ */
make('pages/Product.tsx', 'pages', (t) => {
  t = patch(t, "{galleryOpen && <GalleryModal", '{true && <GalleryModal', 1, 'галерея — рендерить всегда');
  t = patch(t, "{previewOpen && <ProductPreviewDialog", '{true && <ProductPreviewDialog', 1, 'предпросмотр — рендерить всегда');

  // Табы: все панели в HTML, каждая обёрнута в div[data-tabpanel]
  t = patch(
    t,
    "{tab === 'details' && <ProductDescription product={p} onGallery={showGallery} onChangelog={() => selectTab('changelog')} />}",
    "{true && <div data-tabpanel=\"details\"><ProductDescription product={p} onGallery={showGallery} onChangelog={() => selectTab('changelog')} /></div>}",
    1,
    'таб «Описание» — в разметке',
  );
  t = patch(t, "{tab === 'reviews' && <ProductReviews product={p} newReviews={newReviews} onAdd={addReview} />}",
    '{true && <div hidden data-tabpanel="reviews"><ProductReviews product={p} newReviews={newReviews} onAdd={addReview} /></div>}',
    1, 'таб «Отзывы» — в разметке');
  t = patch(t, "{tab === 'comments' && <ProductComments questions={questions} onAdd={addQuestion} />}",
    '{true && <div hidden data-tabpanel="comments"><ProductComments questions={questions} onAdd={addQuestion} /></div>}',
    1, 'таб «Комментарии» — в разметке');
  t = patch(t, "{tab === 'changelog' && <ProductChangelog product={p} />}",
    '{true && <div hidden data-tabpanel="changelog"><ProductChangelog product={p} /></div>}',
    1, 'таб «Changelog» — в разметке');

  // Крючки для JS: цена / старая цена / скидка / кнопки покупки
  t = patch(t, 'aria-live="polite">{rub(price)}', 'aria-live="polite" data-price>{rub(price)}', 1, 'data-price');
  t = patch(t, '<span className="text-sm text-muted line-through">{rub(oldPrice)}</span>',
    '<span className="text-sm text-muted line-through" data-oldprice>{rub(oldPrice)}</span>', 1, 'data-oldprice');
  t = patch(t, '<span className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-[#906500]">-{discount}%</span>',
    '<span className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-[#906500]" data-discount>-{discount}%</span>', 1, 'data-discount');
  t = patch(t, '<Button size="lg" className="mt-6 w-full" onClick={onAdd}>',
    '<Button size="lg" className="mt-6 w-full" onClick={onAdd} data-buy>', 1, 'data-buy (сайдбар)');
  t = patch(t, '<Button variant="outline" className="mt-2.5 w-full" onClick={onBuy}>',
    '<Button variant="outline" className="mt-2.5 w-full" onClick={onBuy} data-buynow>', 1, 'data-buynow');
  t = patch(t, 'action={<Button onClick={add}>', 'action={<Button onClick={add} data-buy>', 1, 'data-buy (sticky)');

  // Импорты модалок -> статичные версии без порталов (после rewriteImports)
  t = patch(t, "from '../../../src/components/GalleryModal'", "from './GalleryModal.static'", 1, 'импорт GalleryModal.static');
  t = patch(t, "from '../../../src/components/ProductPreviewDialog'", "from './ProductPreviewDialog.static'", 1, 'импорт ProductPreviewDialog.static');

  // Перелинковка: статьи о продукте
  t = patch(t, 'productBySlug, products, themeLicenses,', 'productBySlug, products, posts, themeLicenses,', 1, 'импорт posts');
  t = patch(
    t,
    'const related = products.filter((item) => item.type === p.type && item.id !== p.id).slice(0, 4);',
    `const related = products.filter((item) => item.type === p.type && item.id !== p.id).slice(0, 4);
  const productPosts = posts.filter((post) => post.product === p.slug);`,
    1,
    'список статей о продукте',
  );
  t = patch(
    t,
    `<div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>`,
    `<div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>

      {productPosts.length > 0 && (
        <section className="mt-16 border-t border-line pt-9">
          <p className="text-xs text-muted">Блог и база знаний</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Статьи о {p.name}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productPosts.map((post) => (
              <a key={post.slug} href={'blog-' + post.slug + '.html'} className="group rounded-card border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-float">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{post.category} · {post.date}</div>
                <div className="mt-2 text-base font-semibold leading-snug tracking-tight group-hover:underline">{post.title}</div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition group-hover:text-ink">Читать <ArrowRight className="h-4 w-4" /></div>
              </a>
            ))}
          </div>
        </section>
      )}`,
    1,
    'блок «Статьи о продукте»',
  );
  return t;
});

/* ------------------------------------------------------------------ */
/* Статья БЗ: блок «Связанные статьи»                                  */
/* ------------------------------------------------------------------ */
make('pages/KnowledgeBase.tsx', 'pages', (t) => {
  t = patch(t, '{isOpen && (', '{true && (', 1, 'списки статей в сайдбаре — всегда');
  t = patch(
    t,
    'const nextA = kbArticles[idx + 1];',
    `const nextA = kbArticles[idx + 1];
  const relatedArts = kbArticles.filter((a) => a.category === art.category && a.id !== art.id).slice(0, 3);`,
    1,
    'список связанных статей',
  );
  t = patch(
    t,
    '{nextA && (',
    `{relatedArts.length > 0 && (
              <section className="mt-14">
                <h2 className="text-xl font-bold tracking-tight">Связанные статьи</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {relatedArts.map((a) => (
                    <a key={a.id} href={'kb-' + a.id + '.html'} className="rounded-card border border-line bg-white p-5 shadow-card transition hover:border-ink/20">
                      <div className="text-sm font-semibold leading-snug">{a.title}</div>
                      <div className="mt-2 text-xs text-muted">{a.read} · обновлено {a.updated}</div>
                    </a>
                  ))}
                </div>
              </section>
            )}
            {nextA && (`,
    1,
    'блок «Связанные статьи»',
  );
  return t;
});

console.log('\nВсе патчи применены.');
