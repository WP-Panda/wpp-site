import { useEffect, useState } from 'react';
import { Download, Gift, Lock, Plus, ShoppingBag, Ticket, Trash2, Undo2, X } from 'lucide-react';
import { useApp } from '../context';
import { oldPriceFor, priceFor, productById, products, themeLicenses, type ThemeLicenseId } from '../data';
import { cn } from '../utils/cn';
import { ProductMedia, ProductThumb } from './ProductMedia';
import { Button, IconButton, plural, rub } from './ui';

const GIFT_GOAL = 15000;

function ThemeOptionPicker({ value, onChange }: { value: ThemeLicenseId; onChange: (l: ThemeLicenseId) => void }) {
  return (
    <div className="inline-flex rounded-full border border-line bg-soft p-0.5">
      {themeLicenses.map((l) => (
        <button
          key={l.id}
          onClick={() => onChange(l.id)}
          title={l.desc}
          className={cn('h-7 rounded-full px-3 text-[11px] font-semibold transition', value === l.id ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink')}
        >
          {l.name}
        </button>
      ))}
    </div>
  );
}

/** Корзина выезжает СПРАВА */
export function CartDrawer() {
  const { cartOpen, closeCart, cart, removeFromCart, setLineOption, addToCart, totals, coupon, applyCoupon, removeCoupon, navigate } = useApp();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, closeCart]);

  const left = Math.max(0, GIFT_GOAL - totals.total);
  const pct = Math.min(100, (totals.total / GIFT_GOAL) * 100);
  const upsell = products.find((p) => p.type === 'plugin' && !cart.some((l) => l.productId === p.id));
  const go = (page: string, param?: string) => {
    closeCart();
    navigate(page, param);
  };

  return (
    <>
      <div
        onClick={closeCart}
        className={cn('fixed inset-0 z-50 bg-ink/35 backdrop-blur-[3px] transition-opacity duration-300', cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0')}
      />
      <aside
        role="dialog"
        aria-label="Корзина"
        aria-hidden={!cartOpen}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-white shadow-[-30px_0_80px_-30px_rgba(20,20,28,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-y-3 sm:right-3 sm:rounded-[28px]',
          cartOpen ? 'translate-x-0' : 'translate-x-[110%]',
        )}
      >
        <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand shadow-glow">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xl font-bold tracking-tight">Корзина</div>
              <div className="text-xs text-muted">
                {totals.count ? `${totals.count} ${plural(totals.count, ['товар', 'товара', 'товаров'])} · мгновенная загрузка` : 'Пока пусто'}
              </div>
            </div>
          </div>
          <IconButton onClick={closeCart} aria-label="Закрыть корзину">
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 ring-[10px] ring-brand-50/50">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <h3 className="mt-7 text-xl font-bold">Корзина пока пуста</h3>
            <p className="mt-2 max-w-[280px] text-sm text-muted">Темы на 1 или 5 сайтов и плагины с пожизненной лицензией ждут вас в каталоге.</p>
            <Button size="lg" className="mt-7" onClick={() => go('shop')} arrow>
              Перейти в каталог
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 sm:px-6">
              <div className="rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
                <div className="flex items-center gap-2 text-[13px] font-medium">
                  <Gift className="h-4 w-4 flex-shrink-0" />
                  {left > 0 ? (
                    <span>
                      Ещё <b>{rub(left)}</b> — и премиум-плагин в подарок
                    </span>
                  ) : (
                    <span>
                      <b>Подарок ваш!</b> Бонусный плагин добавлен к заказу
                    </span>
                  )}
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {cart.map((line) => {
                  const p = productById(line.productId);
                  const price = priceFor(p, line.opt);
                  const old = oldPriceFor(p, line.opt);
                  return (
                    <div key={p.id} className="rounded-2xl border border-line p-3 transition hover:border-ink/15">
                      <div className="flex gap-3">
                        <button onClick={() => go('product', p.slug)} className="w-[104px] flex-shrink-0 overflow-hidden rounded-xl">
                          <ProductMedia product={p} />
                        </button>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                                {p.type === 'theme' ? 'Тема' : 'Плагин · Навсегда'} · v{p.version}
                              </div>
                              <button onClick={() => go('product', p.slug)} className="block truncate text-left text-[15px] font-semibold leading-tight hover:underline">
                                {p.name}
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(p.id)}
                              aria-label="Удалить"
                              className="-mr-1 -mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{p.tagline}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        {p.type === 'theme' ? (
                          <ThemeOptionPicker value={line.opt ?? 'single'} onChange={(opt) => setLineOption(p.id, opt)} />
                        ) : (
                          <span className="rounded-full bg-soft px-3 py-1 text-[11px] font-semibold text-ink">
                            Лицензия навсегда
                          </span>
                        )}
                        <div className="text-right leading-tight">
                          {old && <div className="text-[11px] text-muted line-through">{rub(old)}</div>}
                          <div className="font-bold tabular-nums">{rub(price)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {upsell && (
                <div className="mt-4 rounded-2xl border border-dashed border-line p-3">
                  <div className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Плагин навсегда</div>
                  <div className="flex items-center gap-3">
                    <ProductThumb product={upsell} className="h-12 w-12 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{upsell.name}</div>
                      <div className="truncate text-xs text-muted">{upsell.tagline}</div>
                    </div>
                    <Button size="sm" onClick={() => addToCart(upsell.id, undefined, false)}>
                      <Plus className="h-3.5 w-3.5" />
                      {rub(upsell.price)}
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4 pb-5">
                {coupon ? (
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-brand bg-brand-50 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <Ticket className="h-4 w-4" />
                      {coupon.code}
                      <span className="font-normal text-muted">−{coupon.percent}%</span>
                    </span>
                    <button onClick={removeCoupon} className="text-xs font-semibold text-muted hover:text-ink">
                      Убрать
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (applyCoupon(code)) {
                        setCode('');
                        setErr('');
                      } else setErr('Промокод не найден. Попробуйте WELCOME30');
                    }}
                    className="flex gap-2"
                  >
                    <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-line bg-soft/70 px-4 transition focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/15">
                      <Ticket className="h-4 w-4 text-muted" />
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Промокод"
                        className="min-w-0 flex-1 bg-transparent text-sm uppercase outline-none placeholder:normal-case placeholder:text-muted/70"
                      />
                    </div>
                    <Button type="submit" variant="dark">
                      Применить
                    </Button>
                  </form>
                )}
                {err && <div className="mt-2 px-1 text-xs text-rose-500">{err}</div>}
              </div>
            </div>

            <div className="border-t border-line px-5 pb-5 pt-4 sm:px-6">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Подытог</span>
                  <span className="font-semibold tabular-nums">{rub(totals.subtotal + totals.saved)}</span>
                </div>
                {totals.saved > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Скидка по акции</span>
                    <span className="font-semibold tabular-nums text-emerald-600">−{rub(totals.saved)}</span>
                  </div>
                )}
                {totals.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Промокод {coupon?.code}</span>
                    <span className="font-semibold tabular-nums text-emerald-600">−{rub(totals.discount)}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-end justify-between border-t border-dashed border-line pt-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Итого</div>
                  <div className="text-[11px] text-muted">НДС не облагается</div>
                </div>
                <div className="text-[28px] font-bold leading-none tabular-nums">{rub(totals.total)}</div>
              </div>
              <Button size="lg" className="mt-4 w-full" onClick={() => go('checkout')} arrow>
                Оформить заказ
              </Button>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="soft" size="sm" onClick={() => go('checkout', 'cart')}>
                  Страница корзины
                </Button>
                <Button variant="ghost" size="sm" onClick={closeCart}>
                  Продолжить покупки
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Безопасная оплата
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  Мгновенно
                </span>
                <span className="flex items-center gap-1">
                  <Undo2 className="h-3 w-3" />
                  Возврат 14 дней
                </span>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
