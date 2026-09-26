import { useState } from 'react';
import { ArrowLeft, ChevronRight, CircleAlert, CircleCheck, Download, Eye, EyeOff, FileText, Globe, Heart, Lock, Paperclip, Plus, RefreshCw, Send, ShieldCheck, Trash2, Unlink, User, Users, Zap } from 'lucide-react';
import { useApp } from '../context';
import { accountLicenses, formatOptionLabel, kbArticles, kbCategories, productById, products, savedCards, type SavedCard, type Ticket } from '../data';
import { ProductCard } from '../components/ProductCard';
import { ProductMedia, ProductThumb } from '../components/ProductMedia';
import { Button, CardBrand, CopyButton, EmptyBox, Field, IconCircle, Pill, RadioDot, SectionCard, SelectField, StatusBadge, Toggle } from '../components/ui';
import { cn } from '../utils/cn';

const PRIORITY_LABEL: Record<'normal' | 'high' | 'critical', string> = { normal: 'Обычный', high: 'Высокий', critical: 'Сайт не работает' };

const topicToKbCategory = (topic?: string) => {
  if (!topic) return 'start';
  if (topic.startsWith('Лиценз')) return 'license';
  if (topic.startsWith('Оплат')) return 'billing';
  if (topic.startsWith('Ошиб')) return 'updates';
  return 'start';
};

const sizeFor = (id: number, theme: boolean) => `${(theme ? 9 + (id % 5) * 1.4 : 2.1 + (id % 4) * 0.6).toFixed(1).replace('.', ',')} МБ`;

