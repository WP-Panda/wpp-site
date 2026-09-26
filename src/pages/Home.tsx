import { useState } from 'react';
import { ArrowRight, Check, Gauge, Headphones, RefreshCw, ShieldCheck } from 'lucide-react';
import { useApp } from '../context';
import { posts, productById, productBySlug, products, solutions, testimonials, themeLicenses } from '../data';
import { ProductCard } from '../components/ProductCard';
import { ProductMedia, ProductThumb } from '../components/ProductMedia';
import { Button, CheckBadge, IconCircle, SectionHead, Segmented, Stars } from '../components/ui';
import { cn } from '../utils/cn';
import { PostCard } from './Blog';

const FEATURED = [1, 9, 2, 11, 7, 12, 4, 15];

export function Home() {
  const { navigate } = useApp();
  const [type, setType] = useState<'all' | 'theme' | 'plugin'>('all');
  const [picked, setPicked] = useState(0);
  const list = type === 'all' ? FEATURED.map((id) => productById(id)) : products.filter((p) => p.type === type).slice(0, 8);

  return (
    <div>
      {/* Full-bleed Wp Panda hero */}
      <section className="panda-hero relative isolate flex min-h-[440px] items-center overflow-hidden border-b border-line sm:min-h-[500px] lg:min-h-[540px]">
        <img
          src="/images/wp-panda-hero.png"
          alt="Рабочее место Wp Panda с макетом магазина WordPress на экране"
          fetchPriority="high"
          className="panda-hero__image absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="panda-hero__shade absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 py-11 sm:px-8 sm:py-14 lg:px-6 lg:py-16">
          <div className="fade-up max-w-[540px]">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              <span className="h-2 w-2 rounded-full bg-brand" />
              Темы и плагины для WordPress
            </div>
            <h1 className="mt-5 text-[52px] font-extrabold leading-[0.95] tracking-[-0.065em] text-ink sm:mt-6 sm:text-[72px] lg:text-[84px]">
              Wp Panda<span className="text-brand">.</span>
            </h1>
            <p className="mt-4 max-w-[460px] text-base leading-relaxed text-ink/70 sm:mt-5 sm:text-lg">
              Всё для WordPress в одном месте. Темы на 1 или 5 сайтов, плагины с лицензией навсегда.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
              <Button size="lg" onClick={() => navigate('shop')} arrowCircle>
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('shop', 'theme')}>
                Темы для WordPress
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED: marketplace item cards */}
      <section className="mx-auto mt-20 max-w-[1200px] px-4 sm:px-6">
        <SectionHead center title="Популярное на этой неделе" subtitle="Темы на 1 или 5 сайтов · Плагины навсегда" />
        <div className="mx-auto mt-7 max-w-[560px]">
          <Segmented
            value={type}
            onChange={setType}
            options={[
              { value: 'all', label: 'Все' },
              { value: 'theme', label: 'Темы' },
              { value: 'plugin', label: 'Плагины' },
            ]}
          />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" onClick={() => navigate('shop', type === 'all' ? undefined : type)} arrow>
            Смотреть весь каталог
          </Button>
        </div>
      </section>

      {/* BUNDLE */}
      <section className="mx-auto mt-16 max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col items-start gap-5 rounded-card border border-line bg-white p-5 shadow-card sm:p-6 md:flex-row md:items-center">
          <div className="flex -space-x-4">
            {['aurora', 'seo-rocket', 'vesta', 'turbocache'].map((s) => (
              <ProductThumb key={s} product={productBySlug(s)} className="h-14 w-14 rounded-full border-[3px] border-white shadow-sm" />
            ))}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold tracking-tight">Wp Panda All Access</h3>
              <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold">−70%</span>
            </div>
            <p className="mt-1 text-sm text-muted">Все темы и все плагины с пожизненным доступом ко всем будущим релизам.</p>
          </div>
          <div className="flex w-full items-center justify-between gap-4 md:w-auto">
            <div className="text-left md:text-right">
              <div className="text-xs text-muted line-through">99 900 ₽</div>
              <div className="text-xl font-bold">
                29 990 ₽<span className="text-sm font-medium text-muted"> навсегда</span>
              </div>
            </div>
            <Button size="lg" arrowCircle onClick={() => navigate('shop')}>
              Подробнее
            </Button>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <SectionHead title="Решения под вашу задачу" subtitle="Подобрали темы и плагины для самых популярных типов сайтов — выберите свой сценарий." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => {
            const p = productBySlug(s.slug);
            const sel = picked === i;
            return (
              <button
                key={s.title}
                onMouseEnter={() => setPicked(i)}
                onFocus={() => setPicked(i)}
                onClick={() => navigate('product', p.slug)}
                className={cn(
                  'relative rounded-card border bg-white p-2.5 pt-5 text-left transition-all duration-300',
                  sel ? 'border-brand shadow-picked ring-1 ring-brand' : 'border-line shadow-card',
                )}
              >
                <div className="flex items-start justify-between gap-2 px-2.5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-0.5 text-[13px] text-muted">{s.subtitle}</p>
                  </div>
                  {sel && <CheckBadge className="ring-0" />}
                </div>
                <div className="relative mt-4 overflow-hidden rounded-2xl">
                  <ProductMedia product={p} />
                  <div className={cn('absolute inset-x-3 bottom-3 transition-all duration-300', sel ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')}>
                    <span className="flex h-12 items-center justify-between rounded-full bg-brand pl-5 pr-1.5 text-sm font-semibold shadow-glow">
                      Смотреть {p.name}
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
          <div className="dark-card relative overflow-hidden rounded-card p-8 text-white sm:p-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Почему Wp Panda</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Плагины навсегда, темы на 1 или 5 сайтов</h2>
            <p className="mt-4 max-w-md text-white/70">Никаких скрытых платежей. Плагины покупаются один раз и навсегда. Темы — с честной лицензией на нужное число сайтов.</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                ['Навсегда', 'для плагинов'],
                ['1 или 5', 'сайтов для тем'],
                ['12 мин', 'ответ поддержки'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-brand sm:text-3xl">{v}</div>
                  <div className="text-xs text-white/60">{l}</div>
                </div>
              ))}
            </div>
            <Button className="mt-8" size="lg" arrow onClick={() => navigate('shop')}>
              Выбрать продукт
            </Button>
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[32px] border-white/5" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { icon: RefreshCw, t: 'Автообновления', d: 'Обновляйте темы и плагины в один клик прямо из консоли WordPress.' },
              { icon: Headphones, t: 'Поддержка от авторов', d: 'Отвечают разработчики продукта, а не бот. В среднем — за 12 минут.' },
              { icon: Gauge, t: 'PageSpeed 95+', d: 'Чистый код без лишних скриптов: быстрые сайты прямо из коробки.' },
              { icon: ShieldCheck, t: 'Покупка без подписок', d: 'Темы на 1 или 5 сайтов, плагины с лицензией навсегда.' },
            ].map((f) => (
              <div key={f.t} className="rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
                <IconCircle tone="brand" className="h-12 w-12">
                  <f.icon className="h-5 w-5" />
                </IconCircle>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОСТЫЕ УСЛОВИЯ */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <SectionHead center title="Прозрачные условия" subtitle="Два простых формата покупки: темы на 1 или 5 сайтов, плагины — навсегда" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* Темы */}
          <div className="rounded-card border-2 border-brand bg-white p-7 shadow-picked">
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">Темы WordPress</span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight">1 сайт или 5 сайтов</h3>
            <p className="mt-2 text-sm text-muted">Каждая тема продаётся с выбором количества сайтов:</p>
            <div className="mt-6 space-y-3">
              {themeLicenses.map((l) => (
                <div key={l.id} className="flex items-center justify-between rounded-2xl bg-soft p-4">
                  <div>
                    <div className="font-semibold text-ink">{l.name}</div>
                    <div className="text-xs text-muted">{l.desc}</div>
                  </div>
                  <span className="text-sm font-bold text-ink">{l.sites}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-6 w-full" onClick={() => navigate('shop', 'theme')}>
              Выбрать тему
            </Button>
          </div>

          {/* Плагины */}
          <div className="dark-card rounded-card p-7 text-white shadow-float flex flex-col justify-between">
            <div>
              <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink">Плагины WordPress</span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">Лицензия навсегда</h3>
              <p className="mt-2 text-sm text-white/70">
                Все плагины Wp Panda продаются с пожизненным доступом. Покупаете один раз — пользуетесь бессрочно.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/85">
                {[
                  'Один платёж без ежегодных продлений',
                  'Все будущие обновления плагина включены',
                  'Неограниченное использование на ваших проектах',
                  'Техническая поддержка от разработчиков',
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <Button size="lg" className="mt-6 w-full" onClick={() => navigate('shop', 'plugin')}>
              Выбрать плагин
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <SectionHead center title="Отзывы владельцев сайтов" subtitle="Реальный опыт людей, которые строят свои проекты на Wp Panda." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-card border border-line bg-white p-6 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <Stars value={5} />
                <span className="rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-muted">{t.product}</span>
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/85">«{t.text}»</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
        <SectionHead
          title="Свежее в блоге"
          subtitle="Гайды, обзоры и новости мира WordPress"
          action={
            <Button variant="outline" onClick={() => navigate('blog')} arrow>
              Все статьи
            </Button>
          }
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
