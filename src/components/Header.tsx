import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Bell, BookOpen, CircleHelp, Headphones, House, LayoutGrid, Lock, Menu, Newspaper, Search, ShoppingBag, User, X } from 'lucide-react';
import { useApp } from '../context';
import { productById, products } from '../data';
import { cn } from '../utils/cn';
import { ProductThumb } from './ProductMedia';
import { IconButton, Logo, rub } from './ui';

const NAV = [
  { id: 'shop', label: 'Каталог', icon: LayoutGrid },
  { id: 'blog', label: 'Блог', icon: Newspaper },
  { id: 'kb', label: 'База знаний', icon: BookOpen },
  { id: 'faq', label: 'FAQ', icon: CircleHelp },
];

const NOTIFS = [
  { title: 'Доступно обновление', text: 'TurboCache v4.0.3 уже в загрузках', time: '1 ч', page: 'account', param: 'downloads' },
  { title: 'Ответ в тикете T-48213', text: 'Новый ответ от WPP Team', time: '2 ч', page: 'account', param: 'tickets' },
  { title: 'Aurora 3.2.1', text: 'Доступно обновление темы', time: 'вчера', page: 'account', param: 'downloads' },
];

const activeFor = (page: string) => (page === 'product' ? 'shop' : page === 'post' ? 'blog' : page === 'kb-article' ? 'kb' : page);

function useClickOutside(ref: React.RefObject<HTMLElement | null>, cb: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && cb();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, cb, active]);
}

function UserPill({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-1.5 shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 sm:flex xl:pr-4"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand">
        <User className="h-4 w-4" />
      </span>
      <span className="hidden text-sm font-semibold xl:block">Алексей М.</span>
    </button>
  );
}

