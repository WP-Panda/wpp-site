import { useState, type ReactNode } from 'react';
import { ArrowRight, Bell, Heart, KeyRound, Search, ShoppingBag, Star } from 'lucide-react';
import { useApp } from '../context';
import { productById } from '../data';
import { ProductCard } from '../components/ProductCard';
import {
  Button,
  CardBrand,
  CheckBadge,
  Checkbox,
  CopyButton,
  Field,
  IconButton,
  IconCircle,
  PageTitle,
  Pill,
  RadioDot,
  SectionCard,
  Segmented,
  SelectField,
  StatusBadge,
  Stars,
  Stepper,
  TextArea,
  Toggle,
} from '../components/ui';

const COLORS = [
  { name: 'Brand', token: '--color-brand', hex: '#FFC21F', cls: 'bg-brand' },
  { name: 'Brand 600', token: '--color-brand-600', hex: '#F5B000', cls: 'bg-brand-600' },
  { name: 'Brand 50', token: '--color-brand-50', hex: '#FFF8E4', cls: 'bg-brand-50' },
  { name: 'Ink', token: '--color-ink', hex: '#1C1C21', cls: 'bg-ink' },
  { name: 'Muted', token: '--color-muted', hex: '#7B7B87', cls: 'bg-muted' },
  { name: 'Line', token: '--color-line', hex: '#EBEBF0', cls: 'bg-line' },
  { name: 'Soft', token: '--color-soft', hex: '#F6F6F8', cls: 'bg-soft' },
  { name: 'Footer', token: 'footer bg', hex: '#F4F4F6', cls: 'bg-[#F4F4F6]' },
];

