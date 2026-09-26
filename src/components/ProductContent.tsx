import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, BookOpen, Check, ChevronDown, CircleCheck, FileText, LifeBuoy, MessageSquare, Send, Star, User } from 'lucide-react';
import { useApp } from '../context';
import { changelogFor, reviews, type ChangeTag, type Product } from '../data';
import { cn } from '../utils/cn';
import { ProductMedia } from './ProductMedia';
import { Button, Field, Stars, TextArea } from './ui';

export type ProductReview = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
};

export type ProductQuestion = {
  id: string;
  name: string;
  date: string;
  text: string;
  answer?: string;
};

type ProductFeedback = { reviews: ProductReview[]; questions: ProductQuestion[] };

function readFeedback(key: string): ProductFeedback {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(key) ?? 'null');
    if (!stored || typeof stored !== 'object') return { reviews: [], questions: [] };
    const value = stored as Partial<ProductFeedback>;
    const isMessage = (item: unknown): item is ProductQuestion => {
      if (!item || typeof item !== 'object') return false;
      const message = item as Partial<ProductQuestion>;
      return typeof message.id === 'string' && typeof message.name === 'string' && typeof message.date === 'string' && typeof message.text === 'string';
    };
    return {
      reviews: Array.isArray(value.reviews) ? value.reviews.filter((item) => isMessage(item) && Number.isInteger(item.rating) && item.rating >= 1 && item.rating <= 5).slice(0, 100) : [],
      questions: Array.isArray(value.questions) ? value.questions.filter(isMessage).slice(0, 100) : [],
    };
  } catch {
    return { reviews: [], questions: [] };
  }
}

export function useProductFeedback(product: Product) {
  const key = `wppanda-product-feedback-${product.id}`;
  const [feedback, setFeedback] = useState(() => readFeedback(key));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(feedback));
    } catch {
      // Feedback still works in memory when browser storage is unavailable.
    }
  }, [key, feedback]);

  return {
    newReviews: feedback.reviews,
    questions: [...feedback.questions, ...initialProductQuestions(product)],
    addReview: (review: ProductReview) => setFeedback((previous) => ({ ...previous, reviews: [review, ...previous.reviews].slice(0, 100) })),
    addQuestion: (question: ProductQuestion) => setFeedback((previous) => ({ ...previous, questions: [question, ...previous.questions].slice(0, 100) })),
  };
}

export function initialProductQuestions(product: Product): ProductQuestion[] {
  return [
    {
      id: 'compatibility',
      name: 'Андрей К.',
      date: '12 марта 2026',
      text: `Подойдёт ли ${product.name} для сайта на WordPress ${product.wp.replace('+', '')}?`,
      answer: `Да. Минимальные требования: WordPress ${product.wp} и PHP ${product.php}. Перед установкой рекомендуем сделать резервную копию сайта.`,
    },
    {
      id: 'installation',
      name: 'Марина С.',
      date: '9 марта 2026',
      text: 'Есть инструкция по установке? Хочу настроить всё самостоятельно.',
      answer: 'Да, вместе с продуктом вы получаете документацию. Пошаговые инструкции по установке и активации также есть в нашей базе знаний.',
    },
    {
      id: 'purchase',
      name: 'Денис М.',
      date: '5 марта 2026',
      text: product.type === 'plugin' ? 'Нужно ли оплачивать продление каждый год?' : 'Можно ли использовать тему для клиентских проектов?',
      answer: product.type === 'plugin'
        ? 'Нет. Плагин приобретается один раз, лицензия бессрочная. Все будущие обновления включены.'
        : 'Да. Можно выбрать вариант на 1 сайт или на 5 сайтов. Для каждого проекта используется отдельная активация.',
    },
  ];
}

const changeStyles: Record<ChangeTag, [string, string]> = {
  new: ['Новое', 'bg-emerald-50 text-emerald-700'],
  improved: ['Улучшено', 'bg-brand-50 text-[#906500]'],
  fixed: ['Исправлено', 'bg-sky-50 text-sky-700'],
};

