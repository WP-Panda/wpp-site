export type ProductType = 'theme' | 'plugin';
export type ThemeLicenseId = 'single' | 'multi';
export type PluginIcon = 'rocket' | 'shield' | 'zap' | 'form' | 'cart' | 'languages' | 'calendar' | 'mail';

export type Product = {
  id: number;
  slug: string;
  type: ProductType;
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: number; // базовая цена (для темы — 1 сайт; для плагина — пожизненная)
  oldPrice?: number;
  rating: number;
  reviews: number;
  sales: number;
  version: string;
  updated: string;
  wp: string;
  php: string;
  compat: string[];
  badge?: string;
  color: string;
  color2: string;
  bg: string;
  features: string[];
  image?: string;
  image2?: string;
  heroTitle?: string;
  eyebrow?: string;
  innerTitle?: string;
  icon?: PluginIcon;
  chips?: [string, string];
};

const px = (id: number, w = 900, h = 560, ext = 'jpeg') =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
export const av = (id: number, ext = 'jpeg') => px(id, 160, 160, ext);
export const cover = (id: number) => px(id, 1600, 760);

const themeFeatures = [
  '40+ готовых демо-сайтов с импортом в один клик',
  'Визуальный конструктор шапки, подвала и страниц',
  'Полная совместимость с Gutenberg и Elementor',
  'Готовые шаблоны WooCommerce: каталог, товар, чекаут',
  'PageSpeed 95+ и валидная Schema-разметка',
  'Адаптивность, Retina и поддержка RTL',
];

