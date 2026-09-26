import { useMemo, useState } from 'react';
import { ChevronDown, CircleHelp, FileText, LifeBuoy, Search, ShieldCheck } from 'lucide-react';
import { useApp } from '../context';
import { faq, type FaqCategory } from '../data';
import { Button, EmptyBox, IconCircle, PageTitle, Segmented } from '../components/ui';
import { cn } from '../utils/cn';

const CATEGORIES: ('Все вопросы' | FaqCategory)[] = [
  'Все вопросы',
  'Покупка',
  'Темы и плагины',
  'Установка',
  'Лицензии',
  'Оплата и возвраты',
];

export function FaqPage() {
  const { navigate } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Все вопросы');
  const [openQuestion, setOpenQuestion] = useState<string | null>(faq[0]?.q ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('ru-RU');
    return faq.filter((item) => {
      const matchesCategory = category === 'Все вопросы' || item.category === category;
      const matchesSearch = !q || `${item.q} ${item.a}`.toLocaleLowerCase('ru-RU').includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const grouped = CATEGORIES.filter((c): c is FaqCategory => c !== 'Все вопросы')
    .map((name) => ({ name, items: filtered.filter((item) => item.category === name) }))
    .filter((group) => group.items.length > 0);

  const toggle = (question: string) => setOpenQuestion((current) => (current === question ? null : question));

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-12 pt-8 sm:px-6 sm:pt-12">
      <PageTitle
        eyebrow={
          <span className="flex items-center gap-2">
            <CircleHelp className="h-3.5 w-3.5" />
            Центр ответов Wp Panda
          </span>
        }
        title="Частые вопросы"
        subtitle="Короткие ответы о покупке, установке и лицензиях на темы и плагины WordPress."
      >
        <div className="mx-auto mt-8 max-w-2xl">
          <label className="flex h-14 items-center gap-3 rounded-full border border-line bg-white px-5 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
            <Search className="h-5 w-5 flex-shrink-0 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Например: лицензия плагина или возврат"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70 sm:text-base"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="text-xs font-semibold text-muted hover:text-ink">
                Очистить
              </button>
            )}
          </label>
        </div>
      </PageTitle>

      <div className="no-scrollbar mx-auto mt-8 max-w-4xl overflow-x-auto">
        <Segmented
          className="min-w-max sm:min-w-0"
          size="sm"
          value={category}
          onChange={setCategory}
          options={CATEGORIES.map((name) => ({
            value: name,
            label: name,
            count: name === 'Все вопросы' ? faq.length : faq.filter((item) => item.category === name).length,
          }))}
        />
      </div>

      <div className="mx-auto mt-10 grid max-w-[1080px] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0">
          {filtered.length ? (
            <div className="space-y-8">
              {grouped.map((group) => (
                <section key={group.name}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-tight">{group.name}</h2>
                    <span className="text-xs text-muted">{group.items.length} {group.items.length === 1 ? 'вопрос' : 'вопроса'}</span>
                  </div>
                  <div className="space-y-2.5">
                    {group.items.map((item) => {
                      const isOpen = openQuestion === item.q;
                      return (
                        <article key={item.q} className={cn('rounded-2xl border bg-white transition-all', isOpen ? 'border-brand shadow-card ring-1 ring-brand' : 'border-line hover:border-ink/15')}>
                          <button
                            type="button"
                            onClick={() => toggle(item.q)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
                          >
                            <span className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition', isOpen ? 'bg-brand text-ink' : 'bg-soft text-muted')}>
                              <FileText className="h-4 w-4" />
                            </span>
                            <span className="flex-1 text-sm font-semibold leading-relaxed sm:text-[15px]">{item.q}</span>
                            <ChevronDown className={cn('h-4 w-4 flex-shrink-0 text-muted transition-transform', isOpen && 'rotate-180 text-ink')} />
                          </button>
                          {isOpen && (
                            <div className="fade-in border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:px-6 sm:pl-[68px]">
                              {item.a}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <EmptyBox
              icon={<Search className="h-6 w-6" />}
              title="Ответов не найдено"
              text="Измените запрос или выберите другую категорию. Если вопрос срочный — создайте обращение в кабинете."
              action={<Button onClick={() => navigate('account', 'new-ticket')}>Создать обращение</Button>}
            />
          )}
        </main>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="dark-card rounded-card p-6 text-white">
            <IconCircle tone="yellow" className="h-11 w-11">
              <LifeBuoy className="h-5 w-5" />
            </IconCircle>
            <h2 className="mt-5 text-xl font-semibold tracking-tight">Не нашли ответ?</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Напишите инженерам из личного кабинета. Переписка и статус обращения будут храниться в одном месте.
            </p>
            <Button className="mt-5 w-full" onClick={() => navigate('account', 'new-ticket')} arrow>
              Создать обращение
            </Button>
            <button onClick={() => navigate('account', 'tickets')} className="mt-3 w-full text-center text-xs font-semibold text-white/65 underline decoration-white/25 underline-offset-4 hover:text-white">
              Мои обращения
            </button>
          </div>

          <div className="rounded-card border border-line bg-white p-5 shadow-card">
            <div className="flex items-start gap-3">
              <IconCircle tone="brand" className="h-9 w-9">
                <ShieldCheck className="h-4 w-4" />
              </IconCircle>
              <div>
                <div className="text-sm font-semibold">Поддержка от разработчиков</div>
                <p className="mt-1 text-xs leading-relaxed text-muted">Ответим по вашему продукту и поможем с настройкой. Среднее время ответа — около 12 минут.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}