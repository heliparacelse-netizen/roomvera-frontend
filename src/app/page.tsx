// /roomvera-frontend/src/app/page.tsx
'use client';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';
import { useColors } from '@/hooks/useColors';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { Glass } from '@/components/ui';
import { VideoSection } from '@/components/VideoSection';
import { ThreePlaceholder } from '@/components/ThreePlaceholder';

export default function HomePage() {
  const c = useColors(); const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();
  const tools = [
    { id: 'add-furniture', n: 'Ajouter du Mobilier', i: 'fa-couch', d: 'Meublez une pièce vide.' },
    { id: 'remove-object', n: 'Supprimer un Objet', i: 'fa-eraser', d: "Effacez un objet indésirable." },
    { id: 'style-swap', n: 'Changer de Style', i: 'fa-palette', d: 'Scandinave, industriel, bohème...' },
    { id: 'seasonal', n: 'Saisons et Météo', i: 'fa-cloud-sun', d: 'Été/hiver, jour/nuit.' },
    { id: 'declutter', n: 'Désencombrer', i: 'fa-broom', d: 'Obtenez une pièce vide.' },
    { id: 'materials', n: 'Matériaux', i: 'fa-brush', d: 'Changez murs et sols.' },
    { id: 'pool-water', n: 'Piscine et Eau', i: 'fa-water', d: "Remplissez une piscine." },
    { id: 'enhance', n: 'Amélioration', i: 'fa-wand-magic-sparkles', d: 'Super-résolution, netteté.' },
  ];

  return (
    <div>
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: c.glow }} /></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-up">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6">Réimaginez<br />vos espaces<br /><span style={{ color: c.accent }}>avec l&apos;IA</span></h1>
            <p className="text-lg mb-8 max-w-lg leading-relaxed" style={{ color: c.fg2 }}>Home staging virtuel, relooking, changements de style et d&apos;ambiance. 1 action = 1 crédit.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/plateforme" className="px-8 py-3.5 rounded-xl text-base font-semibold no-underline inline-flex items-center gap-2 hover:-translate-y-0.5" style={{ background: c.accent, color: '#fff', boxShadow: `0 8px 32px ${c.glow}` }}><i className="fa-solid fa-wand-magic-sparkles" />Essayer gratuitement</Link>
              <Link href="/tarifs" className="px-8 py-3.5 rounded-xl text-base font-semibold no-underline inline-block" style={{ background: c.bg2, color: c.fg }}>Voir les tarifs</Link>
            </div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}><BeforeAfterSlider beforeSrc="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop" afterSrc="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=500&fit=crop" height={420} /></div>
        </div>
      </section>

      <section className="py-20" ref={r1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 animate-fade-up"><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.accent }}>Fonctionnalités</span><h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4">8 outils IA</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" ref={r2}>
            {tools.map((t, i) => (
              <Link key={t.id} href={`/editeur/${t.id}`} className="group p-5 rounded-2xl no-underline transition-all hover:-translate-y-1 animate-fade-up" style={{ background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(20px)', animationDelay: `${i * 0.07}s` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: c.glow }}><i className={`fa-solid ${t.i}`} style={{ color: c.accent }} /></div>
                <h3 className="font-display text-sm font-bold mb-1.5" style={{ color: c.fg }}>{t.n}</h3>
                <p className="text-xs" style={{ color: c.muted }}>{t.d}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium mt-3" style={{ color: c.accent }}>Essayer<i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <VideoSection />

      <section className="py-20" ref={r3}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.accent }}>Aperçu 3D</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">Visualisez en 3D</h2>
        </div>
        <ThreePlaceholder />
      </section>
    </div>
  );
}
