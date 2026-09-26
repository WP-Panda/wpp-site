import { useState } from 'react';
import { ArrowRight, Bookmark, Check, ChevronLeft, ChevronRight, Clock, Link2, Mail, Search, Share2, TriangleAlert } from 'lucide-react';
import { useApp } from '../context';
import { posts, productBySlug, type Post } from '../data';
import { ProductMedia } from '../components/ProductMedia';
import { Button, CopyButton, Crumbs, EmptyBox, IconButton, PageTitle, Pill, Segmented, rub } from '../components/ui';
import { cn } from '../utils/cn';

export function PostCard({ post }: { post: Post }) {
  const { navigate } = useApp();
  return (
    <article
      onClick={() => navigate('post', post.slug)}
      className="group flex cursor-pointer flex-col rounded-card border border-line bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          <Pill icon={<Clock className="h-3 w-3" />}>{post.readTime}</Pill>
          <Pill>{post.category}</Pill>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight decoration-brand decoration-2 underline-offset-4 group-hover:underline">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2.5 pt-4">
          <img src={post.author.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
          <div className="text-xs">
            <div className="font-semibold">{post.author.name}</div>
            <div className="text-muted">{post.date}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <div className="dark-card relative overflow-hidden rounded-card p-8 text-white sm:p-10">
      <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Рассылка Wp Panda</div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Лучшие статьи и скидки — раз в неделю</h3>
          <p className="mt-2 text-white/65">Без спама. Только полезные гайды, релизы и промокоды для подписчиков.</p>
        </div>
        {sent ? (
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-ink">
              <Check className="h-5 w-5" strokeWidth={3} />
            </span>
            <div>
              <div className="font-semibold">Вы подписаны!</div>
              <div className="text-sm text-white/60">Первое письмо придёт в понедельник.</div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <div className="flex h-14 flex-1 items-center gap-2 rounded-full bg-white/10 px-5 ring-1 ring-white/15 focus-within:ring-brand">
              <Mail className="h-4 w-4 text-white/50" />
              <input required type="email" placeholder="you@example.ru" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40" />
            </div>
            <Button type="submit" size="lg">
              Подписаться
            </Button>
          </form>
        )}
      </div>
      <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full border-[36px] border-white/5" />
    </div>
  );
}

const POSTS_PER_PAGE = 6;

export function Blog() {
  const { navigate } = useApp();
  const [cat, setCat] = useState('Все');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const cats = ['Все', ...Array.from(new Set(posts.map((p) => p.category)))];
  const featured = posts[0];
  const isDefaultView = cat === 'Все' && !q.trim();
  const list = posts.filter((p) => (cat === 'Все' || p.category === cat) && `${p.title} ${p.excerpt}`.toLowerCase().includes(q.trim().toLowerCase()));
  // На главной выборке первая статья — featured, остальные листаем; при фильтре/поиске листаем всё найденное
  const pool = isDefaultView ? list.slice(1) : list;
  const totalPages = Math.max(1, Math.ceil(pool.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const grid = pool.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);
  const showFeatured = isDefaultView && safePage === 1;

  const handleCat = (c: string) => {
    setCat(c);
    setPage(1);
  };
  const handleSearch = (v: string) => {
    setQ(v);
    setPage(1);
  };
  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12">
      <PageTitle eyebrow="Журнал Wp Panda" title="Блог" subtitle="Гайды, обзоры и новости WordPress — для владельцев сайтов, дизайнеров и разработчиков." />

      <div className="no-scrollbar -mx-4 mt-8 overflow-x-auto px-4 sm:mx-auto sm:max-w-[920px] sm:px-0">
        <Segmented className="min-w-max md:min-w-0" size="sm" value={cat} onChange={handleCat} options={cats.map((c) => ({ value: c, label: c }))} />
      </div>
      <div className="mx-auto mt-4 flex h-12 max-w-md items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
        <Search className="h-4 w-4 text-muted" />
        <input value={q} onChange={(e) => handleSearch(e.target.value)} placeholder="Поиск по статьям" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" />
      </div>

      {showFeatured && (
        <article
          onClick={() => navigate('post', featured.slug)}
          className="group mt-12 grid cursor-pointer overflow-hidden rounded-card border border-line bg-white p-2.5 shadow-card transition hover:shadow-float lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img src={featured.image} alt="" className="h-full min-h-[260px] w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute left-3 top-3 flex gap-1.5">
              <Pill>Выбор редакции</Pill>
              <Pill icon={<Clock className="h-3 w-3" />}>{featured.readTime}</Pill>
            </div>
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-8">
            <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold ring-1 ring-brand-100">{featured.category}</span>
            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight decoration-brand decoration-2 underline-offset-4 group-hover:underline sm:text-[32px]">{featured.title}</h2>
            <p className="mt-3 text-muted">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={featured.author.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="text-sm">
                <div className="font-semibold">{featured.author.name}</div>
                <div className="text-xs text-muted">
                  {featured.date} · {featured.views} просмотров
                </div>
              </div>
              <span className="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-brand group-hover:text-ink">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </article>
      )}

      <div id="blog-grid" className="scroll-mt-24" />

      {grid.length > 0 ? (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Пагинация блога" className="mt-10 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  aria-label="Предыдущая страница"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition hover:border-ink/25 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => goToPage(n)}
                    aria-label={`Страница ${n}`}
                    aria-current={n === safePage ? 'page' : undefined}
                    className={cn(
                      'h-11 min-w-11 rounded-full px-3 text-sm font-semibold tabular-nums transition',
                      n === safePage
                        ? 'bg-ink text-white shadow-card'
                        : 'border border-line bg-white text-ink hover:border-ink/25',
                    )}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  aria-label="Следующая страница"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition hover:border-ink/25 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted tabular-nums">
                Страница {safePage} из {totalPages} · показано {grid.length} из {pool.length} статей
              </p>
            </nav>
          )}
        </>
      ) : (
        <div className="mt-10">
          <EmptyBox icon={<Search className="h-6 w-6" />} title="Статей не найдено" text="Попробуйте другой запрос или выберите другую рубрику." />
        </div>
      )}

      <div className="mt-16">
        <Newsletter />
      </div>
    </div>
  );
}

