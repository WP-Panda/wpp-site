import { useState, type ChangeEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  Bitcoin,
  Building2,
  Check,
  CircleAlert,
  CreditCard,
  Download,
  FileText,
  Gift,
  Globe,
  KeyRound,
  Lock,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import { useApp } from '../context';
import { formatOptionLabel, oldPriceFor, priceFor, productById, products, savedCards, themeLicenses, type Order } from '../data';
import { ProductMedia, ProductThumb } from '../components/ProductMedia';
import { Button, CardBrand, Checkbox, CopyButton, Field, IconCircle, RadioDot, SectionCard, SelectField, Spinner, Stepper, StickyBar, TextArea, plural, rub } from '../components/ui';
import { cn } from '../utils/cn';

type PayMethod = 'card' | 'sbp' | 'sberpay' | 'yoomoney' | 'crypto' | 'invoice';
type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  company: string;
  inn: string;
  site: string;
  source: string;
  note: string;
  news: boolean;
  save: boolean;
};
type TextKey = { [K in keyof FormState]: FormState[K] extends string ? K : never }[keyof FormState];

const METHODS: { id: PayMethod; label: string; mark: ReactNode }[] = [
  { id: 'card', label: 'Банковская карта', mark: <CreditCard className="h-4 w-4 text-muted" /> },
  {
    id: 'sbp',
    label: 'СБП',
    mark: (
      <span className="text-[12px] font-extrabold tracking-tight">
        <span className="text-[#5B57A2]">С</span>
        <span className="text-[#D90751]">Б</span>
        <span className="text-[#F5A800]">П</span>
      </span>
    ),
  },
  { id: 'sberpay', label: 'SberPay', mark: <span className="text-[12px] font-extrabold text-[#21A038]">Sber</span> },
  { id: 'yoomoney', label: 'ЮMoney', mark: <span className="text-[12px] font-extrabold text-[#8B3FFD]">ЮM</span> },
  { id: 'crypto', label: 'Криптовалюта', mark: <Bitcoin className="h-4 w-4 text-[#F7931A]" /> },
  { id: 'invoice', label: 'Счёт для юрлиц', mark: <Building2 className="h-4 w-4 text-muted" /> },
];

const TITLES = ['Ваша корзина', 'Оформление заказа', 'Проверка и оплата'];
const SUBS = [
  'Проверьте состав заказа. Для тем выберите 1 или 5 сайтов, плагины предоставляются навсегда.',
  'Укажите контактные данные — на этот email придут лицензионные ключи и ссылки на скачивание.',
  'Проверьте детали заказа перед оплатой и выберите удобный способ.',
];

const formatCard = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ');
const formatExp = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};
const genKey = () =>
  'WPP-' +
  Array.from({ length: 3 }, () =>
    Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()
      .padEnd(4, 'X'),
  ).join('-');

