import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Code,
  CreditCard,
  Eye,
  FileText,
  Info,
  KeyRound,
  LifeBuoy,
  Palette,
  Plug,
  RefreshCw,
  Rocket,
  Search,
  ShoppingBag,
  ThumbsDown,
  ThumbsUp,
  Timer,
  TrendingUp,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '../context';
import { kbArticles, kbCategories, productById } from '../data';
import { ProductMedia, ProductThumb } from '../components/ProductMedia';
import { Button, CheckBadge, CopyButton, Crumbs, IconCircle, PageTitle, SectionCard } from '../components/ui';
import { cn } from '../utils/cn';

const KB_ICONS: Record<string, LucideIcon> = {
  rocket: Rocket,
  key: KeyRound,
  refresh: RefreshCw,
  palette: Palette,
  plug: Plug,
  bag: ShoppingBag,
  card: CreditCard,
  code: Code,
};
const catTitle = (id: string) => kbCategories.find((c) => c.id === id)?.title ?? '';

export function KnowledgeBase() {
  const { navigate } = useApp();
  const [q, setQ] = useState('');
  const results = q.trim() ? kbArticles.filter((a) => a.title.toLowerCase().includes(q.trim().toLowerCase())) : [];
  const popular = [...kbArticles].sort((a, b) => b.views - a.views).slice(0, 8);

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12">
      <PageTitle eyebrow="Документация и инструкции" title="База знаний" subtitle="Ответы на частые вопросы, инструкции по установке и настройке тем и плагинов Wp Panda.">
        <div className="relative mx-auto mt-8 max-w-2xl text-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (results[0]) navigate('kb-article', results[0].id);
            }}
            className="flex items-center gap-2 rounded-full border border-line bg-white p-2 pl-5 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15"
          >
            <Search className="h-5 w-5 flex-shrink-0 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Например: как активировать ключ"
              className="h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted/70"
            />
            <Button type="submit" className="h-12 px-6">
              Найти
            </Button>
          </form>
          {q.trim() && (
            <div className="fade-up absolute inset-x-0 top-full z-20 mt-2 rounded-card border border-line bg-white p-2 shadow-float">
              {results.length ? (
                results.slice(0, 6).map((a) => (
                  <button key={a.id} onClick={() => navigate('kb-article', a.id)} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-soft">
                    <FileText className="h-4 w-4 flex-shrink-0 text-muted" />
                    <span className="flex-1 text-sm font-medium">{a.title}</span>
                    <span className="text-xs text-muted">{a.read}</span>
                  </button>
                ))
              ) : (
                <div className="p-5 text-center text-sm text-muted">
                  Ничего не найдено —{' '}
                  <button onClick={() => navigate('account', 'new-ticket')} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
                    спросите поддержку
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            ['Активация ключа', 'license-key'],
            ['Импорт демо', 'demo-import'],
            ['Белый экран', 'white-screen'],
            ['Дочерняя тема', 'child-theme'],
          ].map(([t, id]) => (
            <button key={id} onClick={() => navigate('kb-article', id)} className="rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-brand-50 hover:text-ink">
              {t}
            </button>
          ))}
        </div>
      </PageTitle>

      <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kbCategories.map((c) => {
          const I = KB_ICONS[c.icon] ?? FileText;
          const arts = kbArticles.filter((a) => a.category === c.id).slice(0, 3);
          return (
            <div key={c.id} className="flex flex-col rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
              <div className="flex items-center justify-between">
                <IconCircle tone="brand" className="h-12 w-12">
                  <I className="h-5 w-5" />
                </IconCircle>
                <span className="rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold text-muted">{c.count} статей</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">{c.desc}</p>
              <ul className="mt-4 flex-1 space-y-2 border-t border-line pt-4">
                {arts.map((a) => (
                  <li key={a.id}>
                    <button onClick={() => navigate('kb-article', a.id)} className="flex w-full items-start gap-2 text-left text-sm text-ink/80 transition hover:text-ink">
                      <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" />
                      {a.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="mt-16 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <SectionCard
          title="Популярные статьи"
          right={
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <TrendingUp className="h-3.5 w-3.5" />
              за 30 дней
            </span>
          }
        >
          <div className="divide-y divide-line">
            {popular.map((a, i) => (
              <button key={a.id} onClick={() => navigate('kb-article', a.id)} className="group flex w-full items-center gap-4 py-3.5 text-left first:pt-0 last:pb-0">
                <span className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold', i < 3 ? 'bg-brand' : 'bg-soft')}>{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium decoration-brand decoration-2 underline-offset-4 group-hover:underline">{a.title}</span>
                  <span className="text-xs text-muted">
                    {catTitle(a.category)} · обновлено {a.updated}
                  </span>
                </span>
                <span className="hidden items-center gap-1 text-xs text-muted sm:flex">
                  <Eye className="h-3.5 w-3.5" />
                  {(a.views / 1000).toFixed(1).replace('.', ',')}K
                </span>
                <ChevronRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </SectionCard>
        <div className="space-y-5">
          <SectionCard title="Документация продуктов">
            <div className="space-y-1">
              {[1, 2, 9, 11, 12].map((id) => {
                const p = productById(id);
                return (
                  <button
                    key={id}
                    onClick={() => navigate('kb-article', p.type === 'theme' ? 'install-theme' : 'seo-setup')}
                    className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-soft"
                  >
                    <ProductThumb product={p} className="h-10 w-10 rounded-xl" />
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{p.name}</span>
                      <span className="text-xs text-muted">
                        {12 + id * 3} статей · v{p.version}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted" />
                  </button>
                );
              })}
            </div>
          </SectionCard>
          <div className="dark-card rounded-card p-6 text-white">
            <IconCircle tone="yellow" className="h-12 w-12">
              <LifeBuoy className="h-5 w-5" />
            </IconCircle>
            <h3 className="mt-5 text-xl font-semibold">Не нашли ответ?</h3>
            <p className="mt-1.5 text-sm text-white/65">Создайте тикет — инженеры поддержки ответят в среднем за 12 минут.</p>
            <Button className="mt-5 w-full" onClick={() => navigate('account', 'new-ticket')} arrow>
              Написать в поддержку
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const h2 = 'mt-12 scroll-mt-28 text-2xl font-bold tracking-tight';
const WP_CONFIG = `// wp-config.php
define( 'WPP_LICENSE_KEY', 'WPP-XXXX-XXXX-XXXX' );
define( 'WP_MEMORY_LIMIT', '256M' );`;

export function KbArticle() {
  const { route, navigate } = useApp();
  const art = kbArticles.find((a) => a.id === route.param) ?? kbArticles[0];
  const cat = kbCategories.find((c) => c.id === art.category) ?? kbCategories[0];
  const [open, setOpen] = useState(cat.id);
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);
  const idx = kbArticles.findIndex((a) => a.id === art.id);
  const prev = kbArticles[idx - 1];
  const nextA = kbArticles[idx + 1];
  const toc = ['Перед началом', 'Скачайте архив', 'Установка', 'Активация лицензии', 'Если что-то пошло не так'];
  const scrollTo = (i: number) => document.getElementById(`kb-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6">
      <Crumbs items={[{ label: 'База знаний', onClick: () => navigate('kb') }, { label: cat.title, onClick: () => navigate('kb') }, { label: art.title }]} />

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_210px]">
        {/* Навигация по разделам */}
        <aside className="hidden lg:sticky lg:top-24 lg:block">
          <div className="rounded-card border border-line bg-white p-2 shadow-card">
            {kbCategories.map((c) => {
              const I = KB_ICONS[c.icon] ?? FileText;
              const isOpen = open === c.id;
              return (
                <div key={c.id}>
                  <button onClick={() => setOpen(isOpen ? '' : c.id)} className="flex w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left text-sm font-semibold transition hover:bg-soft">
                    <span className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full', c.id === cat.id ? 'bg-brand' : 'bg-soft')}>
                      <I className="h-4 w-4" />
                    </span>
                    <span className="flex-1 leading-tight">{c.title}</span>
                    <ChevronDown className={cn('h-4 w-4 text-muted transition', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <div className="mb-2 ml-5 mt-1 space-y-0.5 border-l border-line pl-3">
                      {kbArticles
                        .filter((a) => a.category === c.id)
                        .map((a) => (
                          <button
                            key={a.id}
                            onClick={() => navigate('kb-article', a.id)}
                            className={cn(
                              'block w-full rounded-2xl px-3 py-1.5 text-left text-[13px] leading-snug transition',
                              a.id === art.id ? 'bg-ink font-semibold text-white' : 'text-ink/70 hover:bg-soft hover:text-ink',
                            )}
                          >
                            {a.title}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Статья */}
        <article className="min-w-0 text-ink/85">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-ink ring-1 ring-brand-100">{cat.title}</span>
            <span className="text-xs text-muted">
              Обновлено {art.updated} · {art.read} чтения
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[44px] sm:leading-[1.1]">{art.title}</h1>
          <p className="mt-4 text-lg text-muted">
            В этой инструкции — всё, что нужно сделать после покупки: от скачивания архива до активации лицензии и автообновлений. Займёт не больше 10 минут.
          </p>

          <div id="kb-0" className="mt-8 flex scroll-mt-28 items-start gap-3 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div className="text-[15px] leading-relaxed">
              <b className="text-ink">Перед началом.</b> Убедитесь, что на сервере WordPress 6.2+ и PHP 8.0+, а лимит памяти — не меньше 256 МБ. Проверить это можно в разделе
              «Инструменты → Здоровье сайта».
            </div>
          </div>

          <h2 id="kb-1" className={cn(h2, 'text-ink')}>
            1. Скачайте архив
          </h2>
          <p className="mt-3 leading-relaxed">
            Откройте{' '}
            <button onClick={() => navigate('account', 'downloads')} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
              Личный кабинет → Загрузки
            </button>{' '}
            и нажмите «Скачать .zip» рядом с нужным продуктом. Архив распаковывать не нужно.
          </p>

          <h2 id="kb-2" className={cn(h2, 'text-ink')}>
            2. Установка
          </h2>
          <div className="mt-4 space-y-3">
            {[
              ['Откройте консоль WordPress', 'Перейдите в «Внешний вид → Темы» (для плагинов — «Плагины → Добавить новый»).'],
              ['Загрузите архив', 'Нажмите «Добавить новую → Загрузить тему», выберите ZIP-файл и нажмите «Установить».'],
              ['Активируйте тему', 'После установки нажмите «Активировать» — появится мастер первоначальной настройки.'],
              ['Импортируйте демо', 'В мастере выберите демо-сайт и нажмите «Импортировать». Процесс занимает 1–3 минуты.'],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">{i + 1}</span>
                <div>
                  <div className="font-semibold text-ink">{t}</div>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <figure className="mt-6 overflow-hidden rounded-card border border-line bg-white p-2 shadow-card">
            <div className="overflow-hidden rounded-2xl">
              <ProductMedia product={productById(1)} />
            </div>
            <figcaption className="px-3 py-2.5 text-center text-xs text-muted">Так выглядит сайт после импорта демо «Agency» темы Aurora</figcaption>
          </figure>

          <h2 id="kb-3" className={cn(h2, 'text-ink')}>
            3. Активация лицензии
          </h2>
          <p className="mt-3 leading-relaxed">
            Перейдите в «Wp Panda → Лицензия» и вставьте ключ из личного кабинета. На сайтах с ограниченным доступом к админке ключ можно указать константой в wp-config.php:
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl bg-ink">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <span className="font-mono text-xs text-white/50">wp-config.php</span>
              <CopyButton text={WP_CONFIG} className="border-white/15 bg-white/5 text-white hover:border-white/30" />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#E6E6EA]">
              <code>{WP_CONFIG}</code>
            </pre>
          </div>

          <h2 id="kb-4" className={cn(h2, 'text-ink')}>
            Если что-то пошло не так
          </h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-rose-50/60 p-5 ring-1 ring-rose-100">
              <div className="flex items-center gap-2 font-semibold text-ink">
                <TriangleAlert className="h-4 w-4 text-rose-500" />
                Ошибка «Архив не содержит style.css»
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">Вы загружаете полный пакет вместо архива темы. Распакуйте скачанный файл — внутри лежит aurora.zip, его и нужно загрузить.</p>
            </div>
            <div className="rounded-2xl bg-soft p-5">
              <div className="flex items-center gap-2 font-semibold text-ink">
                <Timer className="h-4 w-4" />
                Импорт демо останавливается на середине
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">Увеличьте max_execution_time до 300 секунд в панели хостинга и запустите импорт повторно — загруженные файлы пропустятся.</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-card border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center">
            {vote ? (
              <div className="flex items-center gap-3">
                <CheckBadge className="ring-0" />
                <div>
                  <div className="font-semibold text-ink">Спасибо за отзыв!</div>
                  <div className="text-sm text-muted">{vote === 'yes' ? 'Рады, что статья помогла.' : 'Мы доработаем статью. Нужна помощь прямо сейчас?'}</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="font-semibold text-ink">Была ли статья полезной?</div>
                <div className="text-sm text-muted">Ваш ответ поможет улучшить базу знаний</div>
              </div>
            )}
            {!vote ? (
              <div className="flex gap-2">
                <Button variant="soft" onClick={() => setVote('yes')}>
                  <ThumbsUp className="h-4 w-4" />
                  Да
                </Button>
                <Button variant="soft" onClick={() => setVote('no')}>
                  <ThumbsDown className="h-4 w-4" />
                  Нет
                </Button>
              </div>
            ) : (
              vote === 'no' && (
                <Button variant="dark" onClick={() => navigate('account', 'new-ticket')} arrow>
                  В поддержку
                </Button>
              )
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <button onClick={() => navigate('kb-article', prev.id)} className="rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:border-ink/20">
                <div className="flex items-center gap-1 text-xs text-muted">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Предыдущая
                </div>
                <div className="mt-1 font-semibold text-ink">{prev.title}</div>
              </button>
            ) : (
              <span />
            )}
            {nextA && (
              <button onClick={() => navigate('kb-article', nextA.id)} className="rounded-card border border-line bg-white p-5 text-right shadow-card transition hover:border-ink/20">
                <div className="flex items-center justify-end gap-1 text-xs text-muted">
                  Следующая
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
                <div className="mt-1 font-semibold text-ink">{nextA.title}</div>
              </button>
            )}
          </div>
        </article>

        {/* На этой странице */}
        <aside className="hidden xl:sticky xl:top-24 xl:block">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">На этой странице</div>
          <nav className="mt-3 space-y-1 border-l border-line">
            {toc.map((t, i) => (
              <button key={t} onClick={() => scrollTo(i)} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-left text-[13px] text-muted transition hover:border-brand hover:text-ink">
                {t}
              </button>
            ))}
          </nav>
          <div className="mt-6 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
            <div className="text-sm font-semibold">Нужна помощь?</div>
            <p className="mt-1 text-xs text-muted">Ответим в среднем за 12 минут</p>
            <Button size="sm" className="mt-3 w-full" onClick={() => navigate('account', 'new-ticket')}>
              Создать тикет
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