export const products: Product[] = [
  {
    id: 1, slug: 'aurora', type: 'theme', name: 'Aurora',
    tagline: 'Многоцелевая тема для агентств, студий и портфолио',
    description: 'Aurora — флагманская тема Wp Panda для креативных агентств, студий и фрилансеров. 40+ готовых демо, визуальный конструктор страниц, продуманная типографика и молниеносная загрузка. Всё настраивается без единой строчки кода.',
    category: 'Агентство', price: 3990, oldPrice: 5490, rating: 4.9, reviews: 412, sales: 8240,
    version: '3.2.1', updated: '12 марта 2026', wp: '6.2+', php: '8.0+',
    compat: ['Gutenberg', 'Elementor', 'WooCommerce', 'WPML'], badge: 'Хит продаж',
    color: '#4F46E5', color2: '#8B5CF6', bg: '#EDEEFF', features: themeFeatures,
    image: px(12903905), image2: px(9458996), heroTitle: 'Создаём бренды, которые запоминают', eyebrow: 'Digital-агентство', innerTitle: 'Избранные проекты',
  },
  {
    id: 2, slug: 'vesta', type: 'theme', name: 'Vesta',
    tagline: 'Тема для магазинов одежды и аксессуаров на WooCommerce',
    description: 'Vesta — тема для fashion-магазинов на WooCommerce: быстрый каталог, фильтры без перезагрузки, lookbook-блоки и одностраничный чекаут. Оптимизирована для мобильных покупок и больших каталогов.',
    category: 'Интернет-магазин', price: 4490, oldPrice: 5990, rating: 4.8, reviews: 296, sales: 5120,
    version: '2.8.0', updated: '5 марта 2026', wp: '6.3+', php: '8.0+',
    compat: ['WooCommerce', 'Gutenberg', 'Elementor'], badge: 'Новинка',
    color: '#111827', color2: '#4B5563', bg: '#F3F1EC', features: themeFeatures,
    image: px(7206499), image2: px(37233404), heroTitle: 'Новая коллекция весна — лето 2026', eyebrow: 'Fashion store', innerTitle: 'Новинки сезона',
  },
  {
    id: 3, slug: 'brewly', type: 'theme', name: 'Brewly',
    tagline: 'Тема для кофеен, пекарен и доставки еды',
    description: 'Brewly создана для кофеен, пекарен и небольших ресторанов: меню с фото, онлайн-заказ и доставка, программа лояльности и карта заведений. Тёплый дизайн, который пахнет свежей выпечкой.',
    category: 'Кафе и рестораны', price: 2990, rating: 4.9, reviews: 184, sales: 3410,
    version: '1.9.4', updated: '28 февраля 2026', wp: '6.2+', php: '7.4+',
    compat: ['Gutenberg', 'WooCommerce'],
    color: '#B45309', color2: '#F59E0B', bg: '#FBF1E6', features: themeFeatures,
    image: px(4349954), image2: px(6612669), heroTitle: 'Свежая обжарка каждое утро', eyebrow: 'Кофейня и обжарка', innerTitle: 'Наше меню',
  },
  {
    id: 4, slug: 'nomad', type: 'theme', name: 'Nomad',
    tagline: 'Тема для travel-блогов, журналов и медиа',
    description: 'Nomad — лёгкая и быстрая тема для travel-блогеров и онлайн-журналов. Интерактивные карты маршрутов, галереи, партнёрские блоки для монетизации и идеальная читаемость длинных текстов.',
    category: 'Блог и медиа', price: 1990, oldPrice: 2990, rating: 4.7, reviews: 158, sales: 4270,
    version: '2.1.0', updated: '19 февраля 2026', wp: '6.1+', php: '7.4+',
    compat: ['Gutenberg', 'WPML'],
    color: '#0F766E', color2: '#14B8A6', bg: '#E7F5F2', features: themeFeatures,
    image: px(4791619), image2: px(15499497), heroTitle: 'Истории из 40 стран мира', eyebrow: 'Travel-журнал', innerTitle: 'Свежие истории',
  },
  {
    id: 5, slug: 'pulse', type: 'theme', name: 'Pulse',
    tagline: 'Тема для фитнес-клубов, тренеров и студий йоги',
    description: 'Pulse — энергичная тема для фитнес-клубов, персональных тренеров и студий йоги. Расписание занятий, абонементы с онлайн-оплатой, профили тренеров и калькуляторы для клиентов.',
    category: 'Спорт и фитнес', price: 2490, rating: 4.8, reviews: 121, sales: 1980,
    version: '1.6.2', updated: '2 марта 2026', wp: '6.2+', php: '8.0+',
    compat: ['Elementor', 'WooCommerce'],
    color: '#DC2626', color2: '#F97316', bg: '#FDECEC', features: themeFeatures,
    image: px(3888405), image2: px(3838705), heroTitle: 'Тренируйся с лучшими тренерами города', eyebrow: 'Фитнес-клуб', innerTitle: 'Программы тренировок',
  },
  {
    id: 6, slug: 'habitat', type: 'theme', name: 'Habitat',
    tagline: 'Тема для недвижимости и дизайнеров интерьеров',
    description: 'Habitat — элегантная тема для агентств недвижимости и дизайнеров интерьеров. Каталог объектов с фильтрами, карты, ипотечный калькулятор и портфолио проектов с эффектом «до/после».',
    category: 'Недвижимость', price: 3490, rating: 4.8, reviews: 97, sales: 1540,
    version: '2.4.3', updated: '10 марта 2026', wp: '6.2+', php: '8.0+',
    compat: ['Gutenberg', 'Elementor', 'WPML'],
    color: '#57534E', color2: '#A8A29E', bg: '#F2EFEA', features: themeFeatures,
    image: px(8146207), image2: px(6373484), heroTitle: 'Дома, в которые хочется возвращаться', eyebrow: 'Интерьер и недвижимость', innerTitle: 'Объекты в продаже',
  },
  {
    id: 7, slug: 'glow', type: 'theme', name: 'Glow',
    tagline: 'Тема для бьюти-брендов и магазинов косметики',
    description: 'Glow — нежная и конверсионная тема для бьюти-брендов. Витрина с быстрым просмотром, подбор средств по типу кожи, наборы и подписка на уходовые средства прямо в WooCommerce.',
    category: 'Интернет-магазин', price: 3290, oldPrice: 3990, rating: 4.9, reviews: 203, sales: 2860,
    version: '1.4.0', updated: '8 марта 2026', wp: '6.3+', php: '8.0+',
    compat: ['WooCommerce', 'Gutenberg'], badge: 'Выбор редакции',
    color: '#DB2777', color2: '#F472B6', bg: '#FCEEF4', features: themeFeatures,
    image: px(5632324), image2: px(3552894), heroTitle: 'Натуральный уход для вашей кожи', eyebrow: 'Beauty-бренд', innerTitle: 'Бестселлеры',
  },
  {
    id: 8, slug: 'savora', type: 'theme', name: 'Savora',
    tagline: 'Тема для ресторанов с меню и онлайн-бронированием',
    description: 'Savora — тема для ресторанов и гастробаров: интерактивное меню, онлайн-бронирование столиков, события и дегустации. Выглядит дорого и загружается мгновенно.',
    category: 'Кафе и рестораны', price: 2790, rating: 4.7, reviews: 88, sales: 1260,
    version: '1.3.1', updated: '24 февраля 2026', wp: '6.2+', php: '7.4+',
    compat: ['Gutenberg', 'Elementor'],
    color: '#15803D', color2: '#22C55E', bg: '#EAF6EE', features: themeFeatures,
    image: px(1327393), image2: px(24289165), heroTitle: 'Авторская кухня и бронирование столиков', eyebrow: 'Ресторан', innerTitle: 'Сезонное меню',
  },
  {
    id: 9, slug: 'seo-rocket', type: 'plugin', name: 'SEO Rocket',
    tagline: 'SEO-оптимизация, Schema-разметка и карта сайта',
    description: 'SEO Rocket закрывает все задачи технического SEO: мета-теги, Schema-разметка, карта сайта, редиректы и анализ контента прямо в редакторе. Работает с Яндексом и Google из коробки. Пожизненная лицензия со всеми обновлениями.',
    category: 'SEO', price: 2490, oldPrice: 3290, rating: 4.9, reviews: 1204, sales: 18450,
    version: '5.4.2', updated: '14 марта 2026', wp: '6.0+', php: '7.4+',
    compat: ['Gutenberg', 'WooCommerce', 'Elementor'], badge: 'Хит продаж',
    color: '#F59E0B', color2: '#F97316', bg: '#FFF6E0', icon: 'rocket', chips: ['SEO-оценка 98/100', 'Schema.org'],
    features: ['Мета-теги и Open Graph для всех типов записей', 'Schema.org: товары, статьи, FAQ, организации', 'XML-карта сайта и управление robots.txt', 'Анализ контента и SEO-оценка в редакторе', 'Редиректы 301 и мониторинг ошибок 404', 'Интеграция с Яндекс Вебмастером и Search Console'],
  },
  {
    id: 10, slug: 'shieldy', type: 'plugin', name: 'Shieldy',
    tagline: 'Файрвол, защита от ботов и двухфакторная авторизация',
    description: 'Shieldy защищает сайт на WordPress от взлома, спама и ботов. Файрвол, двухфакторная авторизация, сканер вредоносного кода и журнал активности — в одной панели. Пожизненная лицензия навсегда.',
    category: 'Безопасность', price: 1990, rating: 4.8, reviews: 642, sales: 9870,
    version: '3.1.0', updated: '11 марта 2026', wp: '6.0+', php: '7.4+',
    compat: ['Gutenberg', 'WooCommerce'],
    color: '#10B981', color2: '#059669', bg: '#E6F7F0', icon: 'shield', chips: ['1 248 атак отражено', '2FA включена'],
    features: ['Файрвол уровня приложения (WAF)', 'Защита от брутфорса и ботов', 'Двухфакторная авторизация', 'Сканер вредоносного кода', 'Журнал активности пользователей', 'Скрытие страницы входа'],
  },
  {
    id: 11, slug: 'turbocache', type: 'plugin', name: 'TurboCache',
    tagline: 'Кэширование, WebP, CDN и отложенная загрузка',
    description: 'TurboCache ускоряет WordPress до 99 баллов PageSpeed: страничный кэш, WebP и AVIF, отложенная загрузка, минификация и CDN. Настройка в один клик, без конфликтов с WooCommerce. Пожизненная лицензия навсегда.',
    category: 'Скорость', price: 1790, rating: 4.9, reviews: 876, sales: 12330,
    version: '4.0.3', updated: '9 марта 2026', wp: '6.0+', php: '7.4+',
    compat: ['Gutenberg', 'Elementor', 'WooCommerce'], badge: 'Выбор редакции',
    color: '#6366F1', color2: '#8B5CF6', bg: '#EEEEFF', icon: 'zap', chips: ['PageSpeed 99', 'LCP 0,8 с'],
    features: ['Страничный кэш и кэш объектов', 'Конвертация изображений в WebP и AVIF', 'Отложенная загрузка изображений и iframe', 'Минификация и объединение CSS/JS', 'Интеграция с CDN', 'Предзагрузка кэша по карте сайта'],
  },
  {
    id: 12, slug: 'wooboost', type: 'plugin', name: 'WooBoost',
    tagline: 'Допродажи, бандлы и быстрый чекаут для WooCommerce',
    description: 'WooBoost увеличивает средний чек магазина на WooCommerce: умные допродажи, бандлы, боковая корзина, одностраничный чекаут и возврат брошенных корзин. Пожизненный доступ навсегда.',
    category: 'WooCommerce', price: 2990, oldPrice: 3990, rating: 4.8, reviews: 318, sales: 4120,
    version: '2.6.1', updated: '6 марта 2026', wp: '6.2+', php: '8.0+',
    compat: ['WooCommerce'], badge: 'Новинка',
    color: '#8B5CF6', color2: '#EC4899', bg: '#F4EEFF', icon: 'cart', chips: ['Конверсия +27%', 'Чекаут в 1 клик'],
    features: ['Допродажи и кросс-продажи в корзине и чекауте', 'Одностраничный чекаут и покупка в 1 клик', 'Боковая корзина и мини-корзина', 'Напоминания о брошенных корзинах', 'Бандлы и динамические скидки', 'A/B-тесты предложений'],
  },
  {
    id: 13, slug: 'formflow', type: 'plugin', name: 'FormFlow',
    tagline: 'Конструктор форм с условной логикой и интеграциями',
    description: 'FormFlow — конструктор форм любой сложности: от обратного звонка до многошаговых анкет с оплатой. Условная логика, интеграции с CRM и мессенджерами, защита от спама без капчи. Пожизненная лицензия навсегда.',
    category: 'Формы', price: 1490, rating: 4.7, reviews: 455, sales: 7640,
    version: '3.8.0', updated: '1 марта 2026', wp: '6.0+', php: '7.4+',
    compat: ['Gutenberg', 'Elementor'],
    color: '#EC4899', color2: '#F43F5E', bg: '#FDEEF3', icon: 'form', chips: ['3 482 заявки', 'Условная логика'],
    features: ['Drag & drop конструктор форм', 'Условная логика и многошаговые формы', 'Приём оплаты через ЮKassa и Stripe', 'Интеграции с amoCRM, Битрикс24, Telegram', 'Защита от спама без капчи', 'Экспорт заявок в CSV и Google Sheets'],
  },
  {
    id: 14, slug: 'polyglot', type: 'plugin', name: 'Polyglot',
    tagline: 'Мультиязычность и автоматический перевод сайта',
    description: 'Polyglot делает сайт мультиязычным за вечер: AI-перевод контента, перевод WooCommerce и URL, SEO-разметка hreflang и удобный редактор переводов. Пожизненная лицензия навсегда.',
    category: 'Мультиязычность', price: 2290, rating: 4.7, reviews: 267, sales: 3950,
    version: '2.2.5', updated: '27 февраля 2026', wp: '6.1+', php: '7.4+',
    compat: ['Gutenberg', 'WooCommerce', 'Elementor'],
    color: '#0EA5E9', color2: '#6366F1', bg: '#E8F5FD', icon: 'languages', chips: ['12 языков', 'AI-перевод'],
    features: ['Неограниченное число языков', 'Автоперевод на базе AI', 'Перевод WooCommerce и URL', 'Переключатель языков в меню и блоках', 'hreflang и SEO для каждого языка', 'Совместимость с кэширующими плагинами'],
  },
  {
    id: 15, slug: 'bookit', type: 'plugin', name: 'BookIt',
    tagline: 'Онлайн-запись и бронирование услуг',
    description: 'BookIt — онлайн-запись для салонов, клиник, школ и сервисов. Расписания специалистов, предоплата, напоминания по SMS и email, синхронизация с Google Calendar. Пожизненная лицензия навсегда.',
    category: 'Бронирование', price: 2690, rating: 4.8, reviews: 189, sales: 2310,
    version: '1.7.0', updated: '13 марта 2026', wp: '6.2+', php: '8.0+',
    compat: ['Gutenberg', 'Elementor', 'WooCommerce'],
    color: '#F97316', color2: '#FBBF24', bg: '#FFF1E6', icon: 'calendar', chips: ['920 записей', 'SMS-напоминания'],
    features: ['Онлайн-запись на услуги и к специалистам', 'Гибкие расписания и перерывы', 'Предоплата и оплата онлайн', 'SMS и email-напоминания клиентам', 'Синхронизация с Google Calendar', 'Личный кабинет клиента'],
  },
  {
    id: 16, slug: 'mailpilot', type: 'plugin', name: 'MailPilot',
    tagline: 'Email-рассылки, автоворонки и брошенные корзины',
    description: 'MailPilot — email-маркетинг внутри WordPress: визуальный редактор писем, автоворонки, сегментация и возврат брошенных корзин WooCommerce. Без внешних сервисов и лимитов на контакты. Пожизненная лицензия навсегда.',
    category: 'Маркетинг', price: 1890, rating: 4.6, reviews: 142, sales: 1870,
    version: '1.5.2', updated: '20 февраля 2026', wp: '6.1+', php: '7.4+',
    compat: ['WooCommerce', 'Gutenberg'],
    color: '#14B8A6', color2: '#0EA5E9', bg: '#E6F7F6', icon: 'mail', chips: ['Open rate 48%', 'Автоворонки'],
    features: ['Визуальный редактор писем', 'Автоворонки и триггерные письма', 'Брошенные корзины WooCommerce', 'Сегментация и A/B-тесты', 'Формы подписки и pop-up', 'Аналитика открытий и кликов'],
  },
];

