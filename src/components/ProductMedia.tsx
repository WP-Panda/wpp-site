import type { CSSProperties, ReactNode } from 'react';
import { CalendarCheck, Check, ClipboardList, Languages, Mail, Rocket, Shield, ShoppingCart, Zap, type LucideIcon } from 'lucide-react';
import type { PluginIcon, Product } from '../data';
import { cn } from '../utils/cn';

const icons: Record<PluginIcon, LucideIcon> = {
  rocket: Rocket,
  shield: Shield,
  zap: Zap,
  form: ClipboardList,
  cart: ShoppingCart,
  languages: Languages,
  calendar: CalendarCheck,
  mail: Mail,
};
export const pluginIcon = (p: Product) => icons[p.icon ?? 'rocket'];

/* container query units: всё масштабируется от ширины карточки */
const cq = (v: number) => `${v}cqw`;
const container: CSSProperties = { containerType: 'inline-size' };

/** Превью продукта: для тем — макет сайта в окне браузера, для плагинов — баннер с иконкой */
export function ProductMedia({ product, variant = 0, className }: { product: Product; variant?: number; className?: string }) {
  return (
    <div className={cn('relative aspect-[4/3] w-full overflow-hidden', className)} style={{ ...container, background: product.bg }}>
      <div className="dots-bg absolute inset-0 opacity-70" />
      {product.type === 'theme' ? (
        variant === 2 ? (
          <ThemeMobile p={product} />
        ) : (
          <Browser p={product}>{variant === 1 ? <ThemeInner p={product} /> : <ThemeHome p={product} />}</Browser>
        )
      ) : (
        <PluginArt p={product} />
      )}
    </div>
  );
}

/** Маленькая квадратная миниатюра (фото темы или иконка плагина) */
export function ProductThumb({ product: p, className }: { product: Product; className?: string }) {
  const Icon = pluginIcon(p);
  return (
    <div
      className={cn('relative flex flex-shrink-0 items-center justify-center overflow-hidden', className)}
      style={{ background: p.type === 'plugin' ? `linear-gradient(135deg, ${p.color}, ${p.color2})` : p.bg }}
    >
      {p.type === 'theme' ? (
        <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <Icon className="h-1/2 w-1/2 text-white" strokeWidth={1.8} />
      )}
    </div>
  );
}

function Browser({ p, children }: { p: Product; children: ReactNode }) {
  return (
    <div
      className="absolute overflow-hidden bg-white"
      style={{
        left: '8%',
        right: '8%',
        top: '15%',
        bottom: '-6%',
        borderRadius: `${cq(2.4)} ${cq(2.4)} 0 0`,
        boxShadow: '0 24px 48px -24px rgba(20,20,30,.45), 0 0 0 1px rgba(20,20,30,.06)',
      }}
    >
      <div className="flex items-center bg-[#F2F2F5]" style={{ height: cq(4.6), gap: cq(0.9), padding: `0 ${cq(1.8)}` }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <span key={c} className="flex-shrink-0 rounded-full" style={{ width: cq(1.2), height: cq(1.2), background: c }} />
        ))}
        <span className="mx-auto truncate rounded-full bg-white text-[#9a9aa5]" style={{ fontSize: cq(1.4), padding: `${cq(0.3)} ${cq(4)}` }}>
          {p.slug}.wppanda.demo
        </span>
      </div>
      {children}
    </div>
  );
}

function SiteNav({ p }: { p: Product }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: `${cq(2)} ${cq(3)}` }}>
      <span className="flex items-center font-bold text-[#141418]" style={{ fontSize: cq(2.4), gap: cq(0.8) }}>
        <span className="rounded-full" style={{ width: cq(2.2), height: cq(2.2), background: `linear-gradient(135deg, ${p.color}, ${p.color2})` }} />
        {p.name}
      </span>
      <span className="flex items-center text-[#6b6b76]" style={{ gap: cq(2.2), fontSize: cq(1.45) }}>
        <span>Главная</span>
        <span>Каталог</span>
        <span>О нас</span>
        <span className="rounded-full font-semibold text-white" style={{ background: p.color, padding: `${cq(0.7)} ${cq(1.8)}` }}>
          Связаться
        </span>
      </span>
    </div>
  );
}

