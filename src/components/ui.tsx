import { Fragment, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronRight, Copy, Star } from 'lucide-react';
import { cn } from '../utils/cn';

export const rub = (n: number) => `${Math.round(n).toLocaleString('ru-RU')} ₽`;

export function plural(n: number, forms: [string, string, string]) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

/* ---------- Logo Wp Panda (WPP) ---------- */
export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line">
        <img src="/panda.svg" alt="Wp Panda" className="h-9 w-9 object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('text-[19px] font-bold tracking-tight', light ? 'text-white' : 'text-ink')}>Wp Panda</span>
        <span className={cn('mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em]', light ? 'text-white/60' : 'text-muted')}>WPP</span>
      </span>
    </span>
  );
}

/* ---------- Buttons ---------- */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'dark' | 'soft' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  arrowCircle?: boolean;
};

export function Button({ variant = 'primary', size = 'md', arrow, arrowCircle, className, children, type = 'button', ...rest }: ButtonProps) {
  const v = {
    primary: 'bg-brand text-ink hover:bg-brand-600 shadow-glow',
    dark: 'bg-ink text-white hover:bg-ink-2',
    soft: 'bg-soft text-ink border border-line hover:bg-[#EEEEF2]',
    outline: 'bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)]',
    ghost: 'text-ink hover:bg-soft',
    white: 'bg-white text-ink hover:bg-white/90',
  }[variant];
  const s = { sm: 'h-9 px-4 text-[13px]', md: 'h-11 px-5 text-sm', lg: 'h-14 px-7 text-[15px]' }[size];
  return (
    <button
      type={type}
      {...rest}
      className={cn(
        'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
        v,
        s,
        arrowCircle && (size === 'lg' ? 'pr-1.5' : 'pr-1'),
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight className="h-4 w-4" />}
      {arrowCircle && (
        <span
          className={cn(
            'ml-4 flex items-center justify-center rounded-full',
            variant === 'dark' ? 'bg-brand text-ink' : 'bg-ink text-white',
            size === 'lg' ? 'h-11 w-11' : size === 'md' ? 'h-9 w-9' : 'h-7 w-7',
          )}
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </button>
  );
}

export function IconButton({ className, children, badge, dot, type = 'button', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { badge?: number; dot?: boolean }) {
  return (
    <button
      type={type}
      {...rest}
      className={cn(
        'relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95',
        className,
      )}
    >
      {children}
      {dot && <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />}
      {!!badge && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-ink ring-2 ring-white">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ---------- Small atoms ---------- */
export function Pill({ children, icon, className }: { children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur', className)}>
      {icon}
      {children}
    </span>
  );
}

export function CheckBadge({ className }: { className?: string }) {
  return (
    <span className={cn('pop flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink shadow-glow ring-4 ring-white', className)}>
      <Check className="h-4 w-4" strokeWidth={3} />
    </span>
  );
}

export function IconCircle({ children, className, tone = 'soft' }: { children: ReactNode; className?: string; tone?: 'soft' | 'brand' | 'dark' | 'white' | 'yellow' }) {
  const t = {
    soft: 'bg-soft border border-line text-ink',
    brand: 'bg-brand-50 text-ink ring-1 ring-brand-100',
    yellow: 'bg-brand text-ink',
    dark: 'bg-ink text-white',
    white: 'bg-white border border-line text-ink',
  }[tone];
  return <span className={cn('flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full', t, className)}>{children}</span>;
}

export function RadioDot({ checked, disabled, small }: { checked: boolean; disabled?: boolean; small?: boolean }) {
  return (
    <span
      className={cn(
        'flex flex-shrink-0 items-center justify-center rounded-full border-2 transition',
        small ? 'h-4 w-4' : 'h-5 w-5',
        disabled ? 'border-line bg-soft' : checked ? 'border-brand bg-brand' : 'border-line bg-white',
      )}
    >
      {checked && !disabled && <span className={cn('rounded-full bg-white', small ? 'h-1.5 w-1.5' : 'h-2 w-2')} />}
    </span>
  );
}

export function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span className={cn('mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition', checked ? 'border-brand bg-brand text-ink' : 'border-line bg-white')}>
      {checked && <Check className="h-3 w-3" strokeWidth={3.5} />}
    </span>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={cn('relative h-7 w-12 flex-shrink-0 rounded-full transition-colors', checked ? 'bg-brand' : 'bg-line')}>
      <span className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', checked ? 'left-6' : 'left-1')} />
    </button>
  );
}

export const Spinner = () => <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink" />;

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} style={{ width: size, height: size }} className={i <= Math.round(value) ? 'fill-brand text-brand' : 'fill-line text-line'} />
      ))}
    </span>
  );
}