export const productById = (id: number) => products.find((p) => p.id === id) ?? products[0];
export const productBySlug = (slug?: string) => products.find((p) => p.slug === slug) ?? products[0];

/* ---------------- Лицензии тем: только 1 сайт и 5 сайтов ---------------- */
export type ThemeLicense = {
  id: ThemeLicenseId;
  name: string;
  short: string;
  sites: string;
  desc: string;
  mult: number;
  popular?: boolean;
};

export const themeLicenses: ThemeLicense[] = [
  { id: 'single', name: '1 сайт', short: '1 сайт', sites: '1 сайт', desc: 'Для личного проекта или одного клиента', mult: 1 },
  { id: 'multi', name: '5 сайтов', short: '5 сайтов', sites: 'До 5 сайтов', desc: 'Для компаний и веб-студий', mult: 1.8, popular: true },
];

export const themeLicenseById = (id: ThemeLicenseId) => themeLicenses.find((l) => l.id === id) ?? themeLicenses[0];

/** Рассчитать цену товара (с учётом опции темы) */
export const priceFor = (p: Product, opt?: ThemeLicenseId) => {
  if (p.type === 'plugin') return p.price;
  const mult = themeLicenseById(opt ?? 'single').mult;
  return Math.round(p.price * mult);
};

export const oldPriceFor = (p: Product, opt?: ThemeLicenseId) => {
  if (!p.oldPrice) return undefined;
  if (p.type === 'plugin') return p.oldPrice;
  const mult = themeLicenseById(opt ?? 'single').mult;
  return Math.round(p.oldPrice * mult);
};

