import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { coupons, initialOrders, oldPriceFor, priceFor, productById, tickets as initialTickets, type Coupon, type Order, type ThemeLicenseId, type Ticket } from './data';

export type CartLine = { productId: number; opt?: ThemeLicenseId };
export type Route = { page: string; param?: string };
export type Totals = { subtotal: number; saved: number; discount: number; total: number; count: number };

type AppState = {
  route: Route;
  navigate: (page: string, param?: string) => void;
  cart: CartLine[];
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: number, opt?: ThemeLicenseId, open?: boolean) => void;
  removeFromCart: (productId: number) => void;
  setLineOption: (productId: number, opt?: ThemeLicenseId) => void;
  clearCart: () => void;
  inCart: (productId: number) => boolean;
  coupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  totals: Totals;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  supportTickets: Ticket[];
  createTicket: (input: { subject: string; productId: number; name: string; message: string; topic?: string; priority?: 'normal' | 'high' | 'critical' }) => Ticket;
  replyTicket: (ticketId: string, text: string) => void;
};

const AppContext = createContext<AppState | null>(null);

const parseHash = (): Route => {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [page, param] = raw.split('/');
  return { page: page || 'home', param: param ? decodeURIComponent(param) : undefined };
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parseHash);
  const [cart, setCart] = useState<CartLine[]>([
    { productId: 1, opt: 'single' },
    { productId: 9 }, // плагин (без опций, навсегда)
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([3, 11, 15]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [supportTickets, setSupportTickets] = useState<Ticket[]>(initialTickets);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      setCartOpen(false);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((page: string, param?: string) => {
    const next = `#/${page}${param ? `/${encodeURIComponent(param)}` : ''}`;
    if (window.location.hash === next) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = next;
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addToCart = useCallback((productId: number, opt?: ThemeLicenseId, open = true) => {
    setCart((prev) => {
      const p = productById(productId);
      const chosenOpt: ThemeLicenseId | undefined = p.type === 'theme' ? (opt ?? 'single') : undefined;
      return prev.some((l) => l.productId === productId)
        ? prev.map((l) => (l.productId === productId ? { ...l, opt: chosenOpt } : l))
        : [...prev, { productId, opt: chosenOpt }];
    });
    if (open) setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => setCart((prev) => prev.filter((l) => l.productId !== productId)), []);
  const setLineOption = useCallback(
    (productId: number, opt?: ThemeLicenseId) => setCart((prev) => prev.map((l) => (l.productId === productId ? { ...l, opt } : l))),
    [],
  );
  const clearCart = useCallback(() => {
    setCart([]);
    setCoupon(null);
  }, []);
  const applyCoupon = useCallback((code: string) => {
    const c = coupons[code.trim().toUpperCase()];
    if (c) setCoupon(c);
    return Boolean(c);
  }, []);
  const removeCoupon = useCallback(() => setCoupon(null), []);
  const toggleWishlist = useCallback((id: number) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])), []);
  const addOrder = useCallback((o: Order) => setOrders((prev) => [o, ...prev]), []);
  const createTicket = useCallback((input: { subject: string; productId: number; name: string; message: string; topic?: string; priority?: 'normal' | 'high' | 'critical' }) => {
    const ticket: Ticket = {
      id: `T-${Math.floor(48300 + Math.random() * 600)}`,
      subject: input.subject,
      topic: input.topic,
      priority: input.priority ?? 'normal',
      productId: input.productId,
      status: 'open',
      updated: 'Только что',
      messages: [{ from: 'me', name: input.name, time: 'Только что', text: input.message }],
    };
    setSupportTickets((prev) => [ticket, ...prev]);
    return ticket;
  }, []);
  const replyTicket = useCallback((ticketId: string, text: string) => {
    setSupportTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, updated: 'Только что', messages: [...t.messages, { from: 'me', name: 'Алексей', time: 'Только что', text }] }
          : t,
      ),
    );
  }, []);

  const totals = useMemo<Totals>(() => {
    let subtotal = 0;
    let saved = 0;
    for (const l of cart) {
      const p = productById(l.productId);
      const price = priceFor(p, l.opt);
      subtotal += price;
      const old = oldPriceFor(p, l.opt);
      if (old) saved += old - price;
    }
    const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
    return { subtotal, saved, discount, total: subtotal - discount, count: cart.length };
  }, [cart, coupon]);

  const value = useMemo<AppState>(
    () => ({
      route,
      navigate,
      cart,
      cartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      setLineOption,
      clearCart,
      inCart: (id: number) => cart.some((l) => l.productId === id),
      coupon,
      applyCoupon,
      removeCoupon,
      totals,
      wishlist,
      toggleWishlist,
      orders,
      addOrder,
      supportTickets,
      createTicket,
      replyTicket,
    }),
    [route, navigate, cart, cartOpen, openCart, closeCart, addToCart, removeFromCart, setLineOption, clearCart, coupon, applyCoupon, removeCoupon, totals, wishlist, toggleWishlist, orders, addOrder, supportTickets, createTicket, replyTicket],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