const statusStyles: Record<string, [string, string]> = {
  completed: ['Выполнен', 'bg-emerald-50 text-emerald-700 ring-emerald-200'],
  processing: ['В обработке', 'bg-brand-50 text-[#946300] ring-brand-100'],
  refunded: ['Возврат', 'bg-rose-50 text-rose-600 ring-rose-200'],
  cancelled: ['Отменён', 'bg-soft text-muted ring-line'],
  active: ['Активна', 'bg-emerald-50 text-emerald-700 ring-emerald-200'],
  expiring: ['Истекает', 'bg-brand-50 text-[#946300] ring-brand-100'],
  expired: ['Истекла', 'bg-rose-50 text-rose-600 ring-rose-200'],
  answered: ['Есть ответ', 'bg-emerald-50 text-emerald-700 ring-emerald-200'],
  open: ['Открыт', 'bg-brand-50 text-[#946300] ring-brand-100'],
  closed: ['Закрыт', 'bg-soft text-muted ring-line'],
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const [label, cls] = statusStyles[status] ?? [status, 'bg-soft text-muted ring-line'];
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset', cls, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => undefined);
        setOk(true);
        setTimeout(() => setOk(false), 1600);
      }}
      className={cn(
        'inline-flex h-8 flex-shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition',
        ok ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-line bg-white hover:border-ink/20',
        className,
      )}
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? 'Скопировано' : 'Копировать'}
    </button>
  );
}

export function CardBrand({ brand, className }: { brand: string; className?: string }) {
  if (brand === 'VISA') return <span className={cn('text-[15px] font-extrabold italic tracking-tight text-[#1A1F71]', className)}>VISA</span>;
  if (brand === 'МИР') return <span className={cn('text-[14px] font-extrabold tracking-tight text-[#0F754E]', className)}>МИР</span>;
  if (brand === 'Mastercard')
    return (
      <span className={cn('relative inline-flex h-5 w-8 flex-shrink-0', className)}>
        <span className="absolute left-0 h-5 w-5 rounded-full bg-[#EB001B]" />
        <span className="absolute right-0 h-5 w-5 rounded-full bg-[#F79E1B]/90" />
      </span>
    );
  return <span className={className}>{brand}</span>;
}

/* ---------- Form fields ---------- */
export const inputCls =
  'h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15';

function FieldLabel({ label, optional }: { label?: string; optional?: boolean }) {
  if (!label) return null;
  return (
    <span className="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink">
      {label}
      {optional && <span className="text-[11px] font-normal text-muted">необязательно</span>}
    </span>
  );
}

type Extra = { label?: string; optional?: boolean; hint?: ReactNode; error?: string };