export const formatOptionLabel = (p: Product, opt?: ThemeLicenseId) => {
  if (p.type === 'plugin') return 'Навсегда';
  return opt === 'multi' ? '5 сайтов' : '1 сайт';
};

export type Coupon = { code: string; percent: number; label: string };
export const coupons: Record<string, Coupon> = {
  WELCOME30: { code: 'WELCOME30', percent: 30, label: 'Скидка 30% на первый заказ' },
  WP2026: { code: 'WP2026', percent: 15, label: 'Скидка 15% для постоянных клиентов' },
};

/* ---------------- История версий ---------------- */
export type ChangeTag = 'new' | 'improved' | 'fixed';
const changePool: { tag: ChangeTag; text: string }[] = [
  { tag: 'new', text: 'Совместимость с WordPress 6.8 и WooCommerce 9.7' },
  { tag: 'improved', text: 'Ускорена загрузка стилей и скриптов на 18%' },
  { tag: 'fixed', text: 'Исправлено отображение меню в iOS Safari' },
  { tag: 'new', text: 'Новые блоки Gutenberg: «Тарифы» и «Отзывы»' },
  { tag: 'improved', text: 'Переработан мастер импорта демо-контента' },
  { tag: 'fixed', text: 'Исправлено предупреждение PHP 8.3 в настройках' },
  { tag: 'new', text: 'Тёмный режим для панели управления' },
  { tag: 'fixed', text: 'Мелкие исправления перевода и RTL' },
];
const changeDates = ['18 февраля 2026', '21 января 2026', '10 декабря 2025', '14 ноября 2025'];