/* ---------------- Загрузки ---------------- */
export function Downloads() {
  const { navigate } = useApp();
  const items = accountLicenses;
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-card bg-brand-50 p-5 ring-1 ring-brand-100 sm:flex-row sm:items-center">
        <IconCircle tone="white" className="h-12 w-12">
          <RefreshCw className="h-5 w-5" />
        </IconCircle>
        <div className="flex-1">
          <div className="font-semibold">Обновляйте в один клик из консоли WordPress</div>
          <div className="text-sm text-muted">Плагины навсегда, темы с автообновлениями — новые версии доступны в любое время.</div>
        </div>
        <Button variant="dark" size="sm">
          <Download className="h-3.5 w-3.5" />
          WPP Updater
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((l) => {
          const p = productById(l.productId);
          return (
            <div key={l.key} className="flex flex-col gap-4 rounded-card border border-line bg-white p-4 shadow-card sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="w-24 flex-shrink-0 overflow-hidden rounded-xl sm:w-28">
                  <ProductMedia product={p} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-semibold tracking-tight">{p.name}</span>
                    <Pill className="bg-soft shadow-none">v{p.version}</Pill>
                    <span className="text-xs text-muted">
                      ({p.type === 'plugin' ? 'Плагин навсегда' : `Тема · ${formatOptionLabel(p, l.opt)}`})
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted">
                    Обновлено {p.updated} · {sizeFor(p.id, p.type === 'theme')} · WordPress {p.wp}
                  </div>
                  <button onClick={() => navigate('product', p.slug)} className="mt-1.5 text-xs font-semibold underline decoration-brand decoration-2 underline-offset-4">
                    Что нового в {p.version}
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('kb-article', 'install-theme')}>
                  Документация
                </Button>
                <Button size="sm">
                  <Download className="h-3.5 w-3.5" />
                  Скачать .zip
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Лицензии и ключи ---------------- */
export function Licenses() {
  const [reveal, setReveal] = useState<string | null>(null);
  const [sites, setSites] = useState<Record<string, string[]>>(() => Object.fromEntries(accountLicenses.map((l) => [l.key, l.sites])));

  return (
    <div className="space-y-5">
      <div className="rounded-card bg-brand-50 p-5 ring-1 ring-brand-100 flex items-center gap-3">
        <IconCircle tone="yellow">
          <Lock className="h-4 w-4" />
        </IconCircle>
        <div className="text-sm">
          <b className="text-ink">Условия лицензирования:</b> для плагинов лицензия <b>навсегда</b> (все будущие обновления включены). Для тем действует лицензия на <b>1 сайт</b> или <b>5 сайтов</b>.
        </div>
      </div>

      {accountLicenses.map((l) => {
        const p = productById(l.productId);
        const used = sites[l.key].length;
        const masked = `${l.key.slice(0, 5)}••••-••••-${l.key.slice(-4)}`;
        const isPlugin = p.type === 'plugin';
        return (
          <div key={l.key} className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
            <div className="flex flex-wrap items-center gap-4">
              <ProductThumb product={p} className="h-14 w-14 rounded-2xl" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                  <span className="rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {isPlugin ? 'Плагин навсегда' : `Тема: ${formatOptionLabel(p, l.opt)}`}
                  </span>
                  <StatusBadge status="active" />
                </div>
                <div className="mt-0.5 text-xs text-muted">
                  Заказ #{l.order} · {isPlugin ? 'бессрочный доступ ко всем обновлениям' : (l.opt === 'multi' ? 'до 5 сайтов одновременно' : '1 сайт')}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              <div className="rounded-2xl bg-soft p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Лицензионный ключ</div>
                <div className="mt-2 flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate font-mono text-[15px] font-semibold tracking-wider">{reveal === l.key ? l.key : masked}</code>
                  <button
                    onClick={() => setReveal((r) => (r === l.key ? null : l.key))}
                    aria-label="Показать ключ"
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-muted transition hover:text-ink"
                  >
                    {reveal === l.key ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <CopyButton text={l.key} />
                </div>
              </div>
              <div className="rounded-2xl bg-soft p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Привязка к сайтам</div>
                  <div className="text-xs font-semibold">
                    {used} {l.limit ? `из ${l.limit}` : '(без лимита)'}
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${l.limit ? Math.min(100, (used / l.limit) * 100) : 30}%` }} />
                </div>
                <div className="mt-2 text-xs text-muted">
                  {l.limit ? (l.limit - used > 0 ? `Свободно слотов: ${l.limit - used}` : 'Все слоты заняты') : 'Плагин навсегда'}
                </div>
              </div>
            </div>

            {used > 0 && (
              <div className="mt-3 divide-y divide-line rounded-2xl border border-line">
                {sites[l.key].map((s) => (
                  <div key={s} className="flex items-center gap-3 px-4 py-2.5">
                    <Globe className="h-4 w-4 flex-shrink-0 text-muted" />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{s}</span>
                    <span className="hidden text-xs text-emerald-600 sm:inline">Активен</span>
                    <button
                      onClick={() => setSites((prev) => ({ ...prev, [l.key]: prev[l.key].filter((x) => x !== s) }))}
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-muted transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Unlink className="h-3.5 w-3.5" />
                      Отвязать
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Список тикетов ---------------- */
export function Tickets() {
  const { navigate, supportTickets } = useApp();

  if (!supportTickets.length)
    return (
      <EmptyBox
        icon={<FileText className="h-6 w-6" />}
        title="Обращений пока нет"
        text="Создайте тикет — команда WPP Team поможет, а вся переписка сохранится здесь."
        action={
          <Button onClick={() => navigate('account', 'new-ticket')}>
            <Plus className="h-3.5 w-3.5" /> Новое обращение
          </Button>
        }
      />
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Поддержка — WPP Team</p>
        <Button size="sm" onClick={() => navigate('account', 'new-ticket')}>
          <Plus className="h-3.5 w-3.5" />
          Новый тикет
        </Button>
      </div>
      {supportTickets.map((t) => {
        const p = productById(t.productId);
        return (
          <button
            key={t.id}
            onClick={() => navigate('account', `ticket/${t.id}`)}
            className="group flex w-full items-center gap-4 rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:border-ink/20 hover:shadow-float"
          >
            <ProductThumb product={p} className="h-11 w-11 rounded-xl" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted">
                <span className="font-semibold text-ink">#{t.id}</span>· {p.name}
                {t.topic && <span className="hidden sm:inline">· {t.topic}</span>} · {t.updated}
              </div>
              <div className="truncate font-semibold">{t.subject}</div>
            </div>
            <StatusBadge status={t.status} className="hidden sm:inline-flex" />
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" />
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Страница отдельного тикета ---------------- */
export function TicketView({ ticket }: { ticket: Ticket }) {
  const { navigate, replyTicket } = useApp();
  const [reply, setReply] = useState('');
  const p = productById(ticket.productId);
  const closed = ticket.status === 'closed';

  const relatedCategory = topicToKbCategory(ticket.topic);
  const related = [
    ...kbArticles.filter((a) => a.category === relatedCategory),
    ...kbArticles.filter((a) => a.category !== relatedCategory),
  ].slice(0, 4);
  const categoryTitle = kbCategories.find((c) => c.id === relatedCategory)?.title;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('account', 'tickets')} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" />
        Все обращения
      </button>

      {/* Шапка тикета */}
      <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
              <span className="font-semibold text-ink">#{ticket.id}</span>
              <span>· обновлён {ticket.updated}</span>
            </div>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">{ticket.subject}</h2>
          </div>
          <StatusBadge status={ticket.status} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 font-medium">
            <ProductThumb product={p} className="h-4 w-4 rounded" />
            {p.name}
          </span>
          {ticket.topic && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 font-medium">
              <FileText className="h-3.5 w-3.5 text-muted" />
              {ticket.topic}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 font-medium">
            <Zap className="h-3.5 w-3.5 text-muted" />
            Приоритет: {PRIORITY_LABEL[ticket.priority ?? 'normal']}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 font-medium">
            <Users className="h-3.5 w-3.5 text-muted" />
            WPP Team
          </span>
        </div>

        {/* Похожие вопросы — под темой тикета */}
        <div className="mt-5 rounded-2xl bg-soft/60 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-ink" />
            Вам может помочь
          </div>
          {categoryTitle && <p className="mt-0.5 text-xs text-muted">Похожие вопросы из раздела «{categoryTitle}»</p>}
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {related.map((a) => (
              <button
                key={a.id}
                onClick={() => navigate('kb-article', a.id)}
                className="flex items-start gap-2 rounded-xl bg-white p-3 text-left text-sm text-ink/80 shadow-sm transition hover:text-ink"
              >
                <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" />
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2">{a.title}</span>
                  <span className="mt-0.5 block text-[11px] text-muted">{a.read} · {(a.views / 1000).toFixed(1).replace('.', ',')}K просмотров</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Переписка */}
      <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
        <h3 className="text-sm font-semibold">Переписка</h3>
        <div className="mt-4 space-y-4">
          {ticket.messages.length === 0 && <p className="text-sm text-muted">Сообщений пока нет.</p>}
          {ticket.messages.map((m, i) => (
            <div key={i} className={cn('flex gap-3', m.from === 'me' && 'flex-row-reverse')}>
              {m.from === 'me' ? (
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand">
                  <User className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-ink">
                  <Users className="h-4 w-4 text-brand" />
                </span>
              )}
              <div className={cn('max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed', m.from === 'me' ? 'rounded-tr-md bg-ink text-white' : 'rounded-tl-md bg-soft')}>
                <div className={cn('mb-1 text-[11px] font-semibold', m.from === 'me' ? 'text-white/55' : 'text-muted')}>
                  {m.name} · {m.time}
                </div>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {closed ? (
          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-soft p-4 text-sm text-muted">
            <CircleCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
            <span>Тикет закрыт.{ticket.resolution ? ` ${ticket.resolution}` : ''} Нужна помощь ещё раз? <button onClick={() => navigate('account', 'new-ticket')} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">Создайте новое обращение</button>.</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!reply.trim()) return;
              replyTicket(ticket.id, reply.trim());
              setReply('');
            }}
            className="mt-5 flex items-end gap-2 rounded-2xl border border-line bg-soft/60 p-2 transition focus-within:border-brand focus-within:bg-white"
          >
            <button type="button" aria-label="Прикрепить файл" className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-white hover:text-ink">
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={1} placeholder="Написать ответ…" className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-sm outline-none" />
            <Button type="submit" size="sm" className="h-10">
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Отправить</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------- Избранное ---------------- */
export function Wishlist() {
  const { wishlist, navigate } = useApp();
  const items = products.filter((p) => wishlist.includes(p.id));
  if (!items.length)
    return (
      <EmptyBox
        icon={<Heart className="h-6 w-6" />}
        title="В избранном пока пусто"
        text="Нажмите на сердечко на карточке товара, чтобы сохранить его здесь."
        action={
          <Button onClick={() => navigate('shop')} arrow>
            В каталог
          </Button>
        }
      />
    );
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function SavedNote({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="fade-in flex items-center gap-1.5 text-sm font-medium text-emerald-600">
      <CircleCheck className="h-4 w-4" />
      Изменения сохранены
    </span>
  );
}

/* ---------------- Платёжный адрес (edit-address) ---------------- */
export function Address() {
  const [saved, setSaved] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
      className="space-y-5"
    >
      <SectionCard n={1} title="Плательщик" right={<span className="text-xs text-muted">Используется в счетах и чеках</span>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя" defaultValue="Алексей" />
          <Field label="Фамилия" defaultValue="Морозов" />
          <Field label="Компания" optional defaultValue="ООО «Пиксель»" />
          <Field label="ИНН" optional defaultValue="7701234567" />
          <Field label="Телефон" defaultValue="+7 916 123-45-67" />
          <Field label="Email для чеков" type="email" defaultValue="alex@morozov.dev" />
        </div>
      </SectionCard>
      <SectionCard n={2} title="Адрес">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Страна" defaultValue="Россия">
            {['Россия', 'Беларусь', 'Казахстан', 'Армения', 'Узбекистан'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectField>
          <Field label="Область / регион" defaultValue="Москва" />
          <Field label="Город" defaultValue="Москва" />
          <Field label="Индекс" defaultValue="123112" />
          <Field className="sm:col-span-2" label="Улица, дом, офис" defaultValue="Пресненская наб., 12, офис 405" />
        </div>
      </SectionCard>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          Сохранить адрес
        </Button>
        <SavedNote show={saved} />
      </div>
    </form>
  );
}

/* ---------------- Способы оплаты (payment-methods) ---------------- */
export function PaymentMethods() {
  const [cards, setCards] = useState<SavedCard[]>(savedCards);
  const [adding, setAdding] = useState(false);
  return (
    <div className="space-y-5">
      <SectionCard
        title="Сохранённые карты"
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-soft px-3 py-1 text-xs text-muted">
            <Lock className="h-3 w-3" />
            Данные защищены
          </span>
        }
      >
        <div className="space-y-2.5">
          {cards.map((c) => (
            <div key={c.id} className={cn('flex flex-wrap items-center gap-4 rounded-2xl border p-4', !c.ok ? 'border-line bg-soft/70' : c.isDefault ? 'border-ink ring-1 ring-ink' : 'border-line')}>
              <RadioDot checked={c.isDefault && c.ok} disabled={!c.ok} />
              <div className="min-w-[180px] flex-1">
                <div className={cn('font-semibold tracking-wider', !c.ok && 'text-muted')}>•••• •••• •••• {c.last4}</div>
                {c.ok ? (
                  <div className="text-xs text-muted">
                    Действует до {c.exp}
                    {c.isDefault && ' · Основная'}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-rose-500">
                    <CircleAlert className="h-3.5 w-3.5" />
                    Срок действия истёк — добавьте другую карту
                  </div>
                )}
              </div>
              <CardBrand brand={c.brand} className={!c.ok ? 'opacity-40' : ''} />
              <div className="flex items-center gap-1">
                {c.ok && !c.isDefault && (
                  <Button size="sm" variant="ghost" onClick={() => setCards((cs) => cs.map((x) => ({ ...x, isDefault: x.id === c.id })))}>
                    Сделать основной
                  </Button>
                )}
                <button
                  onClick={() => setCards((cs) => cs.filter((x) => x.id !== c.id))}
                  aria-label="Удалить карту"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => setAdding((a) => !a)} className="flex w-full items-center gap-4 rounded-2xl border border-dashed border-line p-4 text-left transition hover:border-ink/30">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-line">
              <Plus className="h-3 w-3" />
            </span>
            <span className="flex-1 font-semibold">Добавить новую карту</span>
            <span className="hidden items-center gap-2.5 sm:flex">
              <CardBrand brand="Mastercard" />
              <CardBrand brand="VISA" />
              <CardBrand brand="МИР" />
            </span>
          </button>
          {adding && (
            <div className="fade-up grid gap-4 rounded-2xl border border-line bg-soft/50 p-4 sm:grid-cols-2">
              <Field className="sm:col-span-2" label="Номер карты" placeholder="0000 0000 0000 0000" inputMode="numeric" />
              <Field label="Срок действия" placeholder="ММ/ГГ" />
              <Field label="CVC / CVV" placeholder="•••" type="password" />
              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <Button
                  onClick={() => {
                    setCards((cs) => [...cs, { id: `n${cs.length + 1}`, brand: 'VISA', last4: '4242', exp: '12/29', isDefault: false, ok: true }]);
                    setAdding(false);
                  }}
                >
                  Сохранить карту
                </Button>
                <Button variant="ghost" onClick={() => setAdding(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </div>
      </SectionCard>
      <SectionCard title="Другие способы оплаты" right={<span className="text-xs text-muted">Доступны при оформлении заказа</span>}>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {['СБП', 'SberPay', 'ЮMoney', 'Криптовалюта', 'Счёт для юрлиц'].map((m) => (
            <div key={m} className="flex h-12 items-center gap-3 rounded-xl border border-line px-4 text-sm font-medium">
              <CircleCheck className="h-4 w-4 text-emerald-600" />
              {m}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function ToggleRow({ title, text, checked, onChange }: { title: string; text: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted">{text}</div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

/* ---------------- Данные аккаунта (edit-account) ---------------- */
export function AccountDetails() {
  const [saved, setSaved] = useState(false);
  const [n, setN] = useState({ twoFa: true, updates: true, news: false });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
      className="space-y-5"
    >
      <SectionCard n={1} title="Личные данные">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя" defaultValue="Алексей" />
          <Field label="Фамилия" defaultValue="Морозов" />
          <Field label="Отображаемое имя" defaultValue="Алексей М." hint="Так вас увидят в отзывах и комментариях" />
          <Field label="Email" type="email" defaultValue="alex@morozov.dev" />
        </div>
      </SectionCard>
      <SectionCard n={2} title="Смена пароля" right={<span className="text-xs text-muted">Оставьте пустым, чтобы не менять</span>}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Текущий пароль" type="password" placeholder="••••••••" />
          <Field label="Новый пароль" type="password" placeholder="Минимум 8 символов" />
          <Field label="Повторите пароль" type="password" placeholder="••••••••" />
        </div>
      </SectionCard>
      <SectionCard n={3} title="Безопасность и уведомления">
        <div className="divide-y divide-line">
          <ToggleRow title="Двухфакторная аутентификация" text="Код из приложения при каждом входе в кабинет" checked={n.twoFa} onChange={(v) => setN({ ...n, twoFa: v })} />
          <ToggleRow title="Выход новых версий" text="Письмо, когда выходит обновление купленных продуктов" checked={n.updates} onChange={(v) => setN({ ...n, updates: v })} />
          <ToggleRow title="Новости и скидки" text="Не чаще одного письма в неделю" checked={n.news} onChange={(v) => setN({ ...n, news: v })} />
        </div>
      </SectionCard>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          Сохранить изменения
        </Button>
        <SavedNote show={saved} />
      </div>
    </form>
  );
}