const SNIPPET = `<?php
// functions.php дочерней темы
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() . '/style.css'
    );
    wp_enqueue_style(
        'child-style',
        get_stylesheet_uri(),
        [ 'parent-style' ],
        wp_get_theme()->get( 'Version' )
    );
} );`;

const h2 = 'mt-12 scroll-mt-28 text-2xl font-bold tracking-tight text-ink sm:text-[28px]';

export function BlogPost() {
  const { route, navigate, addToCart, inCart } = useApp();
  const post = posts.find((p) => p.slug === route.param) ?? posts[0];
  const product = productBySlug(post.product);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const [active, setActive] = useState('intro');
  const toc = [
    { id: 'intro', t: 'С чего начать' },
    { id: 'criteria', t: 'Ключевые критерии' },
    { id: 'steps', t: 'Пошаговый план' },
    { id: 'code', t: 'Полезный сниппет' },
    { id: 'mistakes', t: 'Частые ошибки' },
    { id: 'summary', t: 'Итоги' },
  ];
  const goTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6">
      <Crumbs items={[{ label: 'Главная', onClick: () => navigate('home') }, { label: 'Блог', onClick: () => navigate('blog') }, { label: post.category }]} />

      <header className="fade-up mx-auto mt-8 max-w-3xl text-center">
        <div className="flex justify-center gap-2">
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold">{post.category}</span>
          <span className="flex items-center gap-1 rounded-full bg-soft px-3 py-1 text-xs font-medium text-muted">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>
        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <img src={post.author.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
          <div className="text-left text-sm">
            <div className="font-semibold">{post.author.name}</div>
            <div className="text-xs text-muted">
              {post.date} · {post.views} просмотров
            </div>
          </div>
        </div>
      </header>

      <div className="mt-10 overflow-hidden rounded-card border border-line bg-white p-2 shadow-card">
        <img src={post.image.replace('w=900&h=560', 'w=1600&h=700')} alt="" className="aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[21/9]" />
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 text-[16px] leading-[1.8] text-ink/85">
          <p className="text-lg leading-relaxed text-ink">
            WordPress остаётся самой популярной платформой для сайтов: на нём работает больше 40% интернета. Но именно из-за огромного выбора тем и плагинов легко ошибиться и
            потерять недели на переделки. Разбираемся, как принимать решения быстро и без сожалений.
          </p>

          <h2 id="intro" className={h2}>
            С чего начать
          </h2>
          <p className="mt-4">
            Сначала сформулируйте цель сайта: продажи, заявки, контент или портфолио. От этого зависит всё остальное — от структуры страниц до набора плагинов. Запишите 3–5
            ключевых сценариев пользователя и держите их перед глазами.
          </p>
          <p className="mt-4">Затем проверьте ограничения: бюджет, сроки, хостинг и то, кто будет поддерживать сайт после запуска. Это поможет отсеять заведомо неподходящие решения.</p>

          <h2 id="criteria" className={h2}>
            Ключевые критерии
          </h2>
          <ul className="mt-5 space-y-3">
            {[
              ['Скорость', 'тема должна набирать 90+ в PageSpeed без дополнительной оптимизации'],
              ['Совместимость', 'поддержка Gutenberg, WooCommerce и популярных конструкторов'],
              ['Обновления', 'релизы хотя бы раз в квартал и быстрые фиксы под новые версии WordPress'],
              ['Поддержка', 'живые люди, которые отвечают в течение дня, а не через неделю'],
              ['Документация', 'подробные инструкции и видео, чтобы не зависеть от разработчика'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>
                  <b className="text-ink">{t}</b> — {d}
                </span>
              </li>
            ))}
          </ul>

          <blockquote className="mt-8 rounded-2xl border-l-4 border-brand bg-brand-50 p-6 text-lg font-medium leading-relaxed text-ink">
            «Хорошая тема — не та, в которой больше всего настроек, а та, которая быстро загружается и не мешает вам продавать».
            <span className="mt-3 block text-sm font-normal text-muted">
              — {post.author.name}, {post.author.role}
            </span>
          </blockquote>

          <h2 id="steps" className={h2}>
            Пошаговый план
          </h2>
          <div className="mt-5 space-y-3">
            {[
              ['Изучите демо на телефоне', 'Больше половины трафика — мобильный. Откройте демо на смартфоне и пройдите ключевые сценарии.'],
              ['Проверьте скорость демо', 'Прогоните главную и внутренние страницы через PageSpeed Insights и сравните результаты.'],
              ['Почитайте историю версий', 'Регулярные обновления — лучший индикатор того, что продукт живой и поддерживается.'],
              ['Задайте вопрос в поддержку', 'Скорость и качество ответа до покупки многое скажут о сервисе после неё.'],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold ring-1 ring-brand-100">{i + 1}</span>
                <div>
                  <div className="font-semibold text-ink">{t}</div>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 id="code" className={h2}>
            Полезный сниппет
          </h2>
          <p className="mt-4">Добавьте этот код в functions.php дочерней темы, чтобы правильно подключить стили родительской темы и не потерять правки при обновлении:</p>
          <div className="mt-4 overflow-hidden rounded-2xl bg-ink">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <span className="font-mono text-xs text-white/50">functions.php</span>
              <CopyButton text={SNIPPET} className="border-white/15 bg-white/5 text-white hover:border-white/30" />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#E6E6EA]">
              <code>{SNIPPET}</code>
            </pre>
          </div>

          <h2 id="mistakes" className={h2}>
            Частые ошибки
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ['Правки в родительской теме', 'Все изменения пропадут после обновления. Используйте дочернюю тему.'],
              ['20+ плагинов «на всякий случай»', 'Каждый лишний плагин замедляет сайт и добавляет уязвимостей.'],
              ['Nulled-версии', 'Взломанные темы часто содержат вредоносный код и не получают обновлений.'],
              ['Отказ от резервных копий', 'Настройте автоматические бэкапы до первого обновления.'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-rose-50/60 p-5 ring-1 ring-rose-100">
                <div className="flex items-center gap-2 font-semibold text-ink">
                  <TriangleAlert className="h-4 w-4 flex-shrink-0 text-rose-500" />
                  {t}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>

          <h2 id="summary" className={h2}>
            Итоги
          </h2>
          <p className="mt-4">
            Выбирайте продукты, которые регулярно обновляются, быстро работают и сопровождаются нормальной поддержкой. Это сэкономит больше денег, чем любая скидка на старте.
          </p>

          <div className="mt-8 flex flex-col gap-4 rounded-card border border-line bg-white p-3 shadow-card sm:flex-row sm:items-center">
            <div className="w-full overflow-hidden rounded-2xl sm:w-48">
              <ProductMedia product={product} />
            </div>
            <div className="flex-1 px-2 sm:px-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Упомянуто в статье</div>
              <div className="mt-1 text-lg font-semibold">{product.name}</div>
              <div className="text-sm leading-relaxed text-muted">{product.tagline}</div>
            </div>
            <div className="flex gap-2 px-2 pb-2 sm:flex-col sm:p-0 sm:pr-3">
              <Button onClick={() => addToCart(product.id)}>{inCart(product.id) ? 'В корзине' : `В корзину · ${rub(product.price)}`}</Button>
              <Button variant="ghost" onClick={() => navigate('product', product.slug)}>
                Подробнее
              </Button>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <div className="flex flex-wrap gap-2">
              {['WordPress', post.category, 'WooCommerce'].map((t) => (
                <span key={t} className="rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-muted">
                  #{t}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <IconButton aria-label="Поделиться">
                <Share2 className="h-4 w-4" />
              </IconButton>
              <IconButton aria-label="Скопировать ссылку">
                <Link2 className="h-4 w-4" />
              </IconButton>
              <IconButton aria-label="В закладки">
                <Bookmark className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 rounded-card bg-soft p-5">
            <img src={post.author.avatar} alt="" className="h-14 w-14 rounded-full object-cover" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Автор</div>
              <div className="font-semibold">{post.author.name}</div>
              <div className="text-sm text-muted">{post.author.role} в Wp Panda. Пишет о WordPress с 2014 года.</div>
            </div>
          </div>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-card border border-line bg-white p-5 shadow-card">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Содержание</div>
            <nav className="mt-3 space-y-1">
              {toc.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goTo(t.id)}
                  className={cn('flex w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left text-sm font-medium transition', active === t.id ? 'bg-ink text-white' : 'text-ink/75 hover:bg-soft')}
                >
                  <span className={cn('flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold', active === t.id ? 'bg-brand text-ink' : 'bg-soft')}>{i + 1}</span>
                  {t.t}
                </button>
              ))}
            </nav>
          </div>
          <div className="dark-card rounded-card p-6 text-white">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Для читателей блога</div>
            <div className="mt-2 text-2xl font-bold">−30% на первый заказ</div>
            <p className="mt-1 text-sm text-white/65">
              Промокод <b className="text-brand">WELCOME30</b> действует на все темы и плагины.
            </p>
            <Button className="mt-5 w-full" onClick={() => navigate('shop')} arrow>
              В каталог
            </Button>
          </div>
        </aside>
      </div>

      <section className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight">Читайте также</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