function Lines({ p }: { p: Product }) {
  return (
    <div className="grid grid-cols-3" style={{ gap: cq(2), padding: `${cq(2.6)} ${cq(3)}` }}>
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <div className="rounded-full" style={{ width: cq(3.4), height: cq(3.4), background: p.bg, border: `${cq(0.3)} solid ${p.color}40` }} />
          <div className="rounded-full bg-[#1c1c21]" style={{ height: cq(1), width: '70%', marginTop: cq(1.4) }} />
          <div className="rounded-full bg-[#e7e7ec]" style={{ height: cq(0.8), width: '95%', marginTop: cq(1) }} />
          <div className="rounded-full bg-[#e7e7ec]" style={{ height: cq(0.8), width: '78%', marginTop: cq(0.7) }} />
        </div>
      ))}
    </div>
  );
}

function ThemeHome({ p }: { p: Product }) {
  return (
    <>
      <SiteNav p={p} />
      <div className="relative overflow-hidden" style={{ margin: `0 ${cq(3)}`, height: cq(34), borderRadius: cq(1.6) }}>
        <img src={p.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(10,10,15,.74) 0%, rgba(10,10,15,.35) 58%, rgba(10,10,15,.05) 100%)' }} />
        <div className="absolute text-white" style={{ left: cq(3.6), right: '36%', bottom: cq(4) }}>
          <div className="font-semibold uppercase opacity-80" style={{ fontSize: cq(1.25), letterSpacing: '.18em', marginBottom: cq(1) }}>
            {p.eyebrow}
          </div>
          <div className="font-bold" style={{ fontSize: cq(4), lineHeight: 1.08 }}>
            {p.heroTitle}
          </div>
          <div className="flex" style={{ gap: cq(1), marginTop: cq(2.2) }}>
            <span className="rounded-full font-semibold" style={{ background: p.color, fontSize: cq(1.4), padding: `${cq(0.9)} ${cq(2.2)}` }}>
              Подробнее
            </span>
            <span className="rounded-full border border-white/60" style={{ fontSize: cq(1.4), padding: `${cq(0.9)} ${cq(2.2)}` }}>
              Смотреть
            </span>
          </div>
        </div>
      </div>
      <Lines p={p} />
    </>
  );
}

function ThemeInner({ p }: { p: Product }) {
  const imgs = [p.image, p.image2, p.image2, p.image, p.image, p.image2];
  const pos = ['center', 'left', 'right', 'top', 'right', 'center'];
  return (
    <>
      <SiteNav p={p} />
      <div style={{ padding: `${cq(0.6)} ${cq(3)} 0` }}>
        <div className="font-semibold uppercase" style={{ fontSize: cq(1.2), letterSpacing: '.18em', color: p.color }}>
          {p.eyebrow}
        </div>
        <div className="font-bold text-[#141418]" style={{ fontSize: cq(3.2), marginTop: cq(0.5) }}>
          {p.innerTitle}
        </div>
      </div>
      <div className="grid grid-cols-3" style={{ gap: cq(1.6), padding: `${cq(2)} ${cq(3)}` }}>
        {imgs.map((src, i) => (
          <div key={i}>
            <div className="overflow-hidden" style={{ borderRadius: cq(1.2), height: cq(13.5) }}>
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: pos[i] }} />
            </div>
            <div className="rounded-full bg-[#1c1c21]" style={{ height: cq(0.9), width: '75%', marginTop: cq(1.1) }} />
            <div className="rounded-full" style={{ height: cq(0.9), width: '35%', marginTop: cq(0.8), background: p.color }} />
          </div>
        ))}
      </div>
    </>
  );
}

