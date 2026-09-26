// Генерирует wp-panda/inc/icons.php с инлайновыми SVG из lucide-react
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import * as lucide from 'lucide-react';
import fs from 'node:fs';

const names = {
  search: 'Search', bell: 'Bell', menu: 'Menu', x: 'X', cart: 'ShoppingBag', user: 'User',
  'arrow-right': 'ArrowRight', 'arrow-left': 'ArrowLeft', 'arrow-up-right': 'ArrowUpRight',
  check: 'Check', 'chevron-down': 'ChevronDown', 'chevron-right': 'ChevronRight',
  star: 'Star', heart: 'Heart', share: 'Share2', clock: 'Clock', eye: 'Eye',
  'file-text': 'FileText', 'book-open': 'BookOpen', newspaper: 'Newspaper',
  help: 'CircleHelp', house: 'House', grid: 'LayoutGrid', lock: 'Lock', headphones: 'Headphones',
  gauge: 'Gauge', refresh: 'RefreshCw', 'shield-check': 'ShieldCheck', 'monitor-play': 'MonitorPlay',
  images: 'Images', expand: 'Expand', download: 'Download', gift: 'Gift', ticket: 'Ticket',
  trash: 'Trash2', undo: 'Undo2', plus: 'Plus', zap: 'Zap', shield: 'Shield', rocket: 'Rocket',
  form: 'ClipboardList', 'cart-w': 'ShoppingCart', languages: 'Languages', mail: 'Mail',
  calendar: 'CalendarCheck', 'badge-check': 'BadgeCheck', 'life-buoy': 'LifeBuoy',
  'lock-keyhole': 'LockKeyhole', trending: 'TrendingUp', 'credit-card': 'CreditCard',
  'user-cog': 'UserCog', send: 'Send', 'alert-triangle': 'TriangleAlert', info: 'Info',
  'message-square': 'MessageSquare', package: 'Package', key: 'KeyRound', wallet: 'Wallet',
  settings: 'Settings', logout: 'LogOut', 'thumbs-up': 'ThumbsUp', 'thumbs-down': 'ThumbsDown',
  'circle-check': 'CircleCheck', external: 'ExternalLink', play: 'Play', sliders: 'SlidersHorizontal',
  'list-checks': 'ListChecks', 'type-icon': 'Type', sparkles: 'Sparkles', usb: 'Usb', database: 'Database',
};

const phpStr = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
let out = `<?php\n/**\n * Инлайновые SVG-иконки (lucide), сгенерировано scripts/extract-icons.mjs.\n * Использование: wpp_icon( 'search', 'h-4 w-4' );\n */\n\nreturn [\n`;
let ok = 0;
for (const [key, comp] of Object.entries(names)) {
  const Icon = lucide[comp];
  if (!Icon) { console.error('нет иконки:', comp); continue; }
  let svg = renderToStaticMarkup(createElement(Icon, { className: '__CLASS__' }));
  svg = svg.replace(' stroke-width="2"', '');
  out += `\t'${key}' => '${phpStr(svg)}',\n`;
  ok++;
}
out += `];\n`;
fs.writeFileSync('wp-panda/inc/icons.php', out);
console.log(`OK: ${ok} иконок`);
