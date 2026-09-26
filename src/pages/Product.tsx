import { useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, Download, Expand, Heart, Images, LifeBuoy, LockKeyhole, MonitorPlay, Share2, ShieldCheck, ShoppingBag, Star } from 'lucide-react';
import { useApp } from '../context';
import { formatOptionLabel, oldPriceFor, priceFor, productBySlug, products, themeLicenses, type Product, type ThemeLicenseId } from '../data';
import { ProductCard } from '../components/ProductCard';
import { GalleryModal, getSlides } from '../components/GalleryModal';
import { ProductMedia } from '../components/ProductMedia';
import { ProductPreviewDialog } from '../components/ProductPreviewDialog';
import { ProductChangelog, ProductComments, ProductDescription, ProductReviews, useProductFeedback } from '../components/ProductContent';
import { Button, Crumbs, StickyBar, rub } from '../components/ui';
import { cn } from '../utils/cn';

type ItemTab = 'details' | 'reviews' | 'comments' | 'changelog';

export function ProductPage() {
  const { route, navigate, cart, addToCart, openCart, wishlist, toggleWishlist } = useApp();
  const p = productBySlug(route.param);
  const line = cart.find((item) => item.productId === p.id);
  const [option, setOption] = useState<ThemeLicenseId>(line?.opt ?? 'single');
  const [tab, setTab] = useState<ItemTab>('details');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { newReviews, questions, addReview, addQuestion } = useProductFeedback(p);
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'manual'>('idle');
  const tabListRef = useRef<HTMLDivElement>(null);
  const slides = getSlides(p);
  const price = priceFor(p, option);
  const oldPrice = oldPriceFor(p, option);
  const averageRating = ((p.rating * p.reviews + newReviews.reduce((sum, review) => sum + review.rating, 0)) / (p.reviews + newReviews.length)).toFixed(1);
  const sameInCart = Boolean(line && (p.type === 'plugin' || line.opt === option));
  const favourite = wishlist.includes(p.id);
  const related = products.filter((item) => item.type === p.type && item.id !== p.id).slice(0, 4);
  const tabs: { id: ItemTab; label: string; count?: number }[] = [
    { id: 'details', label: 'Описание' },
    { id: 'reviews', label: 'Отзывы', count: p.reviews + newReviews.length },
    { id: 'comments', label: 'Комментарии', count: questions.length },
    { id: 'changelog', label: 'История версий' },
  ];

  const selectTab = (next: ItemTab) => {
    setTab(next);
    tabListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    setTab(tabs[next].id);
    tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  const showGallery = (index = 0) => {
    setGalleryIndex(Math.max(0, Math.min(index, slides.length - 1)));
    setGalleryOpen(true);
  };
  const closeGallery = useCallback(() => setGalleryOpen(false), []);
  const closePreview = useCallback(() => setPreviewOpen(false), []);
  const add = () => sameInCart ? openCart() : addToCart(p.id, p.type === 'theme' ? option : undefined);
  const buy = () => {
    addToCart(p.id, p.type === 'theme' ? option : undefined, false);
    navigate('checkout');
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareState('copied');
    } catch {
      setShareState('manual');
    }
  };

  return (
    <div className="item-page mx-auto max-w-[1200px] px-4 pb-24 pt-6 sm:px-6 lg:pb-8">
      <Crumbs items={[
        { label: 'Главная', onClick: () => navigate('home') },
        { label: p.type === 'theme' ? 'Темы WordPress' : 'Плагины WordPress', onClick: () => navigate('shop', p.type) },
        { label: p.category, onClick: () => navigate('shop', p.type) },
        { label: p.name },
      ]} />

      <header className="mt-6">
        <h1 className="max-w-[1050px] text-[27px] font-bold leading-[1.3] tracking-tight sm:text-[34px]">
          {p.name}<span className="font-medium"> - {p.tagline}</span>
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-[13px]">
          <span className="text-muted">Автор <button onClick={() => document.getElementById('product-author')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="ml-1 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">Wp Panda</button></span>
          <span className="flex items-center gap-1.5 text-muted"><ShoppingBag className="h-3.5 w-3.5" /> {p.sales.toLocaleString('ru-RU')} продаж</span>
          <button onClick={() => selectTab('reviews')} className="flex items-center gap-1.5" aria-label="Перейти к отзывам">
            <Star className="h-3.5 w-3.5 fill-brand text-brand" />
            <b>{averageRating}</b><span className="text-muted">({(p.reviews + newReviews.length).toLocaleString('ru-RU')} отзывов)</span>
          </button>
          <span className="flex items-center gap-1.5 font-medium text-emerald-700"><Check className="h-3.5 w-3.5" /> Регулярные обновления</span>
        </div>
      </header>

      <div className="mt-7 flex items-center justify-between gap-5 border-b border-line">
        <div ref={tabListRef} role="tablist" aria-label="Информация о товаре" className="no-scrollbar flex min-w-0 flex-1 scroll-mt-24 gap-5 overflow-x-auto sm:gap-7">
          {tabs.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`item-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls={`item-panel-${item.id}`}
              tabIndex={tab === item.id ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={(event) => handleTabKey(event, index)}
              className={cn('relative flex h-14 flex-shrink-0 items-center gap-2 whitespace-nowrap border-b-[3px] pt-[3px] text-[13px] font-semibold transition-colors', tab === item.id ? 'border-brand text-ink' : 'border-transparent text-muted hover:text-ink')}
            >
              {item.label}
              {item.count !== undefined && <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-medium tabular-nums', tab === item.id ? 'bg-brand-50 text-ink' : 'bg-soft text-muted')}>{item.count.toLocaleString('ru-RU')}</span>}
            </button>
          ))}
        </div>
        <button onClick={() => navigate('account', 'new-ticket')} className="hidden flex-shrink-0 items-center gap-1.5 text-xs font-medium text-muted transition hover:text-ink lg:flex">
          <LifeBuoy className="h-3.5 w-3.5" /> Поддержка в кабинете <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      <div className={cn('item-layout mt-7', tab === 'details' && 'item-layout--details')}>
        {tab === 'details' && (
          <section className="item-media min-w-0" aria-label="Превью товара">
            <div className="overflow-hidden rounded-card border border-line bg-white p-2 shadow-card">
              <button type="button" onClick={() => showGallery(galleryIndex)} aria-label={`Открыть галерею товара ${p.name}`} className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left">
                <ProductMedia product={p} variant={p.type === 'theme' ? galleryIndex : 0} className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.015]" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition group-hover:bg-brand"><Expand className="h-4 w-4" /></span>
              </button>
              <div className="flex flex-wrap items-center justify-center gap-2.5 px-2 py-4 sm:gap-3">
                <Button variant="dark" onClick={() => setPreviewOpen(true)} className="flex-1 sm:max-w-[220px]"><MonitorPlay className="h-4 w-4" /> Предпросмотр <ArrowUpRight className="h-3.5 w-3.5" /></Button>
                <Button variant="outline" onClick={() => showGallery(galleryIndex)} className="flex-1 sm:max-w-[200px]"><Images className="h-4 w-4" /> Скриншоты <span className="text-xs text-muted">({slides.length})</span></Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 px-1 text-xs text-muted">
              <button onClick={() => toggleWishlist(p.id)} aria-pressed={favourite} className={cn('flex items-center gap-1.5 transition hover:text-ink', favourite && 'text-rose-600')}>
                <Heart className={cn('h-4 w-4', favourite && 'fill-current')} /> {favourite ? 'В избранном' : 'В избранное'}
              </button>
              <button onClick={share} className="flex items-center gap-1.5 transition hover:text-ink"><Share2 className="h-3.5 w-3.5" /> {shareState === 'copied' ? 'Ссылка скопирована' : 'Поделиться'}</button>
              <span className="sm:ml-auto">Версия {p.version}</span>
            </div>
            {shareState === 'manual' && <label className="mt-3 block text-xs text-muted">Скопируйте ссылку<input aria-label="Ссылка на товар" readOnly value={window.location.href} onFocus={(event) => event.target.select()} className="mt-2 h-10 w-full rounded-xl border border-line bg-soft px-3 text-xs text-ink outline-none focus:border-brand" /></label>}
          </section>
        )}

        <aside className="item-sidebar" aria-label="Покупка и характеристики товара">
          <PurchasePanel product={p} option={option} onOption={setOption} price={price} oldPrice={oldPrice} inCart={sameInCart} hasOtherOption={Boolean(line && !sameInCart)} onAdd={add} onBuy={buy} />
          <div className="item-info space-y-7">
            <section id="product-author" className="scroll-mt-24 border-b border-line pb-7">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-ink text-2xl font-bold text-brand">P<span className="text-white">.</span></span>
                <div>
                  <h2 className="flex items-center gap-1.5 text-base font-bold tracking-tight">Wp Panda <BadgeCheck className="h-4 w-4 text-[#c5940b]" aria-label="Разработчик" /></h2>
                  <p className="mt-0.5 text-xs text-muted">Автор и разработчик продукта</p>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full" onClick={() => navigate('shop')}>Все продукты автора <ArrowRight className="h-3.5 w-3.5" /></Button>
            </section>

            <section aria-labelledby="product-specs-heading">
              <h2 id="product-specs-heading" className="text-base font-semibold tracking-tight">Информация о продукте</h2>
              <dl className="mt-4 space-y-3 text-[12px] leading-relaxed">
                {[
                  ['Обновлено', p.updated],
                  ['Текущая версия', p.version],
                  ['WordPress', p.wp],
                  ['PHP', p.php],
                  ['Gutenberg', p.compat.includes('Gutenberg') ? 'Совместим' : 'См. документацию'],
                  ['Совместимость', p.compat.join(', ')],
                  ['Браузеры', 'Chrome, Firefox, Safari, Edge'],
                  ['Файлы в комплекте', 'PHP, JavaScript, CSS, файлы перевода'],
                  ['Документация', 'Включена'],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
                    <dt className="text-muted">{label}</dt>
                    <dd className="break-words font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted"><span className="font-medium text-ink">Теги: </span>{['WordPress', p.category, ...p.compat.filter((item) => item !== 'Gutenberg')].join(', ')}</div>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold"><LifeBuoy className="h-4 w-4" /> Помощь по продукту</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted">Вопросы по купленному товару и ответы инженеров хранятся в личном кабинете.</p>
              <button onClick={() => navigate('account', 'new-ticket')} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold underline decoration-brand decoration-2 underline-offset-4">Создать обращение <ArrowUpRight className="h-3 w-3" /></button>
              <div className="mt-3"><button onClick={() => navigate('faq')} className="text-xs text-muted underline underline-offset-4 hover:text-ink">FAQ и условия покупки</button></div>
            </section>
          </div>
        </aside>

        <div id={`item-panel-${tab}`} role="tabpanel" aria-labelledby={`item-tab-${tab}`} tabIndex={0} className="item-content min-w-0 outline-none">
          <div key={tab} className="fade-in">
            {tab === 'details' && <ProductDescription product={p} onGallery={showGallery} onChangelog={() => selectTab('changelog')} />}
            {tab === 'reviews' && <ProductReviews product={p} newReviews={newReviews} onAdd={addReview} />}
            {tab === 'comments' && <ProductComments questions={questions} onAdd={addQuestion} />}
            {tab === 'changelog' && <ProductChangelog product={p} />}
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-line pt-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs text-muted">От Wp Panda</p><h2 className="mt-1 text-2xl font-bold tracking-tight">{p.type === 'theme' ? 'Другие темы автора' : 'Другие плагины автора'}</h2></div>
          <button onClick={() => navigate('shop', p.type)} className="inline-flex items-center gap-2 text-sm font-semibold">Смотреть все <ArrowRight className="h-4 w-4" /></button>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>

      {galleryOpen && <GalleryModal product={p} initialIndex={galleryIndex} onClose={closeGallery} onSelect={setGalleryIndex} />}
      {previewOpen && <ProductPreviewDialog product={p} onClose={closePreview} />}

      <div className="lg:hidden">
        <StickyBar icon={<ShoppingBag className="h-5 w-5" />} label={`${p.name} · ${formatOptionLabel(p, option)}`} title={rub(price)} action={<Button onClick={add}>{sameInCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}{sameInCart ? 'В корзине' : 'В корзину'}</Button>} />
      </div>
    </div>
  );
}

function PurchasePanel({ product: p, option, onOption, price, oldPrice, inCart, hasOtherOption, onAdd, onBuy }: {
  product: Product;
  option: ThemeLicenseId;
  onOption: (value: ThemeLicenseId) => void;
  price: number;
  oldPrice?: number;
  inCart: boolean;
  hasOtherOption: boolean;
  onAdd: () => void;
  onBuy: () => void;
}) {
  const { navigate } = useApp();
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <section className="item-buy rounded-card border border-line bg-white p-6 shadow-card" aria-label="Купить товар">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">{p.type === 'plugin' ? 'Бессрочная лицензия' : 'Лицензия темы'}</h2>
        <ShieldCheck className="h-5 w-5 flex-shrink-0 text-emerald-600" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <span className="text-[34px] font-bold leading-tight tracking-tight tabular-nums" aria-live="polite">{rub(price)}</span>
        {oldPrice && <span className="text-sm text-muted line-through">{rub(oldPrice)}</span>}
        {discount > 0 && <span className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-[#906500]">-{discount}%</span>}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted">{p.type === 'plugin' ? 'Один платёж. Без подписки и продлений.' : 'Для личных и клиентских проектов.'}</p>

      {p.type === 'theme' && (
        <fieldset className="mt-5">
          <legend className="mb-2 text-xs font-medium">Количество сайтов</legend>
          <div className="grid grid-cols-2 gap-2">
            {themeLicenses.map((license) => (
              <label key={license.id} className={cn('flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors', option === license.id ? 'border-brand bg-brand-50' : 'border-line hover:border-ink/25')}>
                <input type="radio" name={`product-license-${p.id}`} value={license.id} checked={option === license.id} onChange={() => onOption(license.id)} className="h-4 w-4 accent-[#ffc21f]" />
                {license.name}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <ul className="mt-5 space-y-3 border-t border-line pt-5 text-[13px]">
        {[
          'Оригинальные файлы продукта',
          p.type === 'plugin' ? 'Все будущие обновления включены' : 'Обновления из консоли WordPress',
          'Помощь с установкой и настройкой',
          'Подробная документация',
        ].map((item) => <li key={item} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" /><span>{item}</span></li>)}
      </ul>

      <Button size="lg" className="mt-6 w-full" onClick={onAdd}>
        {inCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
        {inCart ? 'В корзине · открыть' : hasOtherOption ? 'Обновить в корзине' : 'Добавить в корзину'}
      </Button>
      <Button variant="outline" className="mt-2.5 w-full" onClick={onBuy}>Купить сейчас <ArrowRight className="h-3.5 w-3.5" /></Button>
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted"><Download className="h-3.5 w-3.5" /> Файлы доступны сразу после оплаты</div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[11px] text-muted">
        <span className="flex items-center gap-1"><LockKeyhole className="h-3 w-3" /> Безопасная оплата</span>
        <button onClick={() => navigate('faq')} className="underline underline-offset-4 hover:text-ink">Условия возврата</button>
      </div>
    </section>
  );
}