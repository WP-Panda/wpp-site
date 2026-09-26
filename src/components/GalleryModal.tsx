import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronLeft, ChevronRight, ListChecks, Palette, Plug, SlidersHorizontal, X } from 'lucide-react';
import type { Product } from '../data';
import { cn } from '../utils/cn';
import { ProductMedia, pluginIcon } from './ProductMedia';
import { Pill } from './ui';

export type GallerySlide = {
  key: string;
  label: string;
  desc: string;
  kind: 'media' | 'features' | 'settings';
  variant?: number;
};

export function getSlides(p: Product): GallerySlide[] {
  if (p.type === 'theme') {
    return [
      {
        key: 'home',
        label: 'Главная',
        desc: `Главная страница демо «${p.name}» — hero-блок, преимущества и витрина.`,
        kind: 'media',
        variant: 0,
      },
      {
        key: 'inner',
        label: 'Каталог',
        desc: 'Внутренняя страница: сетка записей, фильтры и карточки товаров.',
        kind: 'media',
        variant: 1,
      },
      {
        key: 'mobile',
        label: 'Мобильная версия',
        desc: 'Адаптивная вёрстка для смартфонов и планшетов — всё работает с тач-экрана.',
        kind: 'media',
        variant: 2,
      },
    ];
  }
  return [
    {
      key: 'overview',
      label: 'Обзор',
      desc: `${p.name} — ${p.tagline}`,
      kind: 'media',
      variant: 0,
    },
    {
      key: 'features',
      label: 'Возможности',
      desc: 'Ключевые модули и функции плагина из коробки.',
      kind: 'features',
    },
    {
      key: 'settings',
      label: 'Настройки',
      desc: 'Панель настроек в консоли WordPress — всё включается в один клик.',
      kind: 'settings',
    },
  ];
}

export function ProductGallerySlide({ product, index, className }: { product: Product; index: number; className?: string }) {
  const slide = getSlides(product)[index] ?? getSlides(product)[0];
  if (slide.kind === 'features') return <PluginFeaturesSlide p={product} />;
  if (slide.kind === 'settings') return <PluginSettingsSlide p={product} />;
  return <ProductMedia product={product} variant={slide.variant ?? 0} className={className} />;
}

type Props = {
  product: Product;
  initialIndex?: number;
  onClose: () => void;
  onSelect?: (index: number) => void;
};

