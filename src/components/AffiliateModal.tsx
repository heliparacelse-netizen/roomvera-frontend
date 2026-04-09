// /roomvera-frontend/src/components/AffiliateModal.tsx
'use client';
import { PlacedFurniture } from '@/lib/types';
import { useColors } from '@/hooks/useColors';

export function AffiliateModal({ item, onClose }: { item: PlacedFurniture; onClose: () => void }) {
  const c = useColors();
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-fade-in" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div className="rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-fade-up" style={{ background: c.bg === '#0C0A09' ? '#292524' : '#fff' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer" style={{ background: c.bg2, color: c.muted }}><i className="fa-solid fa-xmark text-sm" /></button>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: c.bg2 }}><svg viewBox={`0 0 ${item.w} ${item.h}`} className="w-12 h-12" dangerouslySetInnerHTML={{ __html: item.svg }} /></div>
          <div><h3 className="font-display text-lg font-bold" style={{ color: c.fg }}>{item.name}</h3><p className="text-xl font-bold" style={{ color: c.accent }}>{item.price}</p></div>
        </div>
        <button onClick={() => window.open(item.affiliateUrl, '_blank')} className="w-full py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer" style={{ background: c.accent, color: '#fff' }}><i className="fa-solid fa-cart-shopping mr-2" />Acheter</button>
      </div>
    </div>
  );
}
