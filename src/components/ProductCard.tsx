import { ArrowRight, ArrowUpRight, Check, Eye, Heart, Palette, Plug, ShoppingBag } from 'lucide-react';
import { useApp } from '../context';
import { priceFor, type Product } from '../data';
import { cn } from '../utils/cn';
import { ProductMedia } from './ProductMedia';
import { CheckBadge, Pill, rub, Stars } from './ui';

const compactNumber = (value: number) =>
  value >= 10000
    ? `${Math.round(value / 1000)} тыс.`
    : value >= 1000
      ? `${(value / 1000).toFixed(1).replace('.', ',')} тыс.`
      : value.toLocaleString('ru-RU');

/** Маркетплейсная карточка: превью, автор, рейтинг, продажи и цена */
export function ProductCard({ product: p }: { product: Product }) {
  const { navigate, addToCart, inCart, openCart, wishlist, toggleWishlist } = useApp();
  const added = inCart(p.id);
  const fav = wishlist.includes(p.id);
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const open = () => navigate('product', p.slug);

  return (
    <>
      <article
        className={cn(
          'group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-2.5 transition-all duration-300 hover:-translate-y-1',
          added ? 'border-brand shadow-picked ring-1 ring-brand' : 'border-line shadow-card hover:shadow-float',
        )}
      >
      {/* ПРЕВЬЮ */}
      <div
        className="relative cursor-pointer overflow-hidden rounded-xl"
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Открыть товар ${p.name}`}
      >
        <ProductMedia product={p} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          <Pill icon={p.type === 'theme' ? <Palette className="h-3 w-3" /> : <Plug className="h-3 w-3" />}>
            {p.type === 'theme' ? 'Тема' : 'Плагин'}
          </Pill>
          <Pill>v{p.version}</Pill>
        </div>
        {p.badge && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">{p.badge}</span>
          </div>
        )}
        {discount > 0 && (
          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-ink">
            −{discount}%
          </span>
        )}
        <div className="absolute right-2.5 top-2.5">
          {added ? (
            <CheckBadge className="ring-2" />
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(p.id);
              }}
              aria-label="В избранное"
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:scale-110',
                fav ? 'text-rose-500' : 'text-ink/60',
              )}
            >
              <Heart className={cn('h-4 w-4', fav && 'fill-rose-500')} />
            </button>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-200 group-hover:bg-ink/15">
          <span className="flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-ink opacity-0 shadow-float transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <Eye className="h-3.5 w-3.5" /> Подробнее
          </span>
        </div>
      </div>

      {/* ИНФОРМАЦИЯ */}
      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3
            onClick={open}
            className="line-clamp-1 cursor-pointer text-[16px] font-semibold tracking-tight text-ink decoration-brand decoration-2 underline-offset-4 hover:underline"
          >
            {p.name}
          </h3>
        </div>
        <div className="mt-1 text-[11px] text-muted">
          от <span className="font-medium text-ink">Wp Panda</span> <span className="mx-1 text-line">·</span> {p.category}
        </div>
        <p className="mt-2 line-clamp-2 min-h-9 text-[12px] leading-relaxed text-muted">{p.tagline}</p>

        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2.5">
          <div className="flex min-w-0 items-center gap-1.5">
            <Stars value={p.rating} size={11} />
            <span className="text-[11px] font-semibold text-ink">{p.rating}</span>
            <span className="truncate text-[11px] text-muted">({compactNumber(p.reviews)})</span>
          </div>
          <span className="flex flex-shrink-0 items-center gap-1 text-[11px] text-muted" title="Количество продаж">
            <ShoppingBag className="h-3 w-3" /> {compactNumber(p.sales)} продаж
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="min-w-0">
            <div className="text-[10px] text-muted">{p.type === 'plugin' ? 'Навсегда' : '1 сайт / 5 сайтов'}</div>
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-lg font-bold tabular-nums text-ink">{rub(priceFor(p))}</span>
              {p.oldPrice && <span className="text-[11px] text-muted line-through">{rub(p.oldPrice)}</span>}
            </div>
          </div>
          <button
            onClick={() => (added ? openCart() : addToCart(p.id))}
            aria-label={added ? `Открыть корзину с ${p.name}` : `Добавить ${p.name} в корзину`}
            className={cn(
              'flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98]',
              added ? 'bg-brand text-ink shadow-glow' : 'border border-line bg-soft hover:border-brand hover:bg-brand',
            )}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" strokeWidth={3} />В корзине
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Купить
                <ArrowUpRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
      </article>
    </>
  );
}

/** Горизонтальная карточка для режима List: превью слева, описание в центре, цена справа */
export function ProductListCard({ product: p }: { product: Product }) {
  const { navigate, addToCart, inCart, openCart, wishlist, toggleWishlist } = useApp();
  const added = inCart(p.id);
  const fav = wishlist.includes(p.id);
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const open = () => navigate('product', p.slug);

  return (
    <>
      <article
        className={cn(
          'group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-stretch sm:gap-5 sm:p-4',
          added ? 'border-brand shadow-picked ring-1 ring-brand' : 'border-line shadow-card hover:shadow-float',
        )}
      >
        {/* ПРЕВЬЮ СЛЕВА */}
        <div
          className="relative w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-xl sm:w-64 lg:w-72"
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              open();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Открыть товар ${p.name}`}
        >
          <ProductMedia product={p} className="transition-transform duration-500 group-hover:scale-[1.03]" />
          <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
            <Pill icon={p.type === 'theme' ? <Palette className="h-3 w-3" /> : <Plug className="h-3 w-3" />}>
              {p.type === 'theme' ? 'Тема' : 'Плагин'}
            </Pill>
            <Pill>v{p.version}</Pill>
          </div>
          {p.badge && (
            <div className="absolute bottom-2.5 left-2.5">
              <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">{p.badge}</span>
            </div>
          )}
          {discount > 0 && (
            <span className="absolute bottom-2.5 right-2.5 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-ink">
              −{discount}%
            </span>
          )}
        </div>

        {/* ЦЕНТР: ИНФОРМАЦИЯ */}
        <div className="flex min-w-0 flex-1 flex-col py-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                onClick={open}
                className="cursor-pointer text-lg font-semibold tracking-tight text-ink decoration-brand decoration-2 underline-offset-4 hover:underline sm:text-xl"
              >
                {p.name}
              </h3>
              <div className="mt-1 text-[11px] text-muted sm:text-xs">
                от <span className="font-medium text-ink">Wp Panda</span> <span className="mx-1 text-line">·</span> {p.category}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(p.id);
              }}
              aria-label="В избранное"
              className={cn(
                'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition hover:scale-105',
                fav ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-line bg-white text-ink/60 hover:border-ink/20',
              )}
            >
              <Heart className={cn('h-4 w-4', fav && 'fill-rose-500')} />
            </button>
          </div>

          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{p.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted sm:text-xs">
            <span className="flex items-center gap-1.5">
              <Stars value={p.rating} size={12} />
              <b className="text-ink">{p.rating}</b>({compactNumber(p.reviews)} отзывов)
            </span>
            <span className="flex items-center gap-1">
              <ShoppingBag className="h-3.5 w-3.5" /> {compactNumber(p.sales)} продаж
            </span>
            <span className="hidden md:inline">WP {p.wp} · PHP {p.php}</span>
          </div>

          <div className="mt-3 hidden flex-wrap gap-1.5 lg:flex">
            {p.compat.slice(0, 4).map((c) => (
              <span key={c} className="rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-muted">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* СПРАВА: ЦЕНА И ДЕЙСТВИЯ */}
        <div className="flex flex-shrink-0 flex-row items-center justify-between gap-3 border-t border-line pt-3 sm:w-52 sm:flex-col sm:items-stretch sm:justify-center sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <div>
            <div className="text-[10px] text-muted">{p.type === 'plugin' ? 'Навсегда' : '1 сайт / 5 сайтов'}</div>
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-xl font-bold tabular-nums text-ink sm:text-2xl">{rub(priceFor(p))}</span>
              {p.oldPrice && <span className="text-xs text-muted line-through">{rub(p.oldPrice)}</span>}
            </div>
          </div>
          <div className="flex gap-2 sm:flex-col">
            <button
              onClick={() => (added ? openCart() : addToCart(p.id))}
              aria-label={added ? `Открыть корзину с ${p.name}` : `Добавить ${p.name} в корзину`}
              className={cn(
              'flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] sm:w-full',
                added ? 'bg-brand text-ink shadow-glow' : 'border border-line bg-soft hover:border-brand hover:bg-brand',
              )}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={3} />В корзине
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Купить
                </>
              )}
            </button>
            <button
              onClick={open}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 text-[13px] font-bold text-white transition hover:bg-ink-2 sm:w-full"
            >
              Подробнее <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
