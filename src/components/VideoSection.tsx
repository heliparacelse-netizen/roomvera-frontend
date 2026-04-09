
'use client';
import { useColors } from '@/hooks/useColors';
import { useReveal } from '@/hooks/useReveal';
export function VideoSection() {
  const c = useColors(); const ref = useReveal();
  return (
    <section className="py-20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10"><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.accent }}>Expérience Immersive</span><h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-3" style={{ color: c.fg }}>Plongez dans votre futur espace</h2></div>
        <div className="rounded-2xl overflow-hidden relative group cursor-pointer" style={{ background: c.bg2, border: `1px solid ${c.border}`, aspectRatio: '16/9' }}>
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=675&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="" />
          <div className="absolute inset-0 flex items-center justify-center"><div className="w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'rgba(249,115,22,0.9)' }}><i className="fa-solid fa-play text-white text-xl ml-1" /></div></div>
        </div>
      </div>
    </section>
  );
}