function Phone({ p, style, inner }: { p: Product; style: CSSProperties; inner?: boolean }) {
  return (
    <div
      className="absolute overflow-hidden bg-white"
      style={{ width: cq(27), height: cq(56), borderRadius: cq(4), border: `${cq(0.9)} solid #141418`, boxShadow: '0 30px 60px -25px rgba(20,20,30,.5)', ...style }}
    >
      <div className="mx-auto rounded-full bg-[#141418]" style={{ width: cq(8), height: cq(1.6), marginTop: cq(1) }} />
      <div className="flex items-center justify-between" style={{ padding: `${cq(1.4)} ${cq(2)}` }}>
        <span className="font-bold text-[#141418]" style={{ fontSize: cq(1.8) }}>
          {p.name}
        </span>
        <span className="flex flex-col" style={{ gap: cq(0.5) }}>
          {[0, 1, 2].map((i) => (
            <span key={i} className="block rounded-full bg-[#141418]" style={{ width: cq(2.2), height: cq(0.35) }} />
          ))}
        </span>
      </div>
      <div className="relative overflow-hidden" style={{ margin: `0 ${cq(1.6)}`, height: cq(22), borderRadius: cq(1.8) }}>
        <img src={inner ? p.image2 : p.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute font-bold text-white" style={{ left: cq(1.6), right: cq(1.6), bottom: cq(1.6), fontSize: cq(2.2), lineHeight: 1.1 }}>
          {inner ? p.innerTitle : p.heroTitle}
        </div>
      </div>
      <div style={{ padding: cq(1.6) }}>
        <div className="rounded-full text-center font-semibold text-white" style={{ background: p.color, fontSize: cq(1.4), padding: `${cq(1)} 0` }}>
          Подробнее
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center" style={{ gap: cq(1), marginTop: cq(1.4) }}>
            <div style={{ width: cq(5), height: cq(5), borderRadius: cq(1), background: p.bg }} />
            <div className="flex-1">
              <div className="rounded-full bg-[#1c1c21]" style={{ height: cq(0.8), width: '80%' }} />
              <div className="rounded-full bg-[#e7e7ec]" style={{ height: cq(0.7), width: '60%', marginTop: cq(0.7) }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeMobile({ p }: { p: Product }) {
  return (
    <>
      <Phone p={p} inner style={{ left: '21%', top: '17%', transform: 'rotate(-7deg)' }} />
      <Phone p={p} style={{ left: '49%', top: '11%' }} />
    </>
  );
}

function PluginArt({ p }: { p: Product }) {
  const Icon = pluginIcon(p);
  return (
    <>
      <div className="absolute rounded-full" style={{ width: cq(70), height: cq(70), right: cq(-22), top: cq(-28), background: p.color, opacity: 0.12 }} />
      <div className="absolute rounded-full" style={{ width: cq(42), height: cq(42), left: cq(-14), bottom: cq(-20), background: p.color2, opacity: 0.12 }} />
      <div
        className="absolute flex items-center justify-center text-white"
        style={{
          width: cq(26),
          height: cq(26),
          left: '50%',
          top: '42%',
          transform: 'translate(-50%, -50%)',
          borderRadius: cq(7),
          background: `linear-gradient(135deg, ${p.color}, ${p.color2})`,
          boxShadow: `0 ${cq(4)} ${cq(8)} -${cq(3)} ${p.color}AA`,
        }}
      >
        <Icon style={{ width: cq(12), height: cq(12) }} strokeWidth={1.8} />
      </div>
      {p.chips && (
        <>
          <div
            className="absolute flex items-center whitespace-nowrap rounded-full bg-white font-semibold text-[#1c1c21] shadow-lg"
            style={{ left: cq(6), bottom: cq(7), fontSize: cq(2.6), padding: `${cq(1.3)} ${cq(2.6)}`, gap: cq(1.2) }}
          >
            <span className="rounded-full bg-emerald-500" style={{ width: cq(1.8), height: cq(1.8) }} />
            {p.chips[0]}
          </div>
          <div
            className="absolute flex items-center whitespace-nowrap rounded-full bg-[#1c1c21] font-semibold text-white shadow-lg"
            style={{ right: cq(6), bottom: cq(17), fontSize: cq(2.6), padding: `${cq(1.3)} ${cq(2.6)}`, gap: cq(1) }}
          >
            <Check style={{ width: cq(2.6), height: cq(2.6), color: '#FFC21F' }} strokeWidth={3} />
            {p.chips[1]}
          </div>
        </>
      )}
    </>
  );
}