export function ProductDescription({ product: p, onGallery, onChangelog }: {
  product: Product;
  onGallery: (index: number) => void;
  onChangelog: () => void;
}) {
  const { navigate } = useApp();
  const latest = changelogFor(p)[0];
  const packageItems = p.type === 'theme'
    ? ['Архив темы и дочерняя тема', 'Демо-контент для быстрого старта', 'Лицензионный ключ на 1 или 5 сайтов', 'Документация и файлы перевода']
    : ['Установочный ZIP-архив плагина', 'Бессрочный лицензионный ключ', 'Будущие обновления без доплат', 'Документация и файлы перевода'];

  return (
    <div className="space-y-10 text-[15px] leading-relaxed">
      <section>
        <h2 className="text-2xl font-bold tracking-tight">О продукте {p.name}</h2>
        <p className="mt-4 leading-[1.85] text-muted">{p.description}</p>
        <p className="mt-3 leading-[1.85] text-muted">
          Установите продукт на свой сайт, активируйте ключ и приступайте к работе.
          Все файлы и новые версии доступны в личном кабинете Wp Panda.
        </p>
      </section>

      <section className="border-t border-line pt-8">
        <h2 className="text-2xl font-bold tracking-tight">Основные возможности</h2>
        <ul className="mt-5 grid gap-x-7 sm:grid-cols-2">
          {p.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 border-b border-line py-4">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" strokeWidth={2.5} />
              <span className="text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">{p.type === 'theme' ? 'Продумана до деталей' : 'Простое управление в WordPress'}</h2>
        <p className="mt-3 text-muted">
          {p.type === 'theme'
            ? 'Посмотрите внутренние страницы и мобильную версию в галерее.'
            : 'Все настройки под рукой. Посмотрите возможности и интерфейс плагина в галерее.'}
        </p>
        {p.type === 'theme' ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[1, 2].map((variant) => (
              <button
                key={variant}
                type="button"
                onClick={() => onGallery(variant)}
                className="group overflow-hidden rounded-2xl border border-line bg-white p-1.5 text-left transition hover:border-brand focus-visible:outline-2 focus-visible:outline-brand"
              >
                <ProductMedia product={p} variant={variant} className="rounded-xl" />
                <span className="flex items-center justify-between gap-2 px-2 py-3 text-xs font-semibold sm:text-sm">
                  {variant === 1 ? 'Внутренние страницы' : 'Мобильная версия'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-5 divide-y divide-line rounded-2xl border border-line">
            {[
              { title: 'Возможности плагина', text: 'Что входит в продукт и как это работает', icon: FileText, index: 1 },
              { title: 'Панель настроек', text: 'Интерфейс в консоли WordPress', icon: BookOpen, index: 2 },
            ].map((item) => (
              <button key={item.index} type="button" onClick={() => onGallery(item.index)} className="group flex w-full items-center gap-4 p-5 text-left transition hover:bg-soft/70">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: p.bg, color: p.color }}>
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">{item.text}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-ink" />
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-line pt-8">
        <h2 className="text-2xl font-bold tracking-tight">Что входит в покупку</h2>
        <ul className="mt-5 space-y-3">
          {packageItems.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <CircleCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="font-medium text-ink">Совместимость:</span>
          <span>{p.compat.join(' / ')}</span>
        </div>
      </section>

      <section className="border-t border-line pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight">Последнее обновление</h2>
          <span className="text-xs text-muted">{latest.date}</span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Версия {latest.version}
        </div>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
          {latest.changes.map((change) => <li key={change.text}>{change.text}</li>)}
        </ul>
        <button onClick={onChangelog} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4">
          Вся история версий <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </section>

      <div className="flex flex-col items-start justify-between gap-4 border-y border-line py-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-semibold">Нужна помощь с установкой?</h3>
          <p className="mt-1 text-sm text-muted">Пошаговые инструкции уже есть в базе знаний.</p>
        </div>
        <Button variant="outline" onClick={() => navigate('kb-article', 'install-theme')}>
          <BookOpen className="h-4 w-4" /> Инструкция
        </Button>
      </div>
    </div>
  );
}

export function ProductChangelog({ product }: { product: Product }) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight">История версий</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">Новые возможности, улучшения и исправления {product.name}.</p>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {changelogFor(product).map((release, index) => (
          <details key={release.version} open={index === 0} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span className="flex flex-wrap items-center gap-3">
                <span className="font-semibold">v{release.version}</span>
                <span className="text-xs text-muted">{release.date}</span>
                {index === 0 && <span className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-semibold text-[#906500]">Текущая версия</span>}
              </span>
              <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted transition group-open:rotate-180" />
            </summary>
            <ul className="mt-5 space-y-3">
              {release.changes.map((change) => (
                <li key={change.text} className="flex items-start gap-3 text-sm">
                  <span className={cn('mt-0.5 w-[86px] flex-shrink-0 rounded-full px-2 py-1 text-center text-[10px] font-semibold', changeStyles[change.tag][1])}>
                    {changeStyles[change.tag][0]}
                  </span>
                  <span className="leading-relaxed text-muted">{change.text}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ProductReviews({ product, newReviews, onAdd }: {
  product: Product;
  newReviews: ProductReview[];
  onAdd: (review: ProductReview) => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [filter, setFilter] = useState('all');
  const [notice, setNotice] = useState('');
  const allReviews: ProductReview[] = [...newReviews, ...reviews.map((review, index) => ({ ...review, id: `sample-${index}` }))];
  const visible = allReviews.filter((review) => filter === 'all' || review.rating === Number(filter));
  const average = ((product.rating * product.reviews + newReviews.reduce((sum, review) => sum + review.rating, 0)) / (product.reviews + newReviews.length)).toFixed(1);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get('name') ?? '').trim();
    const text = String(values.get('review') ?? '').trim();
    if (!name || text.length < 10) {
      setNotice('Укажите имя и напишите не менее 10 символов.');
      return;
    }
    onAdd({ id: `review-${Date.now()}`, name, text, rating, date: 'Только что' });
    setFormOpen(false);
    setFilter('all');
    setNotice('Спасибо! Ваш отзыв добавлен.');
  };

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Отзывы покупателей</h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-4xl font-bold tabular-nums">{average}</span>
            <div>
              <Stars value={Number(average)} size={16} />
              <p className="mt-1 text-xs text-muted">На основе {(product.reviews + newReviews.length).toLocaleString('ru-RU')} оценок</p>
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={() => { setFormOpen(!formOpen); setNotice(''); }}>
          {formOpen ? 'Отменить' : 'Оставить отзыв'}
        </Button>
      </div>
      {notice && <p role="status" className="mt-4 text-sm text-emerald-700">{notice}</p>}
      {formOpen && (
        <form onSubmit={submit} className="fade-up mt-6 space-y-4 rounded-2xl border border-line bg-soft/40 p-5">
          <Field label="Ваше имя" name="name" required maxLength={80} defaultValue="Алексей" />
          <div role="group" aria-label="Ваша оценка" className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button key={value} type="button" onClick={() => setRating(value)} aria-label={`Оценка ${value} из 5`} aria-pressed={rating === value} className="rounded-md p-1.5 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-brand">
                <Star className={cn('h-6 w-6', value <= rating ? 'fill-brand text-brand' : 'text-muted/40')} />
              </button>
            ))}
          </div>
          <TextArea name="review" label="Ваш отзыв" required minLength={10} maxLength={3000} placeholder="Расскажите о работе с продуктом" />
          <Button type="submit">Опубликовать отзыв</Button>
        </form>
      )}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3 text-xs text-muted">
        <span>Последние отзывы о продукте</span>
        <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Фильтр отзывов по оценке" className="rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-brand">
          <option value="all">Все оценки</option>
          {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} из 5</option>)}
        </select>
      </div>
      <div className="divide-y divide-line">
        {visible.map((review) => (
          <article key={review.id} className="py-6">
            <div className="flex items-start gap-3">
              {review.avatar ? <img src={review.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-50"><User className="h-4 w-4" /></span>}
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-semibold">{review.name}</h3>
                <p className="mt-0.5 text-xs text-muted">{review.date}</p>
              </div>
              <Stars value={review.rating} size={13} />
            </div>
            <p className="mt-4 break-words text-sm leading-[1.8] text-muted">{review.text}</p>
          </article>
        ))}
        {!visible.length && <p className="py-10 text-center text-sm text-muted">Отзывов с такой оценкой пока нет.</p>}
      </div>
    </section>
  );
}

export function ProductComments({ questions, onAdd }: {
  questions: ProductQuestion[];
  onAdd: (question: ProductQuestion) => void;
}) {
  const { navigate } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get('name') ?? '').trim();
    const text = String(values.get('question') ?? '').trim();
    if (!name || text.length < 10) {
      setNotice('Укажите имя и напишите вопрос подробнее.');
      return;
    }
    onAdd({ id: `question-${Date.now()}`, name, text, date: 'Только что' });
    setFormOpen(false);
    setNotice('Ваш вопрос добавлен к обсуждению.');
  };

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Комментарии</h2>
          <p className="mt-2 text-sm text-muted">Вопросы о возможностях продукта перед покупкой.</p>
        </div>
        <Button variant="outline" onClick={() => { setFormOpen(!formOpen); setNotice(''); }}>
          <MessageSquare className="h-4 w-4" /> {formOpen ? 'Отменить' : 'Задать вопрос'}
        </Button>
      </div>
      <div className="mt-5 flex items-start gap-3 border-y border-line py-4 text-sm text-muted">
        <LifeBuoy className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <p>Уже купили продукт? Технические вопросы решаем в <button onClick={() => navigate('account', 'new-ticket')} className="font-medium text-ink underline decoration-brand decoration-2 underline-offset-4">личном кабинете</button>.</p>
      </div>
      {notice && <p className="mt-4 text-sm text-emerald-700" role="status">{notice}</p>}
      {formOpen && (
        <form onSubmit={submit} className="fade-up mt-5 space-y-4 rounded-2xl border border-line bg-soft/40 p-5">
          <Field label="Ваше имя" name="name" required maxLength={80} defaultValue="Алексей" />
          <TextArea label="Ваш вопрос" name="question" required minLength={10} maxLength={3000} placeholder="Что вы хотите узнать о продукте?" />
          <p className="text-xs leading-relaxed text-muted">Обсуждение публичное. Не указывайте пароли, ключи и другие личные данные.</p>
          <Button type="submit"><Send className="h-4 w-4" /> Опубликовать вопрос</Button>
        </form>
      )}
      <div className="mt-1 divide-y divide-line">
        {questions.map((question) => (
          <article key={question.id} className="py-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="min-w-0 break-words text-sm font-semibold">{question.name}</h3>
              <span className="text-xs text-muted">{question.date}</span>
            </div>
            <p className="mt-3 break-words text-sm leading-relaxed text-muted">{question.text}</p>
            {question.answer && (
              <div className="ml-3 mt-4 border-l-2 border-brand pl-4 sm:ml-5">
                <div className="flex items-center gap-2 text-xs font-semibold">WPP Team <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-[#906500]">Команда автора</span></div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{question.answer}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}