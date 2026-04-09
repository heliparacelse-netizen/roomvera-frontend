
'use client';
import { useState } from 'react';
import { forgotAPI } from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import { useColors } from '@/hooks/useColors';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function ForgotPage() {
  const c = useColors(); const toast = useToast();
  const [email, setEmail] = useState(''); const [loading, setLoading] = useState(false); const [sent, setSent] = useState(false); const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Requis'); return; }
    setLoading(true); setError('');
    try { await forgotAPI(email); setSent(true); toast('Email envoyé', 'success'); } catch (e) { setError((e as Error).message); } finally { setLoading(false); }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 animate-fade-up">
        <div className="rounded-2xl p-8 shadow-xl" style={{ background: c.card, border: `1px solid ${c.border}` }}>
          <div className="text-center mb-6"><Logo size="lg" /><h1 className="font-display text-2xl font-bold mt-4">Mot de passe oublié</h1></div>
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}><i className="fa-solid fa-envelope-circle-check text-xl text-emerald-500" /></div>
              <p className="text-sm mb-4" style={{ color: c.fg2 }}>Si un compte existe, un lien a été envoyé.</p>
              <Link href="/login" className="text-sm font-semibold no-underline" style={{ color: c.accent }}>Retour</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div><label className="block text-xs font-medium mb-1.5" style={{ color: c.fg2 }}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: c.bg2, color: c.fg, border: `1px solid ${error ? '#EF4444' : c.border}` }} />{error && <p className="text-xs mt-1 text-red-500">{error}</p>}</div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-sm font-semibold border-none cursor-pointer disabled:opacity-50" style={{ background: c.accent, color: '#fff' }}>{loading ? <i className="fa-solid fa-spinner fa-spin" /> : 'Envoyer'}</button>
              <Link href="/login" className="text-sm text-center no-underline" style={{ color: c.muted }}><i className="fa-solid fa-arrow-left mr-1" />Retour</Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