export function changelogFor(p: Product) {
  let [a, b, c] = p.version.split('.').map(Number);
  const out: { version: string; date: string; changes: { tag: ChangeTag; text: string }[] }[] = [];
  for (let i = 0; i < 5; i++) {
    out.push({
      version: `${a}.${b}.${c}`,
      date: i === 0 ? p.updated : changeDates[i - 1],
      changes: [0, 1, 2].map((k) => changePool[(i * 3 + k + p.id) % changePool.length]),
    });
    if (c > 0) c -= 1;
    else if (b > 0) {
      b -= 1;
      c = 4;
    } else {
      a -= 1;
      b = 9;
      c = 2;
    }
  }
  return out;
}

/* ---------------- Люди ---------------- */
export type Author = { name: string; role: string; avatar: string };
export const authors: Record<string, Author> = {
  anna: { name: 'Анна Ковалёва', role: 'Редактор блога', avatar: av(6497112) },
  ivan: { name: 'Иван Сергеев', role: 'WordPress-разработчик', avatar: av(35681211) },
  maria: { name: 'Мария Орлова', role: 'UX-дизайнер', avatar: av(7717254) },
  dmitry: { name: 'Дмитрий Белов', role: 'Специалист по безопасности', avatar: av(5308640) },
};
export const testimonials = [
  { name: 'Екатерина Лебедева', role: 'Владелица магазина «Лён & Хлопок»', avatar: av(6497114), product: 'Vesta + WooBoost', text: 'Перенесли магазин на Vesta за выходные. Скорость выросла вдвое, а плагин WooBoost окупился в первый же день. Поддержка отвечает быстрее, чем я успеваю сварить кофе.' },
  { name: 'Артём Николаев', role: 'Основатель студии «Пиксель»', avatar: av(14950779), product: 'Aurora · 5 сайтов', text: 'Берём лицензии на 5 сайтов для клиентских проектов, а плагины навсегда — идеальная модель. Чистый код, понятная документация и честные обновления.' },
  { name: 'Тимур Алиев', role: 'Фотограф, портфолио на Habitat', avatar: av(37273005, 'png'), product: 'Habitat + TurboCache', text: 'Сайт-портфолио с сотнями фото грузится меньше чем за секунду. Плагин один раз купил — и навсегда. Справился без разработчика.' },
];

export const reviews = [
  { name: 'Екатерина Л.', avatar: av(6497114), rating: 5, date: '10 марта 2026', license: '5 сайтов', text: 'Установила за вечер, импорт демо прошёл без единой ошибки. Скорость отличная, поддержка ответила за 10 минут и помогла с настройкой шапки.' },
  { name: 'Артём Н.', avatar: av(14950779), rating: 5, date: '2 марта 2026', license: 'Навсегда', text: 'Используем на клиентских проектах. Код чистый, хуки задокументированы — дорабатывать одно удовольствие. Обновления выходят регулярно.' },
  { name: 'Тимур А.', avatar: av(37273005, 'png'), rating: 4, date: '21 февраля 2026', license: '1 сайт', text: 'Отличный продукт. Не хватало пары настроек типографики, но в последнем обновлении их добавили. Рекомендую.' },
];

export const solutions = [
  { title: 'Интернет-магазин', subtitle: '124 темы и плагина', slug: 'vesta' },
  { title: 'Агентства и студии', subtitle: '86 готовых решений', slug: 'aurora' },
  { title: 'Блоги и медиа', subtitle: '64 решения', slug: 'nomad' },
  { title: 'Рестораны и кафе', subtitle: '41 решение', slug: 'brewly' },
];