export function Header() {
  const { route, navigate, totals, openCart } = useApp();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [bell, setBell] = useState(false);
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const bellRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => setSearch(false), search);
  useClickOutside(bellRef, () => setBell(false), bell);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
    setBell(false);
  }, [route.page, route.param]);

  const active = activeFor(route.page);
  const checkout = route.page === 'checkout';
  const results = q.trim()
    ? products.filter((p) => `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6)
    : [productById(1), productById(9), productById(2), productById(11)];

  return (
    <header className={cn('sticky top-0 z-40 transition-all duration-300', scrolled || menu ? 'bg-white/85 shadow-[0_1px_0_rgba(20,20,28,0.06)] backdrop-blur-xl' : 'bg-transparent')}>
      <div className="mx-auto flex h-[76px] max-w-[1200px] items-center gap-3 px-4 sm:h-20 sm:px-6">
        <button onClick={() => navigate('home')} aria-label="На главную" className="flex-shrink-0">
          <Logo />
        </button>

        {checkout ? (
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => navigate('shop')} className="hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted transition hover:text-ink md:flex">
              <ArrowLeft className="h-4 w-4" />В магазин
            </button>
            <span className="hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium shadow-card sm:flex">
              <Lock className="h-4 w-4 text-emerald-600" />
              Безопасное оформление
            </span>
            <IconButton onClick={() => navigate('account', 'new-ticket')} aria-label="Поддержка в личном кабинете">
              <Headphones className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton onClick={openCart} badge={totals.count} aria-label="Открыть корзину">
              <ShoppingBag className="h-[18px] w-[18px]" />
            </IconButton>
            <UserPill onClick={() => navigate('account')} />
          </div>
        ) : (
          <>
            {/* Меню без общего круглого контейнера: отдельные чистые кнопки */}
            <nav className="mx-auto hidden items-center gap-1 lg:flex">
              {NAV.map((n) => {
                const A = active === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => navigate(n.id)}
                    className={cn(
                      'flex h-10 items-center px-4 text-sm font-semibold transition-all rounded-full',
                      A
                        ? 'bg-ink text-white shadow-[0_8px_20px_-10px_rgba(20,20,28,0.7)]'
                        : 'text-ink/75 hover:text-ink hover:bg-soft',
                    )}
                  >
                    {n.label}
                  </button>
                );
              })}
            </nav>

            {/* Правый блок: поиск, колокольчик, корзина СПРАВА, профиль */}
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <IconButton onClick={() => setSearch((s) => !s)} aria-label="Поиск" className={search ? 'border-ink/20' : ''}>
                  <Search className="h-[18px] w-[18px]" />
                </IconButton>
                {search && (
                  <div className="fade-up fixed left-4 right-4 top-[84px] z-20 rounded-card border border-line bg-white p-3 shadow-float sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[440px]">
                    <div className="flex h-12 items-center gap-3 rounded-full bg-soft px-4">
                      <Search className="h-4 w-4 text-muted" />
                      <input
                        autoFocus
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Тема, плагин или задача…"
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
                      />
                      <kbd className="hidden rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] font-semibold text-muted sm:block">ESC</kbd>
                    </div>
                    <div className="px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {q.trim() ? `Найдено: ${results.length}` : 'Популярное'}
                    </div>
                    <div className="max-h-[340px] overflow-y-auto">
                      {results.map((p) => (
                        <button key={p.id} onClick={() => navigate('product', p.slug)} className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-soft">
                          <ProductThumb product={p} className="h-11 w-11 rounded-xl" />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">{p.name}</span>
                            <span className="block truncate text-xs text-muted">{p.tagline}</span>
                          </span>
                          <span className="text-sm font-bold tabular-nums">{rub(p.price)}</span>
                        </button>
                      ))}
                      {!results.length && <div className="px-4 py-8 text-center text-sm text-muted">Ничего не нашли. Попробуйте «SEO» или «магазин».</div>}
                    </div>
                    <button onClick={() => navigate('shop')} className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-soft text-sm font-semibold transition hover:bg-brand">
                      Весь каталог <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div ref={bellRef} className="relative hidden sm:block">
                <IconButton onClick={() => setBell((b) => !b)} dot aria-label="Уведомления">
                  <Bell className="h-[18px] w-[18px]" />
                </IconButton>
                {bell && (
                  <div className="fade-up absolute right-0 top-full z-20 mt-3 w-80 rounded-2xl bg-ink p-2 text-white shadow-float">
                    <div className="px-3 pb-2 pt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Уведомления</div>
                    {NOTIFS.map((n, i) => (
                      <button
                        key={n.title}
                        onClick={() => navigate(n.page, n.param)}
                        className={cn('flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition', i === 0 ? 'bg-brand text-ink' : 'hover:bg-white/5')}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">{n.title}</span>
                          <span className={cn('block text-xs', i === 0 ? 'text-ink/70' : 'text-white/50')}>{n.text}</span>
                        </span>
                        <span className={cn('text-[11px]', i === 0 ? 'text-ink/60' : 'text-white/40')}>{n.time}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Корзина СПРАВА */}
              <IconButton onClick={openCart} badge={totals.count} aria-label="Открыть корзину">
                <ShoppingBag className="h-[18px] w-[18px]" />
              </IconButton>
              <UserPill onClick={() => navigate('account')} />
              <IconButton className="lg:hidden" onClick={() => setMenu((m) => !m)} aria-label="Меню">
                {menu ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </IconButton>
            </div>
          </>
        )}
      </div>

      {menu && !checkout && (
        <div className="fade-in border-t border-line bg-white px-4 pb-5 pt-3 shadow-float lg:hidden">
          <div className="mx-auto grid max-w-[1200px] gap-1.5">
            {[{ id: 'home', label: 'Главная', icon: House }, ...NAV, { id: 'account', label: 'Личный кабинет', icon: User }].map((n) => {
              const A = active === n.id;
              const I = n.icon;
              return (
                <button
                  key={n.id}
                  onClick={() => navigate(n.id)}
                  className={cn('flex h-12 items-center gap-3 rounded-full pl-1.5 pr-4 text-left text-[15px] font-semibold', A ? 'bg-ink text-white' : 'hover:bg-soft')}
                >
                  <span className={cn('flex h-9 w-9 items-center justify-center rounded-full', A ? 'bg-brand text-ink' : 'bg-soft')}>
                    <I className="h-4 w-4" />
                  </span>
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

import React from 'react';
