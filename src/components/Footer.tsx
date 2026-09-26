import { useApp } from '../context';
import { Logo } from './ui';

const COLS = [
  {
    title: 'Магазин',
    links: [
      { label: 'Все продукты', page: 'shop' },
      { label: 'Темы WordPress', page: 'shop', param: 'theme' },
      { label: 'Плагины', page: 'shop', param: 'plugin' },
      { label: 'Оформление заказа', page: 'checkout' },
    ],
  },
  {
    title: 'Ресурсы',
    links: [
      { label: 'Блог', page: 'blog' },
      { label: 'Частые вопросы (FAQ)', page: 'faq' },
      { label: 'База знаний', page: 'kb' },
      { label: 'Установка темы', page: 'kb-article', param: 'install-theme' },
      { label: 'Для разработчиков', page: 'kb-article', param: 'hooks' },
      { label: 'UI-кит и шаблоны WooCommerce', page: 'ui' },
    ],
  },
  {
    title: 'Помощь',
    links: [
      { label: 'Создать обращение', page: 'account', param: 'new-ticket' },
      { label: 'Личный кабинет', page: 'account' },
      { label: 'Мои обращения', page: 'account', param: 'tickets' },
      { label: 'Мои лицензии', page: 'account', param: 'licenses' },
      { label: 'Возврат средств', page: 'kb-article', param: 'refund' },
    ],
  },
];

export function Footer() {
  const { navigate, route } = useApp();

  const bottom = (
    <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 py-5 text-[13px] text-muted sm:flex-row sm:px-6">
      <span>© 2026 Wp Panda. Все права защищены.</span>
      <span>
        Нужна помощь?{' '}
        <button onClick={() => navigate('account', 'new-ticket')} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
          Написать в поддержку в кабинете
        </button>
      </span>
    </div>
  );

  if (route.page === 'checkout') return <footer className="mt-16 bg-[#F4F4F6]">{bottom}</footer>;

  return (
    <footer className="mt-24 bg-[#F4F4F6]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Премиальные темы и плагины для WordPress и WooCommerce с автообновлениями и поддержкой от разработчиков.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <button onClick={() => navigate(l.page, 'param' in l ? l.param : undefined)} className="text-ink/80 transition hover:text-ink">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-xs font-semibold text-muted sm:justify-start sm:px-6">
          <span className="font-medium">Принимаем к оплате:</span>
          {['VISA', 'Mastercard', 'МИР', 'СБП', 'SberPay', 'ЮMoney', 'USDT', 'Счёт для юрлиц'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
      <div className="border-t border-line">{bottom}</div>
    </footer>
  );
}