function DetailTile({ icon, label, title, sub, onEdit }: { icon: ReactNode; label: string; title: string; sub: string; onEdit?: () => void }) {
  return (
    <div className="relative flex items-start gap-3 rounded-2xl border border-line p-4">
      <IconCircle>{icon}</IconCircle>
      <div className="min-w-0 flex-1 pr-9">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</div>
        <div className="truncate font-semibold">{title}</div>
        <div className="truncate text-xs text-muted">{sub}</div>
      </div>
      {onEdit && (
        <button onClick={onEdit} aria-label="Изменить" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-ink shadow-glow transition hover:scale-105">
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function QrMock() {
  const size = 21;
  const cells: boolean[] = [];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const inFinder = (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
      if (inFinder) {
        const fx = x >= size - 7 ? x - (size - 7) : x;
        const fy = y >= size - 7 ? y - (size - 7) : y;
        cells.push(fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4));
      } else cells.push((x * 7 + y * 13 + x * y) % 5 < 2);
    }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" shapeRendering="crispEdges">
      {cells.map((on, i) => (on ? <rect key={i} x={i % size} y={Math.floor(i / size)} width="1" height="1" fill="#1c1c21" /> : null))}
    </svg>
  );
}

export function Checkout() {
  const { cart, totals, coupon, navigate, removeFromCart, setLineOption, addToCart, applyCoupon, removeCoupon, clearCart, addOrder, route } = useApp();
  const [step, setStep] = useState(route.param === 'cart' ? 0 : 1);
  const [form, setForm] = useState<FormState>({
    firstName: 'Алексей',
    lastName: 'Морозов',
    email: 'alex@morozov.dev',
    phone: '+7 916 123-45-67',
    country: 'Россия',
    city: 'Москва',
    company: '',
    inn: '',
    site: '',
    source: '',
    note: '',
    news: true,
    save: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<PayMethod>('card');
  const [card, setCard] = useState('c1');
  const [newCard, setNewCard] = useState({ number: '', exp: '', cvc: '' });
  const [network, setNetwork] = useState('USDT · TRC-20');
  const [agree, setAgree] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [placed, setPlaced] = useState<{ order: Order; keys: Record<number, string>; email: string } | null>(null);
  const [code, setCode] = useState('');
  const [codeErr, setCodeErr] = useState('');

  const lines = cart.map((l) => {
    const product = productById(l.productId);
    return { ...l, product, price: priceFor(product, l.opt), old: oldPriceFor(product, l.opt) };
  });
  const count = lines.length;
  const upsells = products.filter((p) => p.type === 'plugin' && !cart.some((l) => l.productId === p.id)).slice(0, 3);
  const methodLabel = METHODS.find((m) => m.id === method)?.label ?? '';
  const selectedCard = savedCards.find((c) => c.id === card);

  const set = (k: TextKey) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Укажите имя';
    if (!form.lastName.trim()) e.lastName = 'Укажите фамилию';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Проверьте email — на него придут ключи';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (method === 'card' && card === 'new') {
      if (newCard.number.replace(/\s/g, '').length < 16) e.number = 'Введите 16 цифр номера карты';
      if (!/^\d{2}\/\d{2}$/.test(newCard.exp)) e.exp = 'Формат ММ/ГГ';
      if (newCard.cvc.length < 3) e.cvc = '3 цифры на обороте';
    }
    if (method === 'invoice') {
      if (!form.company.trim()) e.company = 'Укажите название компании';
      if (!/^\d{10,12}$/.test(form.inn)) e.inn = 'ИНН — 10 или 12 цифр';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const pay = () => {
    if (!agree || !validatePayment()) return;
    setProcessing(true);
    setTimeout(() => {
      const keys: Record<number, string> = {};
      lines.forEach((l) => {
        keys[l.productId] = genKey();
      });
      const order: Order = {
        id: `PM-${10500 + Math.floor(Math.random() * 400)}`,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', ''),
        status: method === 'invoice' ? 'processing' : 'completed',
        items: lines.map((l) => ({ productId: l.productId, opt: l.opt, price: l.price })),
        total: totals.total,
        method: method === 'card' ? `Карта •••• ${card === 'new' ? newCard.number.slice(-4) || '0000' : selectedCard?.last4}` : methodLabel,
      };
      addOrder(order);
      setPlaced({ order, keys, email: form.email });
      clearCart();
      setProcessing(false);
      setStep(3);
      scrollTop();
    }, 1400);
  };

  const next = () => {
    if (step === 0) {
      setStep(1);
      scrollTop();
    } else if (step === 1) {
      if (validateDetails()) {
        setStep(2);
        scrollTop();
      }
    } else if (step === 2) pay();
  };

  const cta = step === 0 ? 'Перейти к оформлению' : step === 1 ? 'Перейти к оплате' : `Оплатить ${rub(totals.total)}`;
  const doneCount = placed?.order.items.length ?? 0;
  const steps = [
    {
      title: 'Корзина',
      subtitle: placed ? `${doneCount} ${plural(doneCount, ['товар', 'товара', 'товаров'])}` : count ? `${count} ${plural(count, ['товар', 'товара', 'товаров'])}` : 'Пусто',
    },
    { title: 'Данные', subtitle: step > 1 ? `${form.firstName} ${form.lastName}` : step === 1 ? 'Заполните форму' : 'Не заполнено' },
    { title: 'Оплата', subtitle: step > 2 ? methodLabel : step === 2 ? 'Выберите способ' : 'Не выбрано' },
    { title: 'Готово', subtitle: step === 3 ? (placed?.order.status === 'processing' ? 'Счёт выставлен' : 'Заказ оплачен') : 'Финальный шаг' },
  ];

  /* ---------------- Шаг 1: корзина ---------------- */
  const renderCart = () => (
    <>
      <SectionCard n={1} title="Товары в заказе" right={<span className="text-sm text-muted">{count} {plural(count, ['товар', 'товара', 'товаров'])}</span>}>
        <div className="space-y-3">
          {lines.map((l) => (
            <div key={l.productId} className="rounded-2xl border border-line p-3 sm:p-4">
              <div className="flex gap-4">
                <button onClick={() => navigate('product', l.product.slug)} className="w-28 flex-shrink-0 overflow-hidden rounded-xl sm:w-40">
                  <ProductMedia product={l.product} />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {l.product.type === 'theme' ? 'Тема' : 'Плагин · Навсегда'} · v{l.product.version}
                      </div>
                      <div className="text-lg font-semibold tracking-tight">{l.product.name}</div>
                      <div className="line-clamp-2 text-[13px] text-muted">{l.product.tagline}</div>
                    </div>
                    <button
                      onClick={() => removeFromCart(l.productId)}
                      aria-label="Удалить"
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ДЛЯ ТЕМ — выбор 1 сайт или 5 сайтов. ДЛЯ ПЛАГИНОВ — пометка «Навсегда» */}
              <div className="mt-4">
                {l.product.type === 'theme' ? (
                  <div className="grid grid-cols-2 gap-2">
                    {themeLicenses.map((lic) => {
                      const sel = (l.opt ?? 'single') === lic.id;
                      return (
                        <button
                          key={lic.id}
                          onClick={() => setLineOption(l.productId, lic.id)}
                          className={cn('relative rounded-xl border p-2.5 text-left transition-all sm:p-3', sel ? 'border-brand bg-brand-50/60 ring-1 ring-brand' : 'border-line hover:border-ink/20')}
                        >
                          <div className="flex items-center gap-2">
                            <RadioDot checked={sel} small />
                            <span className="truncate text-[13px] font-semibold">{lic.name}</span>
                          </div>
                          <div className="mt-1 truncate pl-6 text-[11px] text-muted">{lic.desc}</div>
                          <div className="mt-1.5 pl-6 text-sm font-bold tabular-nums">{rub(priceFor(l.product, lic.id))}</div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-xl bg-soft px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />
                      Лицензия навсегда (все будущие обновления включены)
                    </div>
                    <div className="font-bold tabular-nums">{rub(l.product.price)}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        n={2}
        title="Промокод"
        right={
          <span className="text-xs text-muted">
            Попробуйте <b className="text-ink">WELCOME30</b>
          </span>
        }
      >
        {coupon ? (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-brand bg-brand-50 px-4 py-3.5">
            <span className="flex items-center gap-3">
              <IconCircle tone="yellow" className="h-9 w-9">
                <Ticket className="h-4 w-4" />
              </IconCircle>
              <span>
                <span className="block text-sm font-semibold">{coupon.code} применён</span>
                <span className="block text-xs text-muted">
                  {coupon.label} · −{rub(totals.discount)}
                </span>
              </span>
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
                setCodeErr('');
              } else setCodeErr('Такого промокода нет или срок его действия истёк');
            }}
            className="flex flex-col gap-2 sm:flex-row sm:items-start"
          >
            <Field className="flex-1" placeholder="Введите промокод" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} error={codeErr} />
            <Button type="submit" variant="dark" className="h-12 px-6">
              Применить
            </Button>
          </form>
        )}
      </SectionCard>

      {upsells.length > 0 && (
        <SectionCard n={3} title="Плагины с лицензией навсегда" right={<span className="text-xs text-muted">Добавьте в один клик</span>}>
          <div className="grid gap-3 sm:grid-cols-3">
            {upsells.map((p) => (
              <div key={p.id} className="flex flex-col rounded-2xl border border-line p-2.5 transition hover:border-ink/15">
                <div className="overflow-hidden rounded-xl">
                  <ProductMedia product={p} />
                </div>
                <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="mt-0.5 line-clamp-2 text-xs text-muted">{p.tagline}</div>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="text-sm font-bold tabular-nums">{rub(p.price)}</span>
                    <Button size="sm" onClick={() => addToCart(p.id, undefined, false)}>
                      <Plus className="h-3.5 w-3.5" />
                      Добавить
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </>
  );

  /* ---------------- Шаг 2: данные покупателя ---------------- */
  const renderDetails = () => (
    <>
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm ring-1 ring-brand-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand">
          <User className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          Вы вошли как <b>alex@morozov.dev</b> — данные заполнены из профиля.
        </span>
        <button onClick={() => navigate('account', 'details')} className="text-xs font-semibold underline decoration-brand decoration-2 underline-offset-4">
          Изменить профиль
        </button>
      </div>

      <SectionCard n={1} title="Контактные данные" right={<span className="text-xs text-muted">Ключи придут на email</span>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя" placeholder="Введите имя" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
          <Field label="Фамилия" placeholder="Введите фамилию" value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
          <Field label="Email" type="email" placeholder="you@example.ru" value={form.email} onChange={set('email')} error={errors.email} />
          <Field label="Телефон" optional type="tel" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={set('phone')} />
        </div>
      </SectionCard>

      <SectionCard n={2} title="Платёжные данные" right={<span className="text-xs text-muted">Для чека и закрывающих документов</span>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Страна" value={form.country} onChange={set('country')}>
            {['Россия', 'Беларусь', 'Казахстан', 'Армения', 'Узбекистан', 'Другая страна'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectField>
          <Field label="Город" placeholder="Москва" value={form.city} onChange={set('city')} />
          <Field label="Компания" optional placeholder="ООО «Пиксель»" value={form.company} onChange={set('company')} />
          <Field label="ИНН" optional placeholder="Для закрывающих документов" value={form.inn} onChange={set('inn')} />
        </div>
      </SectionCard>

      <SectionCard n={3} title="Дополнительно">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Домен для активации" optional placeholder="example.ru" value={form.site} onChange={set('site')} hint="Ключ можно активировать и позже" />
          <SelectField label="Откуда вы о нас узнали?" optional value={form.source} onChange={set('source')}>
            <option value="">Выберите вариант</option>
            {['Поиск Яндекс / Google', 'Рекомендация коллег', 'Блог или статья', 'Telegram-канал', 'Другое'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectField>
        </div>
        <TextArea className="mt-4" label="Комментарий к заказу" optional placeholder="Например: нужны закрывающие документы через ЭДО" value={form.note} onChange={set('note')} />
        <div className="mt-4 space-y-1">
          <button type="button" onClick={() => setForm((f) => ({ ...f, save: !f.save }))} className="flex w-full items-start gap-3 rounded-xl py-1.5 text-left text-sm">
            <Checkbox checked={form.save} />
            Сохранить данные для следующих покупок
          </button>
          <button type="button" onClick={() => setForm((f) => ({ ...f, news: !f.news }))} className="flex w-full items-start gap-3 rounded-xl py-1.5 text-left text-sm">
            <Checkbox checked={form.news} />
            Сообщать о новых версиях и персональных скидках
          </button>
        </div>
      </SectionCard>
    </>
  );

  /* ---------------- Шаг 3: оплата ---------------- */
  const renderMethodDetails = () => {
    if (method === 'card')
      return (
        <div className="space-y-2.5">
          {savedCards.map((c) => {
            const sel = card === c.id && c.ok;
            return (
              <button
                key={c.id}
                disabled={!c.ok}
                onClick={() => setCard(c.id)}
                className={cn(
                  'flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all',
                  !c.ok ? 'border-line bg-soft/70' : sel ? 'border-ink ring-1 ring-ink' : 'border-line hover:border-ink/20',
                )}
              >
                <RadioDot checked={sel} disabled={!c.ok} />
                <div className="min-w-0 flex-1">
                  <div className={cn('font-semibold tracking-wider', !c.ok && 'text-muted')}>•••• •••• •••• {c.last4}</div>
                  {c.ok ? (
                    <div className="text-xs text-muted">
                      Действует до {c.exp}
                      {c.isDefault && ' · Основная'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-rose-500">
                      <CircleAlert className="h-3.5 w-3.5 flex-shrink-0" />
                      Срок действия карты истёк. Выберите другой способ оплаты.
                    </div>
                  )}
                </div>
                <CardBrand brand={c.brand} className={!c.ok ? 'opacity-40' : ''} />
              </button>
            );
          })}
          <button
            onClick={() => setCard('new')}
            className={cn('flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all', card === 'new' ? 'border-ink ring-1 ring-ink' : 'border-line hover:border-ink/20')}
          >
            <RadioDot checked={card === 'new'} />
            <span className="flex flex-1 items-center gap-2 font-semibold">
              <Plus className="h-4 w-4" />
              Новая карта
            </span>
            <span className="hidden items-center gap-2.5 sm:flex">
              <CardBrand brand="Mastercard" />
              <CardBrand brand="VISA" />
              <CardBrand brand="МИР" />
            </span>
          </button>
          {card === 'new' && (
            <div className="fade-up grid gap-4 rounded-2xl border border-line bg-soft/50 p-4 sm:grid-cols-2">
              <Field
                className="sm:col-span-2"
                label="Номер карты"
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                value={newCard.number}
                onChange={(e) => setNewCard((c) => ({ ...c, number: formatCard(e.target.value) }))}
                error={errors.number}
              />
              <Field label="Срок действия" placeholder="ММ/ГГ" inputMode="numeric" value={newCard.exp} onChange={(e) => setNewCard((c) => ({ ...c, exp: formatExp(e.target.value) }))} error={errors.exp} />
              <Field
                label="CVC / CVV"
                type="password"
                placeholder="•••"
                inputMode="numeric"
                value={newCard.cvc}
                onChange={(e) => setNewCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                error={errors.cvc}
              />
              <p className="flex items-center gap-2 text-xs text-muted sm:col-span-2">
                <Lock className="h-3.5 w-3.5" />
                Данные карты передаются напрямую в платёжный шлюз и не хранятся на сайте.
              </p>
            </div>
          )}
        </div>
      );
    if (method === 'sbp')
      return (
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-line bg-soft/50 p-5 sm:flex-row">
          <div className="h-28 w-28 flex-shrink-0 rounded-xl bg-white p-2.5 shadow-card">
            <QrMock />
          </div>
          <div>
            <div className="font-semibold">Оплата по QR-коду через СБП</div>
            <p className="mt-1 text-sm text-muted">После нажатия «Оплатить» появится QR-код. Отсканируйте его в приложении банка — оплата пройдёт за несколько секунд и без комиссии.</p>
          </div>
        </div>
      );
    if (method === 'sberpay' || method === 'yoomoney')
      return (
        <div className="flex items-start gap-4 rounded-2xl border border-line bg-soft/50 p-5">
          <IconCircle tone="white">
            <Lock className="h-4 w-4" />
          </IconCircle>
          <div>
            <div className="font-semibold">Переход на страницу {methodLabel}</div>
            <p className="mt-1 text-sm text-muted">Вы подтвердите платёж в приложении {methodLabel} и автоматически вернётесь на сайт — ключи придут сразу после оплаты.</p>
          </div>
        </div>
      );
    if (method === 'crypto')
      return (
        <div className="rounded-2xl border border-line bg-soft/50 p-5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {['USDT · TRC-20', 'USDT · ERC-20', 'BTC', 'TON'].map((n) => (
              <button
                key={n}
                onClick={() => setNetwork(n)}
                className={cn('flex h-11 items-center justify-center gap-2 rounded-xl border bg-white text-[13px] font-semibold transition', network === n ? 'border-brand ring-1 ring-brand' : 'border-line hover:border-ink/20')}
              >
                <RadioDot checked={network === n} small />
                {n}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            Курс фиксируется на 30 минут. К оплате ≈ <b className="text-ink">{(totals.total / 92).toFixed(2)} USDT</b>
          </p>
        </div>
      );
    return (
      <div className="grid gap-4 rounded-2xl border border-line bg-soft/50 p-5 sm:grid-cols-2">
        <Field label="Название компании" placeholder="ООО «Пиксель»" value={form.company} onChange={set('company')} error={errors.company} />
        <Field label="ИНН" placeholder="10 или 12 цифр" inputMode="numeric" value={form.inn} onChange={set('inn')} error={errors.inn} />
        <p className="flex items-start gap-2 text-xs text-muted sm:col-span-2">
          <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          Счёт придёт на {form.email}. Лицензии активируются автоматически после поступления оплаты — обычно в течение 1 рабочего дня.
        </p>
      </div>
    );
  };

  const renderPayment = () => (
    <>
      <SectionCard n={1} title="Детали заказа">
        <div className="grid gap-3 sm:grid-cols-2">
          <DetailTile
            icon={<Package className="h-4 w-4" />}
            label="Товары"
            title={`${lines[0].product.name}${count > 1 ? ` + ещё ${count - 1}` : ''}`}
            sub={`${count} ${plural(count, ['товар', 'товара', 'товаров'])} · моментальная доставка`}
            onEdit={() => setStep(0)}
          />
          <DetailTile icon={<User className="h-4 w-4" />} label="Покупатель" title={`${form.firstName} ${form.lastName}`} sub={form.email} onEdit={() => setStep(1)} />
          <DetailTile icon={<Zap className="h-4 w-4" />} label="Доставка" title="Мгновенно на email" sub="Файлы и ключи — в личном кабинете" />
          <DetailTile
            icon={<Globe className="h-4 w-4" />}
            label="Активация"
            title={form.site || 'Домен не указан'}
            sub={form.site ? 'Ключ активируется автоматически' : 'Можно указать после покупки'}
            onEdit={() => setStep(1)}
          />
        </div>
      </SectionCard>

      <SectionCard
        n={2}
        title="Способ оплаты"
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-soft px-3 py-1 text-xs text-muted">
            <Lock className="h-3 w-3" />
            Безопасная оплата
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {METHODS.map((m) => {
            const sel = method === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setMethod(m.id);
                  setErrors({});
                }}
                className={cn(
                  'flex h-12 items-center gap-3 rounded-xl border px-3.5 text-left text-sm font-medium transition-all',
                  sel ? 'border-brand bg-brand-50/70 ring-1 ring-brand' : 'border-line hover:border-ink/20',
                )}
              >
                <RadioDot checked={sel} />
                <span className="flex-1 truncate">{m.label}</span>
                {m.mark}
              </button>
            );
          })}
        </div>
        <div key={method} className="fade-up mt-5">
          {renderMethodDetails()}
        </div>
      </SectionCard>
    </>
  );

  /* ---------------- Итог справа (тёмная карточка) ---------------- */
  const renderSummary = () => (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-card shadow-float ring-1 ring-black/5">
        <div className="dark-card px-6 pb-12 pt-6 text-white">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Ваш заказ</div>
          <div className="mt-2 text-2xl font-bold tracking-tight">
            {lines[0].product.name}
            {count > 1 && <span className="text-white/60"> + ещё {count - 1}</span>}
          </div>
          <div className="text-sm text-white/60">
            {count} {plural(count, ['товар', 'товара', 'товаров'])}
          </div>
          <div className="mt-5 space-y-2.5 text-sm text-white/90">
            <div className="flex items-center gap-2.5">
              <Zap className="h-4 w-4 text-brand" />
              Мгновенная доставка ключей
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="h-4 w-4 text-brand" />
              Автообновления из консоли WordPress
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-brand" />
              Возврат в течение 14 дней
            </div>
          </div>
        </div>
        <div className="relative -mt-6 rounded-t-card bg-white px-6 pb-6 pt-6">
          <div className="space-y-2.5 text-sm">
            {lines.map((l) => (
              <div key={l.productId} className="flex justify-between gap-3">
                <span className="truncate text-muted">
                  {l.product.name} ({formatOptionLabel(l.product, l.opt)})
                </span>
                <span className="font-semibold tabular-nums">{rub(l.old ?? l.price)}</span>
              </div>
            ))}
            {totals.saved > 0 && (
              <div className="flex justify-between gap-3">
                <span className="text-muted">Скидка по акции</span>
                <span className="font-semibold tabular-nums text-emerald-600">−{rub(totals.saved)}</span>
              </div>
            )}
            {coupon && (
              <div className="flex justify-between gap-3">
                <span className="text-muted">Промокод {coupon.code}</span>
                <span className="font-semibold tabular-nums text-emerald-600">−{rub(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <span className="text-muted">НДС</span>
              <span className="font-semibold">не облагается</span>
            </div>
          </div>
          <div className="my-5 border-t border-dashed border-line" />
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Итого</div>
              <div className="text-[11px] text-muted">Включая все налоги</div>
            </div>
            <div className="text-[32px] font-bold leading-none tabular-nums">{rub(totals.total)}</div>
          </div>
          <Button size="lg" className="mt-6 w-full" onClick={next} disabled={processing || (step === 2 && !agree)}>
            {processing ? (
              <>
                <Spinner />
                Обрабатываем платёж…
              </>
            ) : (
              <>
                {cta}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
          {step === 2 ? (
            <button type="button" onClick={() => setAgree((a) => !a)} className="mt-4 flex w-full items-start gap-2.5 text-left text-[12px] leading-relaxed text-muted">
              <Checkbox checked={agree} />
              <span>
                Я принимаю <span className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2">условия использования</span> и{' '}
                <span className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2">политику возврата</span>
              </span>
            </button>
          ) : (
            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
              Нажимая кнопку, вы соглашаетесь с <span className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2">Условиями использования</span> и{' '}
              <span className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2">Политикой возврата</span>.
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-muted">
        <span className="flex items-center gap-1">
          <Lock className="h-3 w-3" />
          SSL-шифрование
        </span>
        <span>·</span>
        <span>PCI DSS</span>
        <span>·</span>
        <span>3-D Secure</span>
      </div>
    </aside>
  );

  /* ---------------- Шаг 4: спасибо ---------------- */
  const renderDone = () => {
    if (!placed) return null;
    const { order, keys, email } = placed;
    const invoice = order.status === 'processing';
    return (
      <div className="mt-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-glow ring-8 ring-brand-50">
            <Check className="h-9 w-9" strokeWidth={3} />
          </div>
          <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">{invoice ? 'Счёт выставлен!' : 'Спасибо за покупку!'}</h1>
          <p className="mt-3 text-muted">
            Заказ <b className="text-ink">#{order.id}</b> {invoice ? 'ожидает оплаты по счёту.' : 'оплачен.'} Ключи и ссылки на скачивание отправлены на{' '}
            <b className="text-ink">{email}</b>.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <SectionCard n={1} title="Купленные продукты">
            <div className="space-y-3">
              {order.items.map((it) => {
                const p = productById(it.productId);
                return (
                  <div key={it.productId} className="rounded-2xl border border-line p-4">
                    <div className="flex items-center gap-4">
                      <ProductThumb product={p} className="h-14 w-14 rounded-2xl" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold">
                          {p.name} <span className="font-normal text-muted">v{p.version}</span>
                        </div>
                        <div className="text-xs text-muted">
                          {p.type === 'theme' ? (it.opt === 'multi' ? '5 сайтов' : '1 сайт') : 'Лицензия навсегда'}
                        </div>
                      </div>
                      <Button size="sm" className="hidden sm:inline-flex" disabled={invoice}>
                        <Download className="h-4 w-4" />
                        Скачать .zip
                      </Button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-soft px-3 py-2.5">
                      <KeyRound className="h-4 w-4 text-muted" />
                      <code className="min-w-0 flex-1 truncate font-mono text-sm font-semibold tracking-wider">{invoice ? 'Ключ появится после оплаты' : keys[it.productId]}</code>
                      {!invoice && <CopyButton text={keys[it.productId]} />}
                    </div>
                    <Button size="sm" className="mt-3 w-full sm:hidden" disabled={invoice}>
                      <Download className="h-4 w-4" />
                      Скачать .zip
                    </Button>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <aside className="space-y-4">
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Детали заказа</div>
              <dl className="mt-4 space-y-2.5 text-sm">
                {[
                  ['Номер', `#${order.id}`],
                  ['Дата', order.date],
                  ['Оплата', order.method],
                  ['Email', email],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-muted">{k}</dt>
                    <dd className="truncate text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="my-4 border-t border-dashed border-line" />
              <div className="flex items-end justify-between">
                <span className="text-sm text-muted">{invoice ? 'К оплате' : 'Оплачено'}</span>
                <span className="text-2xl font-bold tabular-nums">{rub(order.total)}</span>
              </div>
              <Button variant="dark" size="lg" className="mt-5 w-full" onClick={() => navigate('account', 'licenses')} arrow>
                В личный кабинет
              </Button>
              <Button variant="outline" className="mt-2 w-full">
                <FileText className="h-4 w-4" />
                {invoice ? 'Скачать счёт (PDF)' : 'Скачать чек (PDF)'}
              </Button>
            </div>
            <div className="rounded-card bg-brand-50 p-5 ring-1 ring-brand-100">
              <div className="flex items-center gap-2 font-semibold">
                <Gift className="h-4 w-4" />
                −15% на следующий заказ
              </div>
              <p className="mt-1 text-sm text-muted">
                Промокод <b className="text-ink">WP2026</b> уже ждёт вас в личном кабинете.
              </p>
            </div>
          </aside>
        </div>

        <SectionCard className="mt-6" title="Что дальше?">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Скачайте архив', 'ZIP-файл доступен выше и в разделе «Загрузки» личного кабинета.'],
              ['Установите на сайт', 'Консоль WordPress → Внешний вид → Темы (или Плагины) → Добавить → Загрузить.'],
              ['Активируйте ключ', 'Вставьте ключ в разделе «Wp Panda → Лицензия», чтобы включить автообновления.'],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">{i + 1}</span>
                <div>
                  <div className="font-semibold">{t}</div>
                  <p className="mt-1 text-sm text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="soft" onClick={() => navigate('kb-article', 'install-theme')}>
              Инструкция по установке
            </Button>
            <Button variant="ghost" onClick={() => navigate('shop')}>
              Продолжить покупки
            </Button>
          </div>
        </SectionCard>
      </div>
    );
  };

  const renderEmpty = () => (
    <div className="mx-auto mt-16 max-w-md text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-50/50">
        <ShoppingBag className="h-10 w-10" />
      </div>
      <h1 className="mt-7 text-3xl font-bold tracking-tight">В корзине пусто</h1>
      <p className="mt-2 text-muted">Добавьте тему или плагин, чтобы оформить заказ.</p>
      <Button size="lg" className="mt-7" onClick={() => navigate('shop')} arrow>
        Перейти в каталог
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-32 pt-4 sm:px-6 lg:pb-8">
      <Stepper
        steps={steps}
        current={step}
        onStep={
          step < 3
            ? (i) => {
                setStep(i);
                setErrors({});
              }
            : undefined
        }
      />

      {placed && step === 3 ? (
        renderDone()
      ) : count === 0 ? (
        renderEmpty()
      ) : (
        <>
          <div key={step} className="fade-up mt-10 text-center sm:mt-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{TITLES[step]}</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted">{SUBS[step]}</p>
          </div>
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
            <div key={`step-${step}`} className="fade-up min-w-0 space-y-5">
              {step === 0 ? renderCart() : step === 1 ? renderDetails() : renderPayment()}
            </div>
            {renderSummary()}
          </div>
          <div className="lg:hidden">
            <StickyBar
              icon={<ShoppingBag className="h-5 w-5" />}
              label="Итого к оплате"
              title={rub(totals.total)}
              action={
                <Button onClick={next} disabled={processing || (step === 2 && !agree)}>
                  {processing ? <Spinner /> : step === 2 ? 'Оплатить' : 'Далее'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
