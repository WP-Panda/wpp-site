import { useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  Heart,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MapPin,
  Package,
  RefreshCw,
  Search,
  User,
  UserCog,
} from 'lucide-react';
import { useApp } from '../context';
import { accountLicenses, formatOptionLabel, productById, testimonials, type Order } from '../data';
import { ProductCard } from '../components/ProductCard';
import { ProductThumb } from '../components/ProductMedia';
import { Button, Checkbox, CopyButton, EmptyBox, Field, IconCircle, Logo, SectionCard, Segmented, StatusBadge, inputCls, rub } from '../components/ui';
import { cn } from '../utils/cn';
import { AccountDetails, Address, Downloads, Licenses, PaymentMethods, TicketView, Tickets, Wishlist } from './AccountSections';
import { SupportForm } from './Support';

const MENU = [
  { id: 'dashboard', label: 'Панель управления', icon: LayoutDashboard },
  { id: 'orders', label: 'Заказы', icon: Package },
  { id: 'downloads', label: 'Загрузки', icon: Download },
  { id: 'licenses', label: 'Лицензии и ключи', icon: KeyRound },
  { id: 'tickets', label: 'Поддержка', icon: LifeBuoy },
  { id: 'wishlist', label: 'Избранное', icon: Heart },
  { id: 'address', label: 'Платёжный адрес', icon: MapPin },
  { id: 'payment', label: 'Способы оплаты', icon: CreditCard },
  { id: 'details', label: 'Данные аккаунта', icon: UserCog },
];

const TITLES: Record<string, [string, string]> = {
  dashboard: ['Панель управления', 'Обзор купленных тем, плагинов и обновлений'],
  orders: ['Заказы', 'История покупок, счета и чеки'],
  downloads: ['Загрузки', 'Свежие версии купленных продуктов'],
  licenses: ['Лицензии и ключи', 'Ключи для тем (1 или 5 сайтов) и плагинов (навсегда)'],
  tickets: ['Тикеты поддержки', 'Ваши обращения и ответы инженеров'],
  'new-ticket': ['Новое обращение', 'Создайте тикет — переписка останется в личном кабинете'],
  wishlist: ['Избранное', 'Сохранённые темы и плагины'],
  address: ['Платёжный адрес', 'Данные для счетов и закрывающих документов'],
  payment: ['Способы оплаты', 'Сохранённые карты и другие способы'],
  details: ['Данные аккаунта', 'Профиль, пароль, безопасность и уведомления'],
};