const TEMPLATES: { screen: string; page: string; param?: string; route: string; tpl: string }[] = [
  { screen: 'Корзина (выезжает справа)', page: 'shop', route: 'кнопка корзины', tpl: 'cart/mini-cart.php + off-canvas справа' },
  { screen: 'Страница корзины', page: 'checkout', param: 'cart', route: '#/checkout/cart', tpl: 'cart/cart.php, cart/cart-totals.php, купоны' },
  { screen: 'Оформление заказа (4 шага)', page: 'checkout', route: '#/checkout', tpl: 'checkout/form-checkout.php, form-billing.php, review-order.php, payment.php' },
  { screen: 'Спасибо за заказ', page: 'checkout', route: 'после оплаты', tpl: 'checkout/thankyou.php, order/order-downloads.php' },
  { screen: 'Каталог', page: 'shop', route: '#/shop', tpl: 'archive-product.php, content-product.php' },
  { screen: 'Страница товара: структура CodeCanyon', page: 'product', param: 'aurora', route: '#/product/aurora', tpl: 'single-product.php; превью и описание слева, покупка и характеристики справа; темы = 1/5 сайтов, плагины = навсегда' },
  { screen: 'Кабинет: панель', page: 'account', route: '#/account', tpl: 'myaccount/navigation.php, myaccount/dashboard.php' },
  { screen: 'Кабинет: заказы', page: 'account', param: 'orders', route: '#/account/orders', tpl: 'myaccount/orders.php, myaccount/view-order.php' },
  { screen: 'Кабинет: загрузки', page: 'account', param: 'downloads', route: '#/account/downloads', tpl: 'myaccount/downloads.php' },
  { screen: 'Кабинет: ключи', page: 'account', param: 'licenses', route: '#/account/licenses', tpl: 'кастомный endpoint + License Manager for WooCommerce' },
  { screen: 'Кабинет: адрес / оплата / профиль', page: 'account', param: 'address', route: '#/account/address', tpl: 'form-edit-address.php, payment-methods.php, form-edit-account.php' },
  { screen: 'Вход и регистрация', page: 'account', route: 'Кабинет → «Выйти»', tpl: 'myaccount/form-login.php' },
  { screen: 'Блог', page: 'blog', route: '#/blog, #/post/…', tpl: 'home.php, archive.php, single.php' },
  { screen: 'База знаний', page: 'kb', route: '#/kb, #/kb-article/…', tpl: 'CPT docs (BetterDocs / EazyDocs) или свой шаблон' },
  { screen: 'Поддержка в кабинете', page: 'account', param: 'new-ticket', route: '#/account/new-ticket', tpl: 'кастомный endpoint WooCommerce My Account: создание и просмотр тикетов' },
  { screen: 'FAQ', page: 'faq', route: '#/faq', tpl: 'faq.php / отдельная страница с категоризацией и поиском' },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="mb-5 text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function UiKit() {
  const { navigate } = useApp();
  const [seg, setSeg] = useState<'all' | 'theme' | 'plugin'>('all');
  const [toggle, setToggle] = useState(true);
  const [check, setCheck] = useState(true);
  const [radio, setRadio] = useState('a');

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12">
      <PageTitle eyebrow="Для разработчика WordPress" title="UI-кит Wp Panda" subtitle="Дизайн-токены, компоненты и соответствие экранов шаблонам WooCommerce." />

      <Block title="Цвета">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {COLORS.map((c) => (
            <div key={c.name} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
              <div className={`h-20 ${c.cls}`} />
              <div className="p-4">
                <div className="font-semibold">{c.name}</div>
                <div className="font-mono text-xs text-muted">{c.hex}</div>
                <div className="font-mono text-[11px] text-muted">{c.token}</div>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Типографика — Montserrat">
        <div className="space-y-4 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
          <div className="text-[52px] font-bold leading-[1.08] tracking-tight">Заголовок H1 · 52/700</div>
          <div className="text-[40px] font-bold leading-[1.1] tracking-tight">Заголовок H2 · 40/700</div>
          <div className="text-xl font-semibold tracking-tight">Заголовок секции H3 · 20/600</div>
          <p className="text-base text-ink/85">Темы для WordPress (1 или 5 сайтов) и плагины с лицензией навсегда.</p>
          <p className="text-[13px] text-muted">Вспомогательный текст · 13/400 · цвет Muted</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Надпись / лейбл · 11/600 · uppercase</p>
        </div>
      </Block>

      <Block title="Кнопки">
        <div className="space-y-5 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Основная</Button>
            <Button variant="dark">Тёмная</Button>
            <Button variant="soft">Мягкая</Button>
            <Button variant="outline">Контурная</Button>
            <Button variant="ghost">Текстовая</Button>
            <Button disabled>Недоступна</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg" arrow>
              Large со стрелкой
            </Button>
            <Button size="lg" arrowCircle>
              Continue
            </Button>
            <Button size="lg" variant="dark" arrowCircle>
              Продолжить
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <IconButton aria-label="Поиск">
              <Search className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton dot aria-label="Уведомления">
              <Bell className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton badge={3} aria-label="Корзина">
              <ShoppingBag className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton aria-label="Избранное">
              <Heart className="h-[18px] w-[18px]" />
            </IconButton>
            <CopyButton text="WPP-8K2D-QX7L-9F2K" />
          </div>
        </div>
      </Block>

      <Block title="Формы и переключатели">
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard n={1} title="Поля ввода">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Пустое поле" placeholder="Введите имя" />
              <Field label="Заполненное" defaultValue="Алексей" />
              <Field label="С ошибкой" defaultValue="alex@" error="Проверьте email" />
              <Field label="Необязательное" optional placeholder="example.ru" hint="Подсказка под полем" />
              <SelectField label="Выпадающий список" defaultValue="Россия">
                <option>Россия</option>
                <option>Казахстан</option>
              </SelectField>
              <Field label="Пароль" type="password" defaultValue="password" />
            </div>
            <TextArea className="mt-4" label="Многострочное поле" optional placeholder="Комментарий к заказу" />
          </SectionCard>
          <SectionCard n={2} title="Выбор и навигация">
            <div className="space-y-5">
              <Segmented
                value={seg}
                onChange={setSeg}
                options={[
                  { value: 'all', label: 'Все' },
                  { value: 'theme', label: 'Темы' },
                  { value: 'plugin', label: 'Плагины' },
                ]}
              />
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <button type="button" onClick={() => setCheck((c) => !c)} className="flex items-center gap-2.5">
                  <Checkbox checked={check} />
                  Чекбокс
                </button>
                {['a', 'b'].map((r) => (
                  <button key={r} type="button" onClick={() => setRadio(r)} className="flex items-center gap-2.5">
                    <RadioDot checked={radio === r} />
                    Радио {r.toUpperCase()}
                  </button>
                ))}
                <span className="flex items-center gap-2.5">
                  <Toggle checked={toggle} onChange={setToggle} />
                  Переключатель
                </span>
              </div>
              <Stepper
                current={1}
                steps={[
                  { title: 'Корзина', subtitle: '2 товара' },
                  { title: 'Данные', subtitle: 'Заполните форму' },
                  { title: 'Оплата', subtitle: 'Не выбрано' },
                  { title: 'Готово', subtitle: 'Финальный шаг' },
                ]}
              />
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="flex h-12 items-center gap-3 rounded-xl border border-brand bg-brand-50/70 px-3.5 text-sm font-medium ring-1 ring-brand">
                  <RadioDot checked />
                  <span className="flex-1">Выбранный чип</span>
                  <CardBrand brand="VISA" />
                </div>
                <div className="flex h-12 items-center gap-3 rounded-xl border border-line px-3.5 text-sm font-medium">
                  <RadioDot checked={false} />
                  <span className="flex-1">Обычный чип</span>
                  <CardBrand brand="Mastercard" />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </Block>

      <Block title="Бейджи, статусы, иконки">
        <div className="flex flex-wrap items-center gap-3 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
          <Pill icon={<Star className="h-3 w-3" />} className="bg-soft shadow-none">
            Pill
          </Pill>
          <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">Хит продаж</span>
          <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold">−27%</span>
          {['completed', 'processing', 'refunded', 'active'].map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
          <CheckBadge />
          <IconCircle tone="brand">
            <KeyRound className="h-4 w-4" />
          </IconCircle>
          <IconCircle tone="yellow">
            <KeyRound className="h-4 w-4" />
          </IconCircle>
          <IconCircle tone="dark">
            <KeyRound className="h-4 w-4" />
          </IconCircle>
          <Stars value={4.8} />
        </div>
      </Block>

      <Block title="Карточки маркетплейса — структура ThemeForest">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard product={productById(1)} />
          <ProductCard product={productById(9)} />
          <ProductCard product={productById(2)} />
          <ProductCard product={productById(11)} />
        </div>
      </Block>

      <Block title="Соответствие экранов шаблонам WooCommerce">
        <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
          <div className="hidden grid-cols-[1.1fr_0.9fr_2fr] gap-4 border-b border-line bg-soft/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted md:grid">
            <span>Экран</span>
            <span>В макете</span>
            <span>Шаблон / плагин</span>
          </div>
          {TEMPLATES.map((t) => (
            <div key={t.screen} className="grid gap-1 border-b border-line px-5 py-4 last:border-0 md:grid-cols-[1.1fr_0.9fr_2fr] md:gap-4 md:px-6">
              <span className="font-semibold">{t.screen}</span>
              <button onClick={() => navigate(t.page, t.param)} className="flex items-center gap-1 text-left font-mono text-xs text-muted transition hover:text-ink">
                {t.route}
                <ArrowRight className="h-3 w-3" />
              </button>
              <span className="font-mono text-xs leading-relaxed text-ink/80">{t.tpl}</span>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}
