import { useState } from 'react';
import { LayoutGrid, List, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context';
import { productById, products } from '../data';
import { ProductCard, ProductListCard } from '../components/ProductCard';
import { Button, EmptyBox, PageTitle, Segmented, StickyBar, plural, rub } from '../components/ui';
import { cn } from '../utils/cn';

type TypeFilter = 'all' | 'theme' | 'plugin';
const COMPAT = ['Gutenberg', 'Elementor', 'WooCommerce', 'WPML'];
const SORTS = [
  { v: 'popular', l: 'Сначала популярные' },
  { v: 'rating', l: 'По рейтингу' },
  { v: 'price-asc', l: 'Сначала дешевле' },
  { v: 'price-desc', l: 'Сначала дороже' },
];

export function Shop() {
  const { route, navigate, cart, totals, openCart } = useApp();
  const type: TypeFilter = route.param === 'theme' || route.param === 'plugin' ? route.param : 'all';
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Все');
  const [compat, setCompat] = useState<string[]>([]);
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const base = products.filter((p) => type === 'all' || p.type === type);
  const cats = ['Все', ...Array.from(new Set(base.map((p) => p.category)))];
  let list = base.filter(
    (p) =>
      (cat === 'Все' || p.category === cat) &&
      compat.every((c) => p.compat.includes(c)) &&
      `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(q.trim().toLowerCase()),
  );
  list = [...list].sort((a, b) =>
    sort === 'rating' ? b.rating - a.rating : sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : b.sales - a.sales,
  );
  const hasFilters = cat !== 'Все' || compat.length > 0 || q.trim() !== '';
  const reset = () => {
    setCat('Все');
    setCompat([]);
    setQ('');
  };

  return (
    <div className={cn('mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12', cart.length ? 'pb-32' : 'pb-8')}>
      <PageTitle
        title={type === 'theme' ? 'Темы WordPress' : type === 'plugin' ? 'Плагины WordPress' : 'Каталог'}
        subtitle={type === 'plugin' ? 'Плагины с лицензией навсегда и бесплатными обновлениями' : 'Темы на 1 сайт или 5 сайтов · Выберите количество при добавлении в корзину'}
      />

      <div className="mx-auto mt-8 max-w-[640px]">
        <Segmented
          value={type}
          onChange={(v) => navigate('shop', v === 'all' ? undefined : v)}
          options={[
            { value: 'all', label: 'Все', count: products.length },
            { value: 'theme', label: 'Темы', count: products.filter((p) => p.type === 'theme').length },
            { value: 'plugin', label: 'Плагины', count: products.filter((p) => p.type === 'plugin').length },
          ]}
        />
      </div>

      {/* Toolbar */}
      <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex h-12 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
          <Search className="h-4 w-4 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по каталогу" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" />
          {q && (
            <button onClick={() => setQ('')} className="text-muted hover:text-ink" aria-label="Очистить">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
          <span className="flex flex-shrink-0 items-center gap-1.5 pr-1 text-xs font-semibold text-muted">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Совместимость:
          </span>
          {COMPAT.map((c) => {
            const on = compat.includes(c);
            return (
              <button
                key={c}
                onClick={() => setCompat((arr) => (on ? arr.filter((x) => x !== c) : [...arr, c]))}
                className={cn(
                  'h-10 flex-shrink-0 rounded-full border px-4 text-[13px] font-semibold transition',
                  on ? 'border-brand bg-brand-50 ring-1 ring-brand' : 'border-line bg-white hover:border-ink/20',
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-12 cursor-pointer rounded-full border border-line bg-white px-4 text-sm font-semibold shadow-card outline-none focus:border-brand"
        >
          {SORTS.map((s) => (
            <option key={s.v} value={s.v}>
              {s.l}
            </option>
          ))}
        </select>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn('h-9 flex-shrink-0 rounded-full px-4 text-[13px] font-semibold transition', cat === c ? 'bg-ink text-white' : 'bg-soft text-ink/70 hover:text-ink')}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <span>
          Найдено: <b className="text-ink">{list.length}</b> {plural(list.length, ['продукт', 'продукта', 'продуктов'])}
        </span>
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button onClick={reset} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
              Сбросить фильтры
            </button>
          )}
          <div className="flex items-center rounded-full border border-line bg-white p-1 shadow-card" role="group" aria-label="Вид каталога">
            <button
              onClick={() => setView('grid')}
              aria-label="Вид сеткой"
              aria-pressed={view === 'grid'}
              title="Grid"
              className={cn(
                'flex h-9 w-10 items-center justify-center rounded-full transition-all',
                view === 'grid' ? 'bg-ink text-white' : 'text-muted hover:text-ink',
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('list')}
              aria-label="Вид списком"
              aria-pressed={view === 'list'}
              title="List"
              className={cn(
                'flex h-9 w-10 items-center justify-center rounded-full transition-all',
                view === 'list' ? 'bg-ink text-white' : 'text-muted hover:text-ink',
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {list.length ? (
        view === 'grid' ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-4">
            {list.map((p) => (
              <ProductListCard key={p.id} product={p} />
            ))}
          </div>
        )
      ) : (
        <div className="mt-5">
          <EmptyBox
            icon={<Search className="h-6 w-6" />}
            title="Ничего не нашли"
            text="Попробуйте изменить запрос или снять часть фильтров совместимости."
            action={
              <Button variant="dark" onClick={reset}>
                Сбросить фильтры
              </Button>
            }
          />
        </div>
      )}

      {cart.length > 0 && (
        <StickyBar
          icon={<ShoppingBag className="h-5 w-5" />}
          label="В корзине"
          title={cart.map((l) => productById(l.productId).name).join(', ')}
          extra={`(${totals.count} ${plural(totals.count, ['товар', 'товара', 'товаров'])})`}
          priceLabel="Итого"
          price={rub(totals.total)}
          action={
            <div className="flex gap-2">
              <Button variant="outline" className="hidden md:inline-flex" onClick={openCart}>
                Корзина
              </Button>
              <Button onClick={() => navigate('checkout')} arrow>
                Оформить
              </Button>
            </div>
          }
        />
      )}
    </div>
  );
}
