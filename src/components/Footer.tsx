
'use client';
import Link from 'next/link';
import { useColors } from '@/hooks/useColors';
import { Logo } from './Logo';

export function Footer() {
  const c = useColors();
  return (
    <footer className="mt-24 pt-16 pb-8" style={{ background: c.bg2, borderTop: `1px solid ${c.border}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4"><Logo size="sm" /><span className="font-display text-lg font-bold" style={{ color: c.fg }}>Roomvera</span></div>
            <p className="text-sm leading-relaxed" style={{ color: c.muted }}>Transformez vos espaces avec l&apos;intelligence artificielle.</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4" style={{ color: c.fg }}>Plateforme</h4>
            <div className="flex flex-col gap-2">{[{ l: 'Ajouter du Mobilier', h: '/editeur/add-furniture' }, { l: 'Supprimer un Objet', h: '/editeur/remove-object' }, { l: 'Changer de Style', h: '/editeur/style-swap' }].map(l => <Link key={l.h} href={l.h} className="text-sm no-underline" style={{ color: c.muted }}>{l.l}</Link>)}</div>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4" style={{ color: c.fg }}>Entreprise</h4>
            <div className="flex flex-col gap-2">{[{ l: 'Tarifs', h: '/tarifs' }, { l: 'FAQ', h: '/faq' }, { l: 'Équipe', h: '/equipe' }].map(l => <Link key={l.h} href={l.h} className="text-sm no-underline" style={{ color: c.muted }}>{l.l}</Link>)}</div>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4" style={{ color: c.fg }}>Suivez-nous</h4>
            <div className="flex gap-2">{['fa-twitter','fa-instagram','fa-linkedin-in'].map(ic => <a key={ic} href="#" className="w-10 h-10 rounded-xl flex items-center justify-center no-underline" style={{ background: c.card, border: `1px solid ${c.border}`, color: c.muted }}><i className={`fa-brands ${ic}`} /></a>)}</div>
          </div>
        </div>
        <div className="pt-6 text-center text-xs" style={{ color: c.muted, borderTop: `1px solid ${c.border}` }}>2025 Roomvera. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
