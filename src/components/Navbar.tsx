
'use client';
import { useState, useEffect } from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { useAuth } from '@/contexts/AuthContext';
import { useColors } from '@/hooks/useColors';
import { Logo } from './Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { label: 'Plateforme', href: '/plateforme' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'FAQ', href: '/faq' },
];

export function Navbar() {
  const { mode, setMode } = useDesign();
  const { user, credits, maxCredits } = useAuth();
  const c = useColors();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const low = user && credits <= 3 && credits > 0;
  
  useEffect(() => { const h = () => setScrolled(window.scrollY > 16); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300" style={{ background: scrolled ? (mode === 'immersive' ? 'rgba(12,10,9,0.82)' : 'rgba(250,250,249,0.82)') : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.06)' : 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 no-underline"><Logo /><span className="font-display text-xl font-bold" style={{ color: c.fg }}>Roomvera</span></Link>
        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors" style={{ color: pathname === l.href ? c.accent : c.fg2, background: pathname === l.href ? c.glow : 'transparent' }}>{l.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {user && <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold" style={{ background: low ? 'rgba(239,68,68,0.1)' : c.glow, color: low ? '#EF4444' : c.accent, border: `1px solid ${low ? 'rgba(239,68,68,0.2)' : c.border}` }}><i className="fa-solid fa-coins text-[10px]" />{credits}/{maxCredits === Infinity ? '∞' : maxCredits}</div>}
          <button onClick={() => setMode(mode === 'minimal' ? 'immersive' : 'minimal')} className="w-9 h-9 rounded-xl flex items-center justify-center border-none cursor-pointer" style={{ background: c.bg2, color: c.fg2 }} aria-label="Thème"><i className={`fa-solid ${mode === 'immersive' ? 'fa-sun' : 'fa-moon'} text-sm`} /></button>
          {user ? <span className="hidden sm:block text-sm font-medium" style={{ color: c.fg2 }}>{user.name}</span> : <Link href="/login" className="hidden sm:block px-4 py-2 rounded-xl text-sm font-semibold no-underline hover:-translate-y-0.5" style={{ background: c.accent, color: '#fff', boxShadow: `0 4px 16px ${c.glow}` }}>Connexion</Link>}
          <button onClick={() => setOpen(!open)} className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center border-none cursor-pointer" style={{ background: c.bg2, color: c.fg }}><i className={open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} /></button>
        </div>
      </div>
            <div className={`lg:hidden fixed top-16 right-0 bottom-0 w-72 p-6 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`} style={{ background: mode === 'immersive' ? '#1C1917' : '#FAFAF9', borderLeft: `1px solid ${c.border}` }}>
        <div className="flex flex-col gap-1">
          {LINKS.map(l => <Link key={l.href} href={l.href} className="px-4 py-3 rounded-xl text-sm font-medium no-underline" style={{ color: pathname === l.href ? c.accent : c.fg2 }}>{l.label}</Link>)}
          {!user && <Link href="/login" className="mt-4 text-center px-4 py-3 rounded-xl text-sm font-semibold no-underline" style={{ background: c.accent, color: '#fff' }}>Connexion</Link>}
        </div>
      </div>
    </nav>
  );
}