/* ---------------- Блог ---------------- */
export type Post = { slug: string; title: string; excerpt: string; category: string; date: string; readTime: string; image: string; author: Author; product: string; views: string };
export const posts: Post[] = [
  { slug: 'tema-dlya-magazina', title: 'Как выбрать тему WordPress для интернет-магазина в 2026 году', excerpt: 'Разбираем 9 критериев: скорость, совместимость с WooCommerce, мобильная версия, SEO и поддержка — и показываем, на что смотреть в демо.', category: 'Гайды', date: '14 марта 2026', readTime: '8 мин', image: px(34804003), author: authors.anna, product: 'vesta', views: '12,4K' },
  { slug: 'gutenberg-vs-elementor', title: 'Gutenberg или Elementor: что выбрать для нового проекта', excerpt: 'Сравнили скорость, удобство, стоимость владения и экосистему двух главных конструкторов WordPress на реальных проектах.', category: 'Обзоры', date: '9 марта 2026', readTime: '12 мин', image: px(693859), author: authors.ivan, product: 'aurora', views: '9,8K' },
  { slug: 'pagespeed-100', title: 'Разгоняем WordPress до 100 баллов PageSpeed: чек-лист', excerpt: 'Кэш, изображения, шрифты, скрипты и хостинг — пошаговый план, который мы используем на всех клиентских сайтах.', category: 'Гайды', date: '3 марта 2026', readTime: '15 мин', image: px(34803986), author: authors.ivan, product: 'turbocache', views: '21,1K' },
  { slug: 'wordpress-6-8', title: 'WordPress 6.8: разбираем ключевые изменения и новые блоки', excerpt: 'Что изменилось в редакторе сайта, какие API появились для разработчиков и стоит ли обновляться прямо сейчас.', category: 'Новости', date: '26 февраля 2026', readTime: '6 мин', image: px(34804001), author: authors.anna, product: 'aurora', views: '7,2K' },
  { slug: 'plaginy-woocommerce', title: '10 плагинов, без которых не обходится магазин на WooCommerce', excerpt: 'Оплата, доставка, допродажи, SEO и защита — собрали проверенный набор для магазина, который продаёт.', category: 'Подборки', date: '18 февраля 2026', readTime: '9 мин', image: px(574070), author: authors.maria, product: 'wooboost', views: '15,6K' },
  { slug: 'zashchita-wordpress', title: 'Как защитить сайт на WordPress от взлома: 12 правил', excerpt: 'От обновлений и паролей до файрвола и резервных копий — базовая гигиена, которая спасает 99% сайтов.', category: 'Безопасность', date: '11 февраля 2026', readTime: '10 мин', image: px(574069), author: authors.dmitry, product: 'shieldy', views: '11,3K' },
  { slug: 'dochernyaya-tema', title: 'Дочерняя тема WordPress: зачем она нужна и как её создать', excerpt: 'Пошагово создаём дочернюю тему, переопределяем шаблоны и подключаем стили так, чтобы обновления ничего не сломали.', category: 'Разработка', date: '4 февраля 2026', readTime: '7 мин', image: px(7988114), author: authors.ivan, product: 'aurora', views: '6,9K' },
  { slug: 'checkout-optimizaciya', title: 'Оформление заказа в WooCommerce: 7 приёмов роста конверсии', excerpt: 'Убираем лишние поля, добавляем экспресс-оплату и допродажи — разбираем чекаут, который не отпугивает покупателей.', category: 'Гайды', date: '28 января 2026', readTime: '11 мин', image: px(7206499), author: authors.maria, product: 'wooboost', views: '8,4K' },
  { slug: 'backup-wordpress', title: 'Резервные копии WordPress: стратегия, которая спасает сайт', excerpt: 'Как часто делать бэкапы, где их хранить и как восстановиться за 15 минут после сбоя или неудачного обновления.', category: 'Безопасность', date: '21 января 2026', readTime: '9 мин', image: px(12903905), author: authors.dmitry, product: 'shieldy', views: '10,1K' },
  { slug: 'multiyazychnost-saita', title: 'Мультиязычный сайт на WordPress: WPML, Polylang и AI-перевод', excerpt: 'Сравниваем подходы к переводу каталога и блога: структура URL, SEO, производительность и стоимость владения.', category: 'Обзоры', date: '14 января 2026', readTime: '13 мин', image: px(4791619), author: authors.anna, product: 'vesta', views: '5,7K' },
  { slug: 'hosting-dlya-wordpress', title: 'Как выбрать хостинг для WordPress в 2026 году', excerpt: 'PHP 8, NVMe, HTTP/3 и грамотный кэш: на что смотреть в тарифах и когда пора переезжать на VPS.', category: 'Гайды', date: '7 января 2026', readTime: '10 мин', image: px(8146207), author: authors.ivan, product: 'turbocache', views: '13,2K' },
  { slug: 'email-vozvrat-klientov', title: 'Email для WooCommerce: брошенные корзины и повторные продажи', excerpt: 'Настраиваем триггерные письма, которые возвращают клиентов: шаблоны, тайминги и метрики для оценки результата.', category: 'Подборки', date: '28 декабря 2025', readTime: '8 мин', image: px(5632324), author: authors.maria, product: 'wooboost', views: '7,9K' },
];

/* ---------------- База знаний ---------------- */
export type KbCategory = { id: string; title: string; icon: string; count: number; desc: string };
export const kbCategories: KbCategory[] = [
  { id: 'start', title: 'Начало работы', icon: 'rocket', count: 18, desc: 'Установка, демо-контент, требования' },
  { id: 'license', title: 'Активация и ключи', icon: 'key', count: 12, desc: 'Ключи, домены, 1 или 5 сайтов' },
  { id: 'updates', title: 'Обновления и ошибки', icon: 'refresh', count: 9, desc: 'Автообновления, откат, решение проблем' },
  { id: 'themes', title: 'Настройка тем', icon: 'palette', count: 34, desc: 'Шапка, шрифты, дочерние темы' },
  { id: 'plugins', title: 'Плагины навсегда', icon: 'plug', count: 27, desc: 'SEO, кэш, формы, интеграции' },
  { id: 'woo', title: 'WooCommerce', icon: 'bag', count: 21, desc: 'Оплата, доставка, карточки товаров' },
  { id: 'billing', title: 'Оплата и возвраты', icon: 'card', count: 8, desc: 'Способы оплаты, документы, возврат' },
  { id: 'dev', title: 'Разработчикам', icon: 'code', count: 24, desc: 'Хуки, REST API, кастомные блоки' },
];

