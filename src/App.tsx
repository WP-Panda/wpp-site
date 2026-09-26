import type { ReactNode } from 'react';
import { ShoppingBag } from 'lucide-react';
import { AppProvider, useApp } from './context';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { rub } from './components/ui';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductPage } from './pages/Product';
import { Checkout } from './pages/Checkout';
import { Blog, BlogPost } from './pages/Blog';
import { KnowledgeBase, KbArticle } from './pages/KnowledgeBase';
import { Support } from './pages/Support';
import { Account } from './pages/Account';
import { UiKit } from './pages/UiKit';
import { FaqPage } from './pages/Faq';

function Shell() {
  const { route, totals, openCart, cartOpen } = useApp();

  let view: ReactNode;
  switch (route.page) {
    case 'shop':
      view = <Shop />;
      break;
    case 'product':
      view = <ProductPage />;
      break;
    case 'checkout':
      view = <Checkout />;
      break;
    case 'blog':
      view = <Blog />;
      break;
    case 'post':
      view = <BlogPost />;
      break;
    case 'kb':
      view = <KnowledgeBase />;
      break;
    case 'kb-article':
      view = <KbArticle />;
      break;
    case 'faq':
      view = <FaqPage />;
      break;
    case 'support':
      view = <Support />;
      break;
    case 'account':
      view = <Account />;
      break;
    case 'ui':
      view = <UiKit />;
      break;
    default:
      view = <Home />;
  }

  // На страницах с нижней sticky-панелью плавающая кнопка не нужна
  const showFab = !['checkout', 'shop', 'product'].includes(route.page) && !cartOpen;

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div aria-hidden className="page-glow pointer-events-none absolute inset-x-0 top-0 h-[620px]" />
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main key={`${route.page}/${route.param ?? ''}`} className="fade-in flex-1">
          {view}
        </main>
        <Footer />
      </div>

      <CartDrawer />

      {showFab && (
        <button
          onClick={openCart}
          aria-label="Открыть корзину"
          className="fixed bottom-5 right-5 z-30 flex h-14 items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-white shadow-float transition hover:-translate-y-0.5"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand text-ink">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {totals.count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-ink ring-2 ring-ink">
                {totals.count}
              </span>
            )}
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[11px] text-white/55">Корзина</span>
            <span className="block text-sm font-semibold tabular-nums">{totals.count ? rub(totals.total) : 'пусто'}</span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
