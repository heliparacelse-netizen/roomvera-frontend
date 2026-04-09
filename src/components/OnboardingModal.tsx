'use client';
import { useDesign } from '@/contexts/DesignContext';
import { DesignMode } from '@/lib/types';
import { useState } from 'react';

export function OnboardingModal() {
  const { onboarded, completeOnboarding } = useDesign();
  const [hovered, setHovered] = useState<DesignMode | null>(null);
  const options: { mode: DesignMode; title: string; sub: string; img: string; bg: string; txt: string; grad: string }[] = [
    { mode: 'minimal', title: 'Minimal & Clean', sub: 'Interface claire et lumineuse', img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&h=300&fit=crop', bg: '#FAFAF9', txt: '#1C1917', grad: 'linear-gradient(to top, #FAFAF9, transparent)' },
    { mode: 'immersive', title: 'Immersif & Créatif', sub: 'Ambiance sombre, focus visuel', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop', bg: '#1C1917', txt: '#FAFAF9', grad: 'linear-gradient(to top, #1C1917, transparent)' },
  ];

  if (onboarded) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fade-in" style={{ background: 'rgba(12,10,9,0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="w-full max-w-2xl animate-fade-up">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-400 mb-3">Bienvenue sur Roomvera</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">Choisissez votre expérience</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {options.map(o => (
            <button key={o.mode} onClick={() => completeOnboarding(o.mode)} onMouseEnter={() => setHovered(o.mode)} onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer p-0 text-left"
              style={{ borderColor: hovered === o.mode ? '#FB923C' : 'rgba(68,64,60,0.4)', background: o.bg, transform: hovered === o.mode ? 'scale(1.02)' : 'scale(1)' }}>
              <div className="h-48 relative overflow-hidden">
                <img src={o.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
                <div className="absolute inset-0" style={{ background: o.grad }} />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold mb-1" style={{ color: o.txt }}>{o.title}</h3>
                <p className="text-sm" style={{ color: o.txt === '#1C1917' ? '#78716C' : '#A8A29E' }}>{o.sub}</p>
                {hovered === o.mode && <div className="mt-3 px-4 py-2 rounded-lg text-xs font-bold text-white inline-flex items-center gap-1.5 animate-fade-in" style={{ background: '#F97316' }}><i className="fa-solid fa-check" />Choisir</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