export type KbArticleT = { id: string; title: string; category: string; views: number; updated: string; read: string };
export const kbArticles: KbArticleT[] = [
  { id: 'install-theme', title: 'Установка темы через консоль WordPress', category: 'start', views: 48210, updated: '2 дня назад', read: '4 мин' },
  { id: 'demo-import', title: 'Импорт демо-контента в один клик', category: 'start', views: 39870, updated: 'неделю назад', read: '5 мин' },
  { id: 'requirements', title: 'Требования к хостингу и серверу', category: 'start', views: 14320, updated: 'месяц назад', read: '3 мин' },
  { id: 'license-key', title: 'Где найти и как активировать лицензионный ключ', category: 'license', views: 35120, updated: '3 дня назад', read: '3 мин' },
  { id: 'move-license', title: 'Как перенести лицензию на другой домен', category: 'license', views: 21480, updated: '2 недели назад', read: '2 мин' },
  { id: 'license-types', title: 'Лицензии тем: 1 сайт или 5 сайтов', category: 'license', views: 11230, updated: 'месяц назад', read: '4 мин' },
  { id: 'auto-updates', title: 'Как включить автоматические обновления', category: 'updates', views: 19650, updated: '5 дней назад', read: '3 мин' },
  { id: 'white-screen', title: 'Белый экран после обновления: что делать', category: 'updates', views: 12940, updated: 'неделю назад', read: '6 мин' },
  { id: 'rollback', title: 'Откат к предыдущей версии', category: 'updates', views: 8740, updated: 'месяц назад', read: '3 мин' },
  { id: 'header-builder', title: 'Настройка шапки и меню', category: 'themes', views: 16890, updated: '4 дня назад', read: '7 мин' },
  { id: 'child-theme', title: 'Создание дочерней темы', category: 'themes', views: 15230, updated: '2 недели назад', read: '6 мин' },
  { id: 'fonts-colors', title: 'Шрифты и цветовые схемы', category: 'themes', views: 9340, updated: 'месяц назад', read: '4 мин' },
  { id: 'seo-setup', title: 'Первичная настройка SEO Rocket', category: 'plugins', views: 13560, updated: 'неделю назад', read: '8 мин' },
  { id: 'cache-rules', title: 'Правила кэширования TurboCache', category: 'plugins', views: 9980, updated: '2 недели назад', read: '5 мин' },
  { id: 'forms-crm', title: 'Интеграция FormFlow с amoCRM', category: 'plugins', views: 7410, updated: 'месяц назад', read: '4 мин' },
  { id: 'woo-payments', title: 'Настройка оплаты и доставки в WooCommerce', category: 'woo', views: 12780, updated: '6 дней назад', read: '9 мин' },
  { id: 'checkout-speed', title: 'Ускорение чекаута WooCommerce', category: 'woo', views: 6620, updated: 'месяц назад', read: '5 мин' },
  { id: 'refund', title: 'Условия возврата средств', category: 'billing', views: 9870, updated: '2 недели назад', read: '2 мин' },
  { id: 'invoices', title: 'Счёт и закрывающие документы для юрлиц', category: 'billing', views: 6930, updated: 'месяц назад', read: '3 мин' },
  { id: 'hooks', title: 'Хуки и фильтры темы Aurora', category: 'dev', views: 7730, updated: 'неделю назад', read: '10 мин' },
  { id: 'rest-api', title: 'REST API лицензий', category: 'dev', views: 3120, updated: 'месяц назад', read: '8 мин' },
];

export type FaqCategory = 'Покупка' | 'Темы и плагины' | 'Установка' | 'Лицензии' | 'Оплата и возвраты';
export type FaqItem = { q: string; a: string; category: FaqCategory };
export const faq: FaqItem[] = [
  { category: 'Лицензии', q: 'Как работают лицензии на плагины?', a: 'Все плагины продаются с бессрочной лицензией — покупаете один раз и пользуетесь навсегда. Все будущие обновления плагина также бесплатны.' },
  { category: 'Лицензии', q: 'Какие лицензии у тем WordPress?', a: 'У каждой темы два варианта: «1 сайт» для одного проекта и «5 сайтов» для одновременной установки на пять доменов.' },
  { category: 'Установка', q: 'Как активировать лицензионный ключ?', a: 'Установите тему или плагин, откройте «Wp Panda → Лицензия» в консоли WordPress и вставьте ключ из личного кабинета. Активация займёт несколько секунд и включит обновления.' },
  { category: 'Установка', q: 'Как скачать купленную тему или плагин?', a: 'Откройте личный кабинет и перейдите в «Загрузки». Архив ZIP и лицензионный ключ доступны сразу после оплаты.' },
  { category: 'Темы и плагины', q: 'Совместимы ли продукты с Elementor и WooCommerce?', a: 'Совместимость указана на странице каждого товара. Темы и плагины тестируются с актуальными версиями WordPress, Elementor и WooCommerce, если эти интеграции перечислены в характеристиках.' },
  { category: 'Темы и плагины', q: 'Получаю ли я обновления после покупки?', a: 'Да. Обновления включены: для плагинов — навсегда, для тем — в рамках выбранной лицензии. Новые версии можно установить из консоли WordPress или скачать в личном кабинете.' },
  { category: 'Покупка', q: 'Как быстро я получу доступ к покупке?', a: 'После подтверждения оплаты файлы и ключ появляются в личном кабинете и отправляются на email. Обычно это занимает меньше минуты.' },
  { category: 'Оплата и возвраты', q: 'Какие способы оплаты доступны?', a: 'Принимаем банковские карты, СБП, SberPay, ЮMoney, криптовалюту и оплату по счёту для юридических лиц.' },
  { category: 'Оплата и возвраты', q: 'Можно ли вернуть деньги?', a: 'Да, в течение 14 дней после покупки, если продукт не работает и инженеры поддержки не смогли решить проблему. Возврат отправляется исходным способом оплаты.' },
  { category: 'Оплата и возвраты', q: 'Работаете ли вы с юридическими лицами?', a: 'Да. Выберите «Счёт для юрлиц» при оформлении заказа — выставим счёт и отправим закрывающие документы через ЭДО.' },
];

/* ---------------- Личный кабинет ---------------- */
export type OrderStatus = 'completed' | 'processing' | 'refunded' | 'cancelled';
export type OrderItem = { productId: number; opt?: ThemeLicenseId; price: number };
export type Order = { id: string; date: string; status: OrderStatus; items: OrderItem[]; total: number; method: string };