export function GalleryModal({ product: p, initialIndex = 0, onClose, onSelect }: Props) {
  const slides = getSlides(p);
  const [index, setIndex] = useState(() => Math.min(Math.max(initialIndex, 0), slides.length - 1));
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const slide = slides[index];
  const TypeIcon = p.type === 'theme' ? Palette : Plug;

  const select = useCallback(
    (i: number) => {
      const n = (i + slides.length) % slides.length;
      setIndex(n);
      onSelect?.(n);
    },
    [slides.length, onSelect],
  );

  // The portal remains interactive while the page behind it is inert.
  useEffect(() => {
    const prev = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.getElementById('root');
    const previousInert = root?.inert ?? false;
    document.body.style.overflow = 'hidden';
    if (root) root.inert = true;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      if (root) root.inert = previousInert;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Escape', 'ArrowRight', 'ArrowLeft'].includes(e.key)) e.preventDefault();
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') select(index + 1);
      if (e.key === 'ArrowLeft') select(index - 1);
      if (e.key === 'Tab') {
        const controls = [...(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [index, onClose, select]);

  return createPortal(
    <div
      ref={dialogRef}
      className="fade-in fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Галерея товара ${p.name}`}
    >
      <div
        className="fade-up flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-card bg-white shadow-float"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="flex flex-shrink-0 items-center gap-3 border-b border-line px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <Pill icon={<TypeIcon className="h-3 w-3" />} className="hidden bg-soft shadow-none sm:inline-flex">
              {p.type === 'theme' ? 'Тема' : 'Плагин'}
            </Pill>
            <div className="min-w-0">
              <div className="truncate text-base font-bold tracking-tight sm:text-lg">
                {p.name} <span className="font-medium text-muted">· v{p.version}</span>
              </div>
              <div className="truncate text-xs text-muted">{slide.label} — {slide.desc}</div>
            </div>
          </div>
          <span className="hidden flex-shrink-0 rounded-full bg-soft px-3 py-1.5 font-mono text-xs font-semibold tabular-nums sm:block">
            {index + 1} / {slides.length}
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Закрыть галерею"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white transition hover:border-ink/25 hover:bg-soft active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Слайд */}
        <div className="relative min-h-0 flex-1 overflow-auto overscroll-contain bg-soft">
          <div key={slide.key} className="fade-in mx-auto w-full" style={slide.kind === 'media' ? { maxWidth: 'min(100%, calc((100dvh - 235px) * 1.6))' } : undefined}>
            <ProductGallerySlide product={p} index={index} className="aspect-[16/10]" />
          </div>

          {/* Стрелки */}
          {slides.length > 1 && (
            <>
              <button
                onClick={() => select(index - 1)}
                aria-label="Предыдущий слайд"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-float backdrop-blur transition hover:bg-brand active:scale-95 sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => select(index + 1)}
                aria-label="Следующий слайд"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-float backdrop-blur transition hover:bg-brand active:scale-95 sm:right-4"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Счётчик на мобиле */}
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums text-white backdrop-blur sm:hidden">
            {index + 1} / {slides.length}
          </span>
        </div>

        {/* Миниатюры */}
        <div className="flex-shrink-0 border-t border-line bg-white px-4 py-3 sm:px-6">
          <div className="mx-auto grid max-w-[380px] grid-cols-3 gap-2.5 sm:gap-3">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.key}
                  onClick={() => select(i)}
                  className={cn(
                    'group overflow-hidden rounded-xl border-2 bg-white text-left transition sm:rounded-2xl sm:p-1',
                    active ? 'border-brand shadow-picked' : 'border-transparent hover:border-line',
                  )}
                >
                  <span className="block overflow-hidden rounded-lg sm:rounded-xl">
                    {s.kind === 'media' ? (
                      <ProductMedia product={p} variant={s.variant ?? 0} className="aspect-[16/10]" />
                    ) : (
                      <span
                        className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-1"
                        style={{ background: `linear-gradient(135deg, ${p.color}14, ${p.color2}26)` }}
                      >
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-white sm:h-9 sm:w-9"
                          style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color2})` }}
                        >
                          {s.kind === 'features' ? <ListChecks className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
                        </span>
                        <span className="text-[10px] font-semibold text-muted sm:text-[11px]">{s.label}</span>
                      </span>
                    )}
                  </span>
                  <span className={cn('hidden px-1.5 py-1.5 text-xs font-semibold sm:block', active ? 'text-ink' : 'text-muted')}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ---------- Дополнительные слайды для плагинов ---------- */

function PluginFeaturesSlide({ p }: { p: Product }) {
  const Icon = pluginIcon(p);
  return (
    <div className="relative flex h-full min-h-[320px] w-full items-center justify-center overflow-hidden p-4 sm:min-h-[420px] sm:p-8" style={{ background: p.bg }}>
      <div className="dots-bg absolute inset-0 opacity-70" />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-5 shadow-float sm:p-7">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-white"
            style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color2})` }}
          >
            <Icon className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Возможности</div>
            <div className="text-lg font-bold tracking-tight">{p.name}</div>
          </div>
          {p.chips && (
            <span className="ml-auto hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:block">
              {p.chips[0]}
            </span>
          )}
        </div>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {p.features.slice(0, 6).map((f) => (
            <li key={f} className="flex items-start gap-2.5 rounded-xl bg-soft/70 px-3 py-2.5 text-[13px] font-medium leading-snug">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: p.color }}>
                <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PluginSettingsSlide({ p }: { p: Product }) {
  const rows = p.features.slice(0, 4);
  return (
    <div className="flex h-full min-h-[320px] w-full sm:min-h-[420px]" style={{ background: '#F2F2F5' }}>
      {/* Сайдбар «админки» */}
      <div className="hidden w-52 flex-shrink-0 flex-col bg-ink p-4 text-white sm:flex">
        <div className="flex items-center gap-2 px-2 py-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-bold" style={{ background: p.color }}>
            W
          </span>
          <span className="text-[13px] font-semibold">Консоль WP</span>
        </div>
        <div className="mt-3 space-y-1 text-[13px]">
          {['Записи', 'Страницы', 'Внешний вид', p.name, 'Настройки'].map((m) => (
            <div
              key={m}
              className={cn('rounded-lg px-3 py-2', m === p.name ? 'font-semibold text-ink' : 'text-white/60')}
              style={m === p.name ? { background: '#FFC21F' } : undefined}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-xl bg-white/5 p-3 text-[11px] text-white/50">
          {p.slug}.wppanda.demo
          <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-2/3 rounded-full" style={{ background: p.color }} />
          </span>
        </div>
      </div>
      {/* Панель настроек */}
      <div className="min-w-0 flex-1 p-4 sm:p-8">
        <div className="mx-auto h-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-float">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <div className="text-sm font-bold">Настройки · {p.name}</div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">Лицензия активна</span>
          </div>
          <div className="divide-y divide-line">
            {rows.map((f, i) => (
              <div key={f} className="flex items-center gap-3 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold">{f.split(':')[0].split('—')[0]}</div>
                  <div className="truncate text-[11px] text-muted">{i % 2 ? 'Рекомендуется включить' : 'Включено по умолчанию'}</div>
                </div>
                <span className="relative h-6 w-11 flex-shrink-0 rounded-full" style={{ background: i === 3 ? '#E4E4E9' : p.color }}>
                  <span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
                    style={i === 3 ? { left: 2 } : { right: 2 }}
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between bg-soft/60 px-5 py-3.5">
            <span className="text-[11px] text-muted">Изменения применяются мгновенно</span>
            <span className="rounded-full px-4 py-2 text-[13px] font-bold text-white" style={{ background: p.color }}>
              Сохранить
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
