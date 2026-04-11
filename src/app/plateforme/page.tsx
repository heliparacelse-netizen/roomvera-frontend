'use client';
import Link from 'next/link';
import { TOOLS } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';
import { useColors } from '@/hooks/useColors';
import { Glass } from '@/components/ui';

export default function PlateformePage() {
  const c = useColors(); const ref = useReveal();
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 animate-fade-up"><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.accent }}>Plateforme</span><h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">8 outils IA</h1><p className="max-w-2xl mx-auto" style={{ color: c.fg2 }}>1 action = 1 crédit.</p></div>
        <div className="grid sm:grid-cols-2 gap-6" ref={ref}>
          {TOOLS.map((t, i) => (
            <Link key={t.id} href={`/editeur/${t.id}`} className="group overflow-hidden rounded-2xl no-underline transition-all hover:-translate-y-1 animate-fade-up" style={{ background: c.card, border: `1px solid ${c.border}`, animationDelay: `${i * 0.07}s` }}>
              <div className="relative h-48 overflow-hidden">
                <img src={t.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={t.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4"><div className="flex items-center gap-2 mb-1"><i className={`fa-solid ${t.icon} text-sm text-brand-300`} /><span className="text-white text-sm font-bold">{t.name}</span></div><p className="text-white/80 text-xs">{t.desc}</p></div>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/40 text-brand-300 backdrop-blur-sm">1 crédit</span>
              </div>
              <div className="p-4 flex items-center justify-between"><span className="text-sm font-medium" style={{ color: c.fg }}>Ouvrir</span><i className="fa-solid fa-arrow-right text-sm" style={{ color: c.accent }} /></div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 animate-fade-up">
          <Glass className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: c.glow }}><i className="fa-solid fa-cube text-2xl" style={{ color: c.accent }} /></div>
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: c.fg }}>Aperçu 3D</h3>
            <p className="text-sm mb-4" style={{ color: c.fg2 }}>Visualisez vos pièces générées en modèle 3D interactif.</p>
            <span className="text-xs font-semibold px-4 py-2 rounded-full inline-block" style={{ background: c.bg2, color: c.muted }}>Bientôt disponible (3 crédits)</span>
          </Glass>
        </div>
      </div>
    </div>
  );
}
