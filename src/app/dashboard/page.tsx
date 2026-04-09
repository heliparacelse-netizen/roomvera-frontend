// /roomvera-frontend/src/app/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useColors } from '@/hooks/useColors';
import { CreditBar } from '@/components/CreditBar';
import { EmptyState, Skeleton } from '@/components/ui';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { fetchProjects } from '@/lib/api';

export default function DashboardPage() {
  const { user } = useAuth(); const c = useColors();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true); setError('');
    fetchProjects().then(setProjects).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, [user]);

  if (!user) return (
    <div className="pt-32 pb-12 text-center"><div className="max-w-md mx-auto px-4 animate-fade-up">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: c.glow }}><i className="fa-solid fa-lock text-2xl" style={{ color: c.accent }} /></div>
      <h2 className="font-display text-2xl font-bold mb-3">Espace personnel</h2>
      <p className="text-sm mb-6" style={{ color: c.fg2 }}>Connectez-vous pour accéder à vos projets.</p>
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-semibold no-underline" style={{ background: c.accent, color: '#fff' }}>Se connecter</Link>
    </div></div>
  );

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6 animate-fade-up"><h1 className="font-display text-2xl font-bold">Mon Espace</h1></div>
        <CreditBar />
        {loading && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{[1,2,3].map(i => <Skeleton key={i} className="h-56" />)}</div>}
        {error && <div className="text-center py-12 text-red-500 text-sm">{error}</div>}
        {!loading && !error && projects.length === 0 && <EmptyState icon="fa-folder-open" title="Aucun projet" desc="Utilisez un outil IA pour créer votre premier projet." action={{ label: 'Explorer', href: '/plateforme' }} />}
        {!loading && projects.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <div key={p.id} className="rounded-2xl overflow-hidden animate-fade-up" style={{ background: c.card, border: `1px solid ${c.border}`, animationDelay: `${i * 0.08}s` }}>
                <div className="h-40 overflow-hidden"><img src={p.resultSrc || p.src} className="w-full h-full object-cover" alt={p.tool} /></div>
                <div className="p-4"><p className="text-sm font-semibold" style={{ color: c.fg }}>{p.tool}</p><p className="text-xs" style={{ color: c.muted }}>{p.date}</p></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
