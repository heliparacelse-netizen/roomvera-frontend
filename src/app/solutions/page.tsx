'use client';
import { useColors } from '@/hooks/useColors';
import { Glass } from '@/components/ui';

export default function SolutionsPage() {
  const c = useColors();
  const solutions = [
    { icon: 'fa-building', title: 'Professionnels de l\'Immobilier', desc: 'Mettez en valeur les biens avec du home staging virtuel instantané.' },
    { icon: 'fa-compass-drafting', title: 'Architectes & Décorateurs', desc: 'Proposez plusieurs ambiances à vos clients sans déplacer un meuble.' },
    { icon: 'fa-house-chimney', title: 'Particuliers', desc: 'Testez des idées de rénovation avant de vous lancer dans les travaux.' },
    { icon: 'fa-camera', title: 'Agences de Communication', desc: 'Créez des visuels photoréalistes pour vos campagnes marketing.' },
  ];
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 animate-fade-up">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.accent }}>Solutions</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4">Pour chaque besoin</h1>
          <p className="max-w-2xl mx-auto" style={{ color: c.fg2 }}>Roomvera s'adapte aux professionnels comme aux particuliers.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((s, i) => (
            <Glass key={i} className="p-8 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: c.glow }}><i className={`fa-solid ${s.icon} text-xl`} style={{ color: c.accent }} /></div>
              <h3 className="font-display text-lg font-bold mb-2" style={{ color: c.fg }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: c.fg2 }}>{s.desc}</p>
            </Glass>
          ))}
        </div>
      </div>
    </div>
  );
}