export function Account() {
  const { route, navigate, orders, wishlist, supportTickets } = useApp();
  const [logged, setLogged] = useState(true);
  const ticketId = route.param?.startsWith('ticket/') ? route.param.slice('ticket/'.length) : null;
  const openedTicket = ticketId ? supportTickets.find((t) => t.id === ticketId) : null;
  const tab = ticketId ? 'tickets' : route.param && TITLES[route.param] ? route.param : 'dashboard';

  if (!logged) return <AuthScreen onLogin={() => setLogged(true)} />;

  const go = (t: string) => navigate('account', t);
  const badges: Record<string, string | undefined> = {
    orders: String(orders.length),
    licenses: String(accountLicenses.length),
    tickets: String(supportTickets.filter((ticket) => ticket.status !== 'closed').length),
    wishlist: wishlist.length ? String(wishlist.length) : undefined,
  };

  let content: ReactNode;
  if (ticketId) {
    content = openedTicket ? (
      <TicketView ticket={openedTicket} />
    ) : (
      <div className="rounded-card border border-line bg-white p-10 text-center shadow-card">
        <p className="text-muted">Тикет не найден.</p>
        <Button className="mt-4" onClick={() => navigate('account', 'tickets')}>
          К списку обращений
        </Button>
      </div>
    );
  } else
  switch (tab) {
    case 'orders':
      content = <Orders />;
      break;
    case 'downloads':
      content = <Downloads />;
      break;
    case 'licenses':
      content = <Licenses />;
      break;
    case 'tickets':
      content = <Tickets />;
      break;
    case 'new-ticket':
      content = <SupportForm inAccount />;
      break;
    case 'wishlist':
      content = <Wishlist />;
      break;
    case 'address':
      content = <Address />;
      break;
    case 'payment':
      content = <PaymentMethods />;
      break;
    case 'details':
      content = <AccountDetails />;
      break;
    default:
      content = <Dashboard go={go} />;
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6 sm:pt-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="text-sm text-muted">Личный кабинет</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]">
            {ticketId ? (openedTicket ? `Тикет #${openedTicket.id}` : 'Тикет не найден') : TITLES[tab][0]}
          </h1>
          <p className="mt-1 text-muted">{ticketId ? 'Переписка с поддержкой и похожие вопросы' : TITLES[tab][1]}</p>
        </div>
        <div className="flex items-center gap-3 self-start rounded-full border border-line bg-white p-1.5 pr-5 shadow-card sm:self-auto">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand">
            <User className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Алексей Морозов</div>
            <div className="text-xs text-muted">alex@morozov.dev · клиент с 2023</div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[268px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24">
          <nav className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:rounded-card lg:border lg:border-line lg:bg-white lg:p-2 lg:shadow-card">
            {MENU.map((m) => {
              const A = tab === m.id;
              const I = m.icon;
              const b = badges[m.id];
              return (
                <button
                  key={m.id}
                  onClick={() => go(m.id)}
                  className={cn(
                    'flex flex-shrink-0 items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-left text-sm font-semibold transition-all lg:w-full lg:border-0',
                    A ? 'border-ink bg-ink text-white shadow-[0_8px_20px_-10px_rgba(20,20,28,0.7)]' : 'border-line bg-white text-ink/80 hover:bg-soft lg:bg-transparent',
                  )}
                >
                  <span className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full', A ? 'bg-brand text-ink' : 'bg-soft text-ink/70')}>
                    <I className="h-4 w-4" />
                  </span>
                  <span className="flex-1 whitespace-nowrap">{m.label}</span>
                  {b && <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-bold', A ? 'bg-white/15 text-white' : 'bg-brand-50 text-ink')}>{b}</span>}
                </button>
              );
            })}
            <div className="my-1.5 hidden border-t border-line lg:block" />
            <button
              onClick={() => setLogged(false)}
              className="flex flex-shrink-0 items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 lg:w-full lg:border-0 lg:bg-transparent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50">
                <LogOut className="h-4 w-4" />
              </span>
              Выйти
            </button>
          </nav>
          <div className="dark-card mt-4 hidden rounded-card p-5 text-white lg:block">
            <IconCircle tone="yellow">
              <LifeBuoy className="h-4 w-4" />
            </IconCircle>
            <div className="mt-4 font-semibold">Нужна помощь?</div>
            <p className="mt-1 text-sm text-white/65">Команда WPP Team на связи</p>
            <Button size="sm" className="mt-4 w-full" onClick={() => navigate('account', 'new-ticket')}>
              Новый тикет
            </Button>
          </div>
        </aside>

        <section key={tab} className="fade-up min-w-0">
          {content}
        </section>
      </div>
    </div>
  );
}

/* ---------------- Панель управления ---------------- */
function Dashboard({ go }: { go: (t: string) => void }) {
  const { orders, navigate } = useApp();
  const active = accountLicenses.length;

  return (
    <div className="space-y-5">
      <div className="dark-card relative overflow-hidden rounded-card p-6 text-white sm:p-8">
        <div className="relative z-10 max-w-lg">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Добро пожаловать</div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Привет, Алексей! 👋</h2>
          <p className="mt-2 text-white/70">
            У вас {active} активных лицензий. Плагины доступны навсегда, темы привязаны к вашим доменам.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={() => go('licenses')} arrow>
              Мои лицензии
            </Button>
            <Button variant="white" className="bg-white/10 text-white hover:bg-white/15" onClick={() => go('downloads')}>
              Загрузки
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-16 -right-10 hidden h-64 w-64 rounded-full border-[28px] border-white/5 sm:block" />
        <div className="pointer-events-none absolute right-12 top-8 hidden h-24 w-24 rounded-full border-[14px] border-brand/25 sm:block" />
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { icon: KeyRound, label: 'Лицензии и ключи', value: active, tab: 'licenses' },
          { icon: Download, label: 'Доступно загрузок', value: active, tab: 'downloads' },
          { icon: Package, label: 'Всего заказов', value: orders.length, tab: 'orders' },
          { icon: LifeBuoy, label: 'Открытые тикеты', value: 1, tab: 'tickets' },
        ].map((s) => (
          <button key={s.label} onClick={() => go(s.tab)} className="group rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
            <div className="flex items-center justify-between">
              <IconCircle tone="brand">
                <s.icon className="h-4 w-4" />
              </IconCircle>
              <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-ink" />
            </div>
            <div className="mt-5 text-3xl font-bold tabular-nums">{s.value}</div>
            <div className="text-[13px] text-muted">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <SectionCard
          title="Последние заказы"
          right={
            <button onClick={() => go('orders')} className="text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4">
              Все заказы
            </button>
          }
        >
          <div className="divide-y divide-line">
            {orders.slice(0, 4).map((o) => (
              <OrderLine key={o.id} order={o} onOpen={() => go('orders')} />
            ))}
          </div>
        </SectionCard>
        <div className="space-y-5">
          <SectionCard title="Быстрый доступ к ключам">
            <div className="space-y-3">
              {accountLicenses.slice(0, 3).map((l) => {
                const pp = productById(l.productId);
                return (
                  <div key={l.key} className="flex items-center gap-3">
                    <ProductThumb product={pp} className="h-10 w-10 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold truncate">{pp.name}</div>
                      <div className="text-xs text-muted truncate">
                        {pp.type === 'plugin' ? 'Плагин навсегда' : `Тема · ${formatOptionLabel(pp, l.opt)}`}
                      </div>
                    </div>
                    <CopyButton text={l.key} />
                  </div>
                );
              })}
            </div>
          </SectionCard>
          <SectionCard title="Доступны обновления">
            <div className="space-y-1">
              {[
                { id: 1, from: '3.1.4' },
                { id: 9, from: '5.3.0' },
              ].map((u) => {
                const pp = productById(u.id);
                return (
                  <div key={u.id} className="flex items-center gap-3 py-1.5">
                    <ProductThumb product={pp} className="h-10 w-10 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{pp.name}</div>
                      <div className="text-xs text-muted">
                        {u.from} → <b className="text-ink">{pp.version}</b>
                      </div>
                    </div>
                    <Button size="sm" variant="soft" onClick={() => go('downloads')}>
                      <Download className="h-3.5 w-3.5" />
                      Скачать
                    </Button>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight">Рекомендуем для ваших сайтов</h3>
          <button onClick={() => navigate('shop')} className="text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4">
            В каталог
          </button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[12, 14, 2].map((id) => (
            <ProductCard key={id} product={productById(id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderLine({ order, onOpen }: { order: Order; onOpen: () => void }) {
  const first = productById(order.items[0].productId);
  return (
    <button onClick={onOpen} className="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0">
      <ProductThumb product={first} className="h-11 w-11 rounded-xl" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm font-semibold">
          #{order.id}
          <span className="font-normal text-muted">· {order.date}</span>
        </div>
        <div className="truncate text-xs text-muted">{order.items.map((i) => productById(i.productId).name).join(', ')}</div>
      </div>
      <StatusBadge status={order.status} className="hidden sm:inline-flex" />
      <div className="w-24 text-right text-sm font-bold tabular-nums">{rub(order.total)}</div>
    </button>
  );
}

/* ---------------- Заказы ---------------- */
function Orders() {
  const { orders } = useApp();
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing' | 'refunded'>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const open = orders.find((o) => o.id === openId);
  if (open) return <OrderView order={open} onBack={() => setOpenId(null)} />;

  const list = orders.filter(
    (o) =>
      (filter === 'all' || o.status === filter) &&
      `${o.id} ${o.items.map((i) => productById(i.productId).name).join(' ')}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="no-scrollbar overflow-x-auto xl:max-w-[520px] xl:flex-1">
          <Segmented
            className="min-w-max sm:min-w-0"
            size="sm"
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: 'Все' },
              { value: 'completed', label: 'Выполненные' },
              { value: 'processing', label: 'В обработке' },
              { value: 'refunded', label: 'Возвраты' },
            ]}
          />
        </div>
        <div className="flex h-12 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
          <Search className="h-4 w-4 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Номер заказа или товар" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" />
        </div>
      </div>

      {list.length ? (
        <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
          <div className="hidden grid-cols-[1fr_1.7fr_1fr_0.9fr_120px] gap-4 border-b border-line bg-soft/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted md:grid">
            <span>Заказ</span>
            <span>Товары</span>
            <span>Статус</span>
            <span className="text-right">Сумма</span>
            <span />
          </div>
          {list.map((o) => (
            <div key={o.id} className="grid grid-cols-2 items-center gap-3 border-b border-line px-5 py-4 last:border-0 md:grid-cols-[1fr_1.7fr_1fr_0.9fr_120px] md:gap-4 md:px-6">
              <div>
                <div className="font-semibold">#{o.id}</div>
                <div className="text-xs text-muted">{o.date}</div>
              </div>
              <div className="order-3 col-span-2 flex min-w-0 items-center gap-2 md:order-none md:col-span-1">
                <div className="flex -space-x-2">
                  {o.items.map((i) => (
                    <ProductThumb key={i.productId} product={productById(i.productId)} className="h-8 w-8 rounded-full border-2 border-white" />
                  ))}
                </div>
                <span className="truncate text-sm">{o.items.map((i) => productById(i.productId).name).join(', ')}</span>
              </div>
              <div className="justify-self-end md:justify-self-start">
                <StatusBadge status={o.status} />
              </div>
              <div className="hidden text-right font-bold tabular-nums md:block">{rub(o.total)}</div>
              <div className="order-4 col-span-2 flex items-center justify-between gap-2 md:order-none md:col-span-1 md:justify-end">
                <span className="font-bold tabular-nums md:hidden">{rub(o.total)}</span>
                <Button size="sm" variant="soft" onClick={() => setOpenId(o.id)}>
                  Подробнее
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyBox icon={<Package className="h-6 w-6" />} title="Заказы не найдены" text="Попробуйте изменить фильтр или поисковый запрос." />
      )}
    </div>
  );
}

function OrderView({ order, onBack }: { order: Order; onBack: () => void }) {
  const { addToCart } = useApp();
  const subtotal = order.items.reduce((s, i) => s + i.price, 0);
  const done = order.status === 'completed';
  const keyFor = (productId: number) => accountLicenses.find((l) => l.productId === productId && l.order === order.id)?.key ?? `WPP-${order.id.slice(3)}-${productId}A7K-X2QW`;

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Все заказы
      </button>
      <div className="flex flex-col justify-between gap-4 rounded-card border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">Заказ #{order.id}</h2>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-sm text-muted">
            Оформлен {order.date} · {order.method}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4" />
            Счёт PDF
          </Button>
          <Button size="sm" onClick={() => order.items.forEach((i, idx) => addToCart(i.productId, i.opt, idx === order.items.length - 1))}>
            <RefreshCw className="h-3.5 w-3.5" />
            Повторить заказ
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <SectionCard n={1} title="Купленные товары">
          <div className="space-y-3">
            {order.items.map((i) => {
              const p = productById(i.productId);
              return (
                <div key={i.productId} className="rounded-2xl border border-line p-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <ProductThumb product={p} className="h-12 w-12 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-muted">
                        {p.type === 'theme' ? formatOptionLabel(p, i.opt) : 'Лицензия навсегда'}
                      </div>
                    </div>
                    <div className="font-bold tabular-nums">{rub(i.price)}</div>
                  </div>
                  {done && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-soft px-3 py-2.5">
                      <KeyRound className="h-4 w-4 text-muted" />
                      <code className="min-w-0 flex-1 truncate font-mono text-sm font-semibold tracking-wider">{keyFor(i.productId)}</code>
                      <CopyButton text={keyFor(i.productId)} />
                      <Button size="sm" className="h-8">
                        <Download className="h-3.5 w-3.5" />
                        .zip
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 border-t border-line pt-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">История заказа</div>
            <ol className="mt-4 space-y-4">
              {[
                ['Заказ оформлен', `${order.date}, 14:02`],
                [order.status === 'processing' ? 'Ожидаем оплату по счёту' : order.status === 'refunded' ? 'Оплата возвращена на карту' : 'Оплата получена', `${order.date}, 14:03`],
                [done ? 'Ключи и файлы отправлены на email' : 'Ключи будут отправлены после оплаты', done ? `${order.date}, 14:03` : '—'],
              ].map(([t, d], idx) => (
                <li key={t} className="flex gap-3">
                  <span className={cn('mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full', idx < 2 || done ? 'bg-brand' : 'border border-line bg-soft')}>
                    {(idx < 2 || done) && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{t}</div>
                    <div className="text-xs text-muted">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </SectionCard>
        <div className="space-y-5">
          <SectionCard title="Сумма">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Подытог</span>
                <span className="font-semibold tabular-nums">{rub(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Скидка</span>
                <span className="font-semibold">0 ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Способ оплаты</span>
                <span className="font-semibold">{order.method}</span>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-dashed border-line pt-4">
              <span className="text-sm text-muted">Итого</span>
              <span className="text-2xl font-bold tabular-nums">{rub(order.total)}</span>
            </div>
          </SectionCard>
          <SectionCard title="Плательщик">
            <div className="text-sm leading-relaxed text-muted">
              <b className="text-ink">Алексей Морозов</b>
              <br />
              ООО «Пиксель», ИНН 7701234567
              <br />
              Россия, Москва
              <br />
              alex@morozov.dev
              <br />
              +7 916 123-45-67
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Вход / регистрация ---------------- */
function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const t = testimonials[1];

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-6 sm:px-6 sm:pt-10">
      <div className="grid overflow-hidden rounded-[28px] border border-line bg-white shadow-float lg:grid-cols-2">
        <div className="dark-card relative hidden flex-col justify-between gap-10 p-10 text-white lg:flex">
          <Logo light />
          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight">Все лицензии, загрузки и обновления — в одном месте</h2>
            <ul className="mt-8 space-y-4 text-white/85">
              {['Скачивайте свежие версии тем и плагинов', 'Управляйте привязками к сайтам', 'Плагины доступны навсегда', 'Создавайте тикеты и следите за ответами'].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
            <p className="text-sm text-white/80">
              «Самый удобный кабинет из всех маркетплейсов тем, что я видел»
              <span className="mt-1 block text-xs text-white/50">— {t.name}</span>
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <Segmented
            value={mode}
            onChange={setMode}
            options={[
              { value: 'login', label: 'Вход' },
              { value: 'register', label: 'Регистрация' },
            ]}
          />
          <h1 className="mt-8 text-3xl font-bold tracking-tight">{mode === 'login' ? 'С возвращением!' : 'Создайте аккаунт'}</h1>
          <p className="mt-2 text-muted">{mode === 'login' ? 'Войдите, чтобы получить доступ к лицензиям и загрузкам.' : 'Регистрация займёт меньше минуты.'}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
            className="mt-7 space-y-4"
          >
            {mode === 'register' && <Field label="Имя" placeholder="Как к вам обращаться" />}
            <Field label={mode === 'login' ? 'Email или логин' : 'Email'} placeholder="you@example.ru" defaultValue="alex@morozov.dev" />
            <label className="block">
              <span className="mb-2 flex items-center justify-between text-[13px] font-medium">
                Пароль
                {mode === 'login' && (
                  <button type="button" className="text-xs font-semibold text-muted hover:text-ink">
                    Забыли пароль?
                  </button>
                )}
              </span>
              <span className="relative block">
                <input type={show ? 'text' : 'password'} defaultValue="password123" className={cn(inputCls, 'pr-12')} />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-white hover:text-ink">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>
            <button type="button" onClick={() => setRemember((r) => !r)} className="flex items-start gap-2.5 text-left text-sm">
              <Checkbox checked={remember} />
              {mode === 'login' ? 'Запомнить меня' : 'Согласен с условиями и политикой конфиденциальности'}
            </button>
            <Button type="submit" size="lg" className="w-full" arrow>
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