export function Field({ label, optional, hint, error, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & Extra) {
  return (
    <label className={cn('block', className)}>
      <FieldLabel label={label} optional={optional} />
      <input {...rest} className={cn(inputCls, error && 'border-rose-300 bg-rose-50/40 focus:border-rose-400 focus:ring-rose-100')} />
      {error ? <span className="mt-1.5 block text-xs text-rose-500">{error}</span> : hint ? <span className="mt-1.5 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function SelectField({ label, optional, className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & Extra) {
  return (
    <label className={cn('block', className)}>
      <FieldLabel label={label} optional={optional} />
      <span className="relative block">
        <select {...rest} className={cn(inputCls, 'cursor-pointer appearance-none pr-10')}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </span>
    </label>
  );
}

export function TextArea({ label, optional, className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & Extra) {
  return (
    <label className={cn('block', className)}>
      <FieldLabel label={label} optional={optional} />
      <textarea {...rest} className={cn(inputCls, 'h-auto min-h-[120px] resize-y py-3 leading-relaxed')} />
    </label>
  );
}

/* ---------- Segmented control (All / Woman / Man) ---------- */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  className,
  size = 'md',
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: ReactNode; count?: number }[];
  className?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <div className={cn('flex w-full rounded-full border border-line bg-white p-1.5 shadow-card', className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200',
              size === 'md' ? 'h-10 text-sm' : 'h-8 text-[13px]',
              active ? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]' : 'text-ink/65 hover:text-ink',
            )}
          >
            {o.label}
            {o.count !== undefined && <span className={cn('text-xs font-medium', active ? 'text-white/55' : 'text-muted')}>{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Stepper (Service → Location → …) ---------- */
export function Stepper({ steps, current, onStep }: { steps: { title: string; subtitle: string }[]; current: number; onStep?: (i: number) => void }) {
  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex min-w-max items-center gap-1 rounded-full border border-line bg-white p-1.5 shadow-card sm:min-w-0">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const clickable = Boolean(onStep) && done;
          return (
            <Fragment key={s.title}>
              <button
                type="button"
                disabled={!clickable}
                onClick={() => onStep?.(i)}
                className={cn(
                  'flex flex-1 items-center gap-3 rounded-full py-2 pl-2 pr-5 text-left transition-all disabled:cursor-default',
                  active ? 'bg-ink text-white shadow-[0_10px_24px_-12px_rgba(20,20,28,0.7)]' : clickable ? 'hover:bg-soft' : '',
                )}
              >
                <span
                  className={cn(
                    'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                    active ? 'bg-brand text-ink' : done ? 'bg-ink text-white' : 'border border-line bg-soft text-muted',
                  )}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold leading-tight">{s.title}</span>
                  <span className={cn('block max-w-[150px] truncate text-[11px] leading-tight', active ? 'text-white/60' : 'text-muted')}>{s.subtitle}</span>
                </span>
              </button>
              {i < steps.length - 1 && <span className="hidden h-px w-6 flex-shrink-0 bg-line md:block" />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Numbered section card ("1 Booking Details") ---------- */
export function SectionCard({ n, title, right, children, className }: { n?: number; title: ReactNode; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-card border border-line bg-white p-5 shadow-card sm:p-7', className)}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {n !== undefined && (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">{n}</span>
          )}
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

/* ---------- Sticky bottom bar ("Selected service … Continue") ---------- */
export function StickyBar({
  icon,
  label,
  title,
  extra,
  priceLabel,
  price,
  action,
}: {
  icon: ReactNode;
  label: string;
  title: ReactNode;
  extra?: ReactNode;
  priceLabel?: string;
  price?: ReactNode;
  action: ReactNode;
}) {
  return (
    <div className="fade-in fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <span className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-ink sm:flex">{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] text-muted sm:text-xs">{label}</div>
          <div className="truncate text-sm font-semibold sm:text-base">
            {title} {extra && <span className="hidden text-sm font-normal text-muted md:inline">{extra}</span>}
          </div>
        </div>
        {price !== undefined && (
          <div className="hidden text-right sm:block">
            <div className="text-[11px] text-muted">{priceLabel}</div>
            <div className="text-lg font-bold tabular-nums">{price}</div>
          </div>
        )}
        {action}
      </div>
    </div>
  );
}

/* ---------- Headings, crumbs, empty ---------- */
export function Crumbs({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
      {items.map((it, i) => (
        <Fragment key={it.label + i}>
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {it.onClick ? (
            <button onClick={it.onClick} className="transition hover:text-ink">
              {it.label}
            </button>
          ) : (
            <span className="font-medium text-ink">{it.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export function PageTitle({ title, subtitle, eyebrow, children }: { title: ReactNode; subtitle?: ReactNode; eyebrow?: ReactNode; children?: ReactNode }) {
  return (
    <div className="fade-up mx-auto max-w-2xl text-center">
      {eyebrow && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </div>
      )}
      <h1 className="text-4xl font-bold tracking-tight sm:text-[52px] sm:leading-[1.08]">{title}</h1>
      {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
      {children}
    </div>
  );
}

export function SectionHead({ title, subtitle, action, center }: { title: ReactNode; subtitle?: ReactNode; action?: ReactNode; center?: boolean }) {
  return (
    <div className={cn('flex flex-col gap-4', center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between')}>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]">{title}</h2>
        {subtitle && <p className="mt-3 text-muted sm:text-[17px]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyBox({ icon, title, text, action }: { icon: ReactNode; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-50/40">{icon}</div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      {text && <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