export const initialOrders: Order[] = [
  { id: 'PM-10418', date: '12 марта 2026', status: 'completed', items: [{ productId: 1, opt: 'multi', price: 7180 }, { productId: 9, price: 2490 }], total: 9670, method: 'Карта •••• 5220' },
  { id: 'PM-10352', date: '26 февраля 2026', status: 'processing', items: [{ productId: 12, price: 2990 }], total: 2990, method: 'Счёт для юрлиц' },
  { id: 'PM-10211', date: '3 февраля 2026', status: 'completed', items: [{ productId: 13, price: 1490 }], total: 1490, method: 'СБП' },
  { id: 'PM-10087', date: '15 января 2026', status: 'refunded', items: [{ productId: 16, price: 1890 }], total: 1890, method: 'Карта •••• 5220' },
  { id: 'PM-09431', date: '26 марта 2025', status: 'completed', items: [{ productId: 11, price: 1790 }], total: 1790, method: 'ЮMoney' },
  { id: 'PM-08820', date: '28 декабря 2024', status: 'completed', items: [{ productId: 10, price: 1990 }], total: 1990, method: 'Карта •••• 5220' },
];

export type AccountLicense = {
  key: string;
  productId: number;
  opt?: ThemeLicenseId;
  status: 'active' | 'expiring' | 'expired';
  sites: string[];
  limit: number | null; // null = плагин (навсегда / без лимита)
  order: string;
};

export const accountLicenses: AccountLicense[] = [
  { key: 'WPP-8K2D-QX7L-9F2K', productId: 1, opt: 'multi', status: 'active', sites: ['studio-pixel.ru', 'staging.studio-pixel.ru'], limit: 5, order: 'PM-10418' },
  { key: 'WPP-3JH8-ZP4M-71AC', productId: 9, status: 'active', sites: ['studio-pixel.ru', 'len-hlopok.ru', 'coffee-lab.ru'], limit: null, order: 'PM-10418' },
  { key: 'WPP-5TQW-8N2V-C4XE', productId: 11, status: 'active', sites: ['studio-pixel.ru', 'len-hlopok.ru'], limit: null, order: 'PM-09431' },
  { key: 'WPP-1XCV-4HJK-8PWS', productId: 13, status: 'active', sites: ['studio-pixel.ru'], limit: null, order: 'PM-10211' },
  { key: 'WPP-9RLA-6YBE-2MKD', productId: 2, opt: 'single', status: 'active', sites: ['len-hlopok.ru'], limit: 1, order: 'PM-08820' },
];

export type TicketMessage = { from: 'me' | 'support'; name: string; time: string; text: string };
export type Ticket = { id: string; subject: string; topic?: string; priority?: 'normal' | 'high' | 'critical'; productId: number; status: 'answered' | 'open' | 'closed'; updated: string; messages: TicketMessage[]; resolution?: string };
export const tickets: Ticket[] = [
  {
    id: 'T-48213', subject: 'Не импортируется демо «Agency Dark»', topic: 'Установка и настройка', priority: 'high', productId: 1, status: 'answered', updated: '2 часа назад',
    messages: [
      { from: 'me', name: 'Алексей', time: 'Сегодня, 10:14', text: 'Здравствуйте! При импорте демо «Agency Dark» процесс останавливается на 64%. Хостинг Timeweb, PHP 8.2, лимит памяти 256M.' },
      { from: 'support', name: 'WPP Team', time: 'Сегодня, 10:27', text: 'Алексей, добрый день! Похоже, импорт упирается в max_execution_time. Увеличьте его до 300 секунд в панели хостинга и запустите импорт повторно — уже загруженные файлы пропустятся автоматически.' },
    ],
  },
  { id: 'T-47950', subject: 'Как перенести тему на новый домен?', topic: 'Лицензия и активация', priority: 'normal', productId: 1, status: 'closed', updated: '5 марта 2026', messages: [
      { from: 'me', name: 'Алексей', time: '5 марта, 12:02', text: 'Нужно перенести лицензию Aurora со старого домена на len-hlopok.ru. Как это сделать?' },
      { from: 'support', name: 'WPP Team', time: '5 марта, 12:20', text: 'Готово! Мы отвязали ключ от старого домена. Активируйте его на len-hlopok.ru в разделе «Wp Panda → Лицензия».' },
    ], resolution: 'Лицензия отвязана от старого домена и активирована на len-hlopok.ru.' },
  { id: 'T-47612', subject: 'Конфликт TurboCache с плагином оплаты', topic: 'Ошибка или баг', priority: 'critical', productId: 11, status: 'closed', updated: '18 февраля 2026', messages: [
      { from: 'me', name: 'Алексей', time: '18 фев, 09:41', text: 'После включения TurboCache перестала открываться страница оплаты WooCommerce.' },
      { from: 'support', name: 'WPP Team', time: '18 фев, 10:05', text: 'Добавили страницу оплаты в исключения кэша. Обновите TurboCache до 4.0.2 — конфликт устранён.' },
    ], resolution: 'Страница оплаты добавлена в исключения кэша, конфликт устранён в версии 4.0.2.' },
];

export type SavedCard = { id: string; brand: string; last4: string; exp: string; isDefault: boolean; ok: boolean };
export const savedCards: SavedCard[] = [
  { id: 'c1', brand: 'VISA', last4: '5220', exp: '09/28', isDefault: true, ok: true },
  { id: 'c2', brand: 'Mastercard', last4: '3236', exp: '01/26', isDefault: false, ok: false },
  { id: 'c3', brand: 'МИР', last4: '8841', exp: '11/27', isDefault: false, ok: true },
];
