
'use client';
import { TEAM } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';
import { useColors } from '@/hooks/useColors';
import { Glass } from '@/components/ui';

export default function EquipePage() {
  const c = useColors(); const ref = useReveal();
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 animate-fade-up"><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.accent }}>Équipe</span><h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">L'équipe Roomvera</h1></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" ref={ref}>
          {TEAM.map((m, i) => (
            <Glass key={i} className="text-center p-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <img src={m.img} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" alt={m.name} />
              <h3 className="font-display text-base font-bold">{m.name}</h3>
              <p className="text-xs font-medium mb-3" style={{ color: c.accent }}>{m.role}</p>
              <p className="text-sm" style={{ color: c.muted }}>{m.bio}</p>
            </Glass>
          ))}
        </div>
      </div>
    </div>
  );
}
