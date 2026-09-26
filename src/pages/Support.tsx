import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, FileText, Paperclip, ShieldCheck, Users, X, Zap } from 'lucide-react';
import { useApp } from '../context';
import { kbArticles, productById } from '../data';
import { Button, Field, PageTitle, SectionCard, Segmented, SelectField, TextArea } from '../components/ui';
import { cn } from '../utils/cn';

const TOPICS = ['Установка и настройка', 'Ошибка или баг', 'Лицензия и активация', 'Оплата и возврат', 'Доработка под задачу', 'Предпродажный вопрос'];
const CUSTOM_TOPIC = '__custom__';
const PURCHASED = [1, 9, 11, 13];
type Priority = 'normal' | 'high' | 'critical';
const PRIORITY_LABEL: Record<Priority, string> = { normal: 'Обычный', high: 'Высокий', critical: 'Сайт не работает' };

export function SupportForm({ inAccount = false }: { inAccount?: boolean }) {
  const { navigate, createTicket } = useApp();
  const [product, setProduct] = useState(1);
  const [topicChoice, setTopicChoice] = useState(TOPICS[0]);
  const [customTopic, setCustomTopic] = useState('');
  const [priority, setPriority] = useState<Priority>('normal');
  const [form, setForm] = useState({ name: 'Алексей Морозов', email: 'alex@morozov.dev', site: '', wp: '6.8', subject: '', message: '' });
  const [files, setFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<string | null>(null);

  const topic = topicChoice === CUSTOM_TOPIC ? customTopic.trim() : topicChoice;
  const p = product ? productById(product) : null;
  const suggestions = kbArticles
    .filter((a) => (topic.startsWith('Лиценз') ? a.category === 'license' : topic.startsWith('Оплат') ? a.category === 'billing' : a.category === 'start' || a.category === 'updates'))
    .slice(0, 3);

  const submit = () => {
    const e: Record<string, string> = {};
    if (topicChoice === CUSTOM_TOPIC && !customTopic.trim()) e.topic = 'Введите свою тему обращения';
    if (!form.subject.trim()) e.subject = 'Коротко опишите проблему';
    if (form.message.trim().length < 10) e.message = 'Расскажите подробнее — минимум 10 символов';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Проверьте email';
    setErrors(e);
    if (Object.keys(e).length) return;
    const ticket = createTicket({
      subject: form.subject.trim(),
      productId: product || PURCHASED[0],
      name: form.name.trim() || 'Покупатель',
      message: form.message.trim(),
      topic: topic || 'Общий вопрос',
      priority,
    });
    setSent(ticket.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (sent) {
    return (
      <div className={cn('mx-auto max-w-[1200px] px-4 sm:px-6', inAccount ? 'pb-4 pt-1' : 'pb-12 pt-8 sm:pt-12')}>
        <div className="fade-up mx-auto max-w-2xl rounded-card border border-line bg-white p-8 text-center shadow-card sm:p-12">
          <div className="pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-glow ring-8 ring-brand-50">
            <Check className="h-9 w-9" strokeWidth={3} />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">Тикет #{sent} создан</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Мы получили ваше обращение и ответим на <b className="text-ink">{form.email}</b>. Команда WPP Team уже занимается вашим вопросом.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Button variant="dark" size="lg" onClick={() => navigate('account', `ticket/${sent}`)} arrow>
              Открыть тикет
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('account', 'tickets')}>
              Все обращения
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mx-auto max-w-[820px] px-4 sm:px-6', inAccount ? 'pb-4 pt-1' : 'pb-12 pt-8 sm:pt-12')}>
      {inAccount ? (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <button onClick={() => navigate('account', 'tickets')} className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink">
              <ArrowLeft className="h-3.5 w-3.5" />
              Все обращения
            </button>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Новое обращение</h2>
            <p className="mt-1 text-sm text-muted">WPP Team ответит в личном кабинете и на email.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-ink">
            <Users className="h-3.5 w-3.5" />
            WPP Team
          </div>
        </div>
      ) : (
        <PageTitle
          eyebrow="Поддержка в личном кабинете"
          title="Помощь по вашему заказу"
          subtitle="Создайте обращение из личного кабинета — там сохраняются переписка, статус и вся история решений."
        >
          <Button className="mt-6" onClick={() => navigate('account', 'new-ticket')} arrow>
            Перейти в кабинет
          </Button>
        </PageTitle>
      )}

      <div className={cn('space-y-5', !inAccount && 'mt-12')}>
        <SectionCard n={1} title="Продукт и тема">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Продукт"
              value={String(product)}
              onChange={(e) => setProduct(Number(e.target.value))}
              hint="Показаны ваши покупки"
            >
              {PURCHASED.map((id) => (
                <option key={id} value={id}>
                  {productById(id).name}
                </option>
              ))}
              <option value={0}>Другое / общий вопрос</option>
            </SelectField>

            <SelectField
              label="Тема обращения"
              value={topicChoice}
              onChange={(e) => {
                setTopicChoice(e.target.value);
                setErrors((prev) => ({ ...prev, topic: '' }));
              }}
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              <option value={CUSTOM_TOPIC}>Своя тема…</option>
            </SelectField>
          </div>

          {topicChoice === CUSTOM_TOPIC && (
            <Field
              className="mt-4"
              label="Ваша тема"
              placeholder="Например: вопрос по интеграции с CRM"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              error={errors.topic}
              maxLength={80}
            />
          )}

          <div className="mt-4">
            <span className="mb-2 block text-[13px] font-medium">Приоритет</span>
            <Segmented
              size="sm"
              value={priority}
              onChange={setPriority}
              options={[
                { value: 'normal', label: 'Обычный' },
                { value: 'high', label: 'Высокий' },
                { value: 'critical', label: 'Сайт не работает' },
              ]}
            />
          </div>
        </SectionCard>

        <SectionCard n={2} title="Детали" right={<span className="text-xs text-muted">Чем подробнее — тем быстрее ответ</span>}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Field label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
            <Field label="Адрес сайта" optional placeholder="https://example.ru" value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })} />
            <SelectField label="Версия WordPress" value={form.wp} onChange={(e) => setForm({ ...form, wp: e.target.value })}>
              {['6.8', '6.7', '6.6', '6.5', 'Старше 6.5'].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </SelectField>
          </div>
          <Field className="mt-4" label="Тема" placeholder="Например: не импортируется демо-контент" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} error={errors.subject} />
          <TextArea
            className="mt-4"
            label="Описание проблемы"
            rows={6}
            placeholder="Что вы делали, что ожидали и что получили. Если есть ошибка — скопируйте её текст."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {errors.message && <p className="mt-1.5 text-xs text-rose-500">{errors.message}</p>}
          <button
            type="button"
            onClick={() => setFiles((f) => [...f, `screenshot-${f.length + 1}.png`])}
            className="mt-4 flex w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-line px-4 py-6 text-center transition hover:border-brand hover:bg-brand-50/40"
          >
            <Paperclip className="h-5 w-5 text-muted" />
            <span className="text-sm font-semibold">Прикрепите скриншоты или логи</span>
            <span className="text-xs text-muted">PNG, JPG, TXT, ZIP · до 20 МБ</span>
          </button>
          {files.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {files.map((f) => (
                <span key={f} className="inline-flex items-center gap-2 rounded-full bg-soft py-1.5 pl-3 pr-1.5 text-xs font-medium">
                  <FileText className="h-3.5 w-3.5" />
                  {f}
                  <button onClick={() => setFiles((arr) => arr.filter((x) => x !== f))} className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-white" aria-label="Удалить файл">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </SectionCard>

        {suggestions.length > 0 && (
          <SectionCard title="Возможно, это поможет" right={<BookOpen className="h-4 w-4 text-muted" />}>
            <div className="space-y-1">
              {suggestions.map((a) => (
                <button key={a.id} onClick={() => navigate('kb-article', a.id)} className="flex w-full items-start gap-2 rounded-xl p-2 text-left text-sm text-ink/80 transition hover:bg-soft hover:text-ink">
                  <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" />
                  {a.title}
                </button>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Саммори + отправка — внизу */}
        <div className="overflow-hidden rounded-card shadow-float ring-1 ring-black/5">
          <div className="dark-card px-6 pb-6 pt-6 text-white">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Ваше обращение</div>
            <div className="mt-2 text-2xl font-bold tracking-tight">{p ? p.name : 'Общий вопрос'}</div>
            <div className="text-sm text-white/60">{topic || 'Тема не выбрана'}</div>
            <div className="mt-5 grid gap-2.5 text-sm text-white/90 sm:grid-cols-3">
              <div className="flex items-center gap-2.5">
                <Zap className="h-4 w-4 flex-shrink-0 text-brand" />
                Приоритет: {PRIORITY_LABEL[priority]}
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="h-4 w-4 flex-shrink-0 text-brand" />
                Команда: WPP Team
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-brand" />
                {p?.type === 'plugin' ? 'Пожизненная лицензия' : p?.type === 'theme' ? 'Тема: 1 или 5 сайтов' : 'Вопрос по заказу'}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink">
                <Users className="h-5 w-5 text-brand" />
              </span>
              <div className="text-sm">
                <div className="font-semibold">WPP Team</div>
                <div className="text-xs text-muted">Команда поддержки на связи</div>
              </div>
            </div>
            <div className="sm:text-right">
              <Button size="lg" className="w-full sm:w-auto" onClick={submit}>
                Отправить тикет
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">Отправляя форму, вы соглашаетесь на обработку персональных данных.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Старые ссылки на /support ведут к форме обращения в кабинете. */
export function Support() {
  const { navigate } = useApp();
  useEffect(() => {
    navigate('account', 'new-ticket');
  }, [navigate]);

  return (
    <div className="mx-auto max-w-[720px] px-4 py-24 text-center sm:px-6">
      <PageTitle title="Поддержка доступна в личном кабинете" subtitle="Перенаправляем к созданию обращения. Все ответы и статусы будут сохранены в вашем аккаунте.">
        <Button className="mt-6" onClick={() => navigate('account', 'new-ticket')} arrow>
          Создать обращение
        </Button>
      </PageTitle>
    </div>
  );
}
