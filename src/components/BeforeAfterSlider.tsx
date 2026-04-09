
'use client';
import { useState, useRef, useCallback } from 'react';

export function BeforeAfterSlider({ beforeSrc, afterSrc, height = 420 }: { beforeSrc: string; afterSrc: string; height?: number }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const update = useCallback((cx: number) => { const r = ref.current?.getBoundingClientRect(); if (r) setPos(Math.max(0, Math.min(100, ((cx - r.left) / r.width) * 100))); }, []);
  const down = (e: React.MouseEvent | React.TouchEvent) => { drag.current = true; update('touches' in e ? e.touches[0].clientX : e.clientX); };
  const move = (e: React.MouseEvent | React.TouchEvent) => { if (!drag.current) return; if ('touches' in e) e.preventDefault(); update('touches' in e ? e.touches[0].clientX : e.clientX); };
  const up = () => { drag.current = false; };
  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl cursor-ew-resize select-none w-full" style={{ height }} onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up} onTouchStart={down} onTouchMove={move} onTouchEnd={up}>
      <img src={afterSrc} alt="Après" className="w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}><img src={beforeSrc} alt="Avant" className="absolute inset-0 w-full h-full object-cover" style={{ width: ref.current?.offsetWidth || '100%' }} draggable={false} /></div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10 pointer-events-none shadow-lg" style={{ left: `${pos}%` }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center"><i className="fa-solid fa-arrows-left-right text-xs text-brand-500" /></div></div>
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-black/50 text-white backdrop-blur-sm">Avant</div>
      <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/90 text-white backdrop-blur-sm">Après</div>
    </div>
  );
}
