import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Monitor, Smartphone, Tablet, X } from 'lucide-react';
import type { Product } from '../data';
import { cn } from '../utils/cn';
import { getSlides, ProductGallerySlide } from './GalleryModal';

const devices = [
  { id: 'desktop', label: 'Компьютер', icon: Monitor },
  { id: 'tablet', label: 'Планшет', icon: Tablet },
  { id: 'mobile', label: 'Смартфон', icon: Smartphone },
] as const;

export function ProductPreviewDialog({ product, onClose }: { product: Product; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [device, setDevice] = useState<(typeof devices)[number]['id']>('desktop');
  const [slide, setSlide] = useState(0);
  const slides = getSlides(product);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="product-preview-dialog"
      aria-labelledby="product-preview-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <h2 id="product-preview-title" className="truncate text-base font-bold">Предпросмотр {product.name}</h2>
          <p className="mt-0.5 text-xs text-muted">Демонстрационные экраны · v{product.version}</p>
        </div>
        <button type="button" autoFocus onClick={onClose} aria-label="Закрыть предпросмотр" className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line transition hover:bg-soft focus-visible:outline-2 focus-visible:outline-brand">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
        <div className="flex gap-1" role="group" aria-label="Размер экрана">
          {devices.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-pressed={device === item.id}
              onClick={() => {
                setDevice(item.id);
                if (product.type === 'theme') setSlide((previous) => item.id === 'mobile' ? 2 : previous === 2 ? 0 : previous);
              }}
              className={cn('flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors', device === item.id ? 'bg-ink text-white' : 'text-muted hover:bg-soft hover:text-ink')}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-muted">
          <span className="hidden sm:inline">Экран:</span>
          <select aria-label="Экран предпросмотра" value={slide} onChange={(event) => setSlide(Number(event.target.value))} className="h-9 max-w-[180px] rounded-lg border border-line bg-white px-3 text-xs text-ink outline-none focus:border-brand">
            {slides.map((item, index) => <option key={item.key} value={index}>{item.label}</option>)}
          </select>
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-auto overscroll-contain bg-soft p-3 sm:p-6">
        <div className="mx-auto overflow-hidden rounded-xl border border-line bg-white shadow-card transition-[width] duration-300" style={{ width: device === 'desktop' ? '100%' : device === 'tablet' ? 720 : 360, maxWidth: '100%' }}>
          <ProductGallerySlide product={product} index={slide} />
        </div>
      </div>
      <p className="flex-shrink-0 border-t border-line px-4 py-3 text-center text-[11px] text-muted sm:px-6">Выберите экран и размер устройства, чтобы рассмотреть продукт.</p>
    </dialog>,
    document.body,
  );
}