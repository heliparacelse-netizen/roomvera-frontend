
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useColors } from '@/hooks/useColors';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function SignupPage() {
  const c = useColors(); const { setAuth } = useAuth(); const toast = useToast(); const router = useRouter();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false); const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!name) err.name = 'Requis';
    if (!email) err.email = 'Requis'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Invalide';
    if (!password) err.password = 'Requis'; else if (password.length < 6) err.password = '6 min.';
    setErrors(err); if (Object.keys(err).length) return;
    setLoading(true);
    try {
      const res = await signupAPI(name, email, password);
      setAuth({ email: res.user.email, name: res.user.name, token: res.token, plan: res.user.plan }, res.user.credits, res.user.maxCredits);
      toast('Bienvenue !', 'success'); router.push('/dashboard');
    } catch (e) { toast((e as Error).message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 animate-fade-up">
        <div className="rounded-2xl p-8 shadow-xl" style={{ background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(20px)' }}>
          <div className="text-center mb-6"><Logo size="lg" /><h1 className="font-display text-2xl font-bold mt-4">Créer un compte</h1><p className="text-sm mt-1" style={{ color: c.muted }}>3 crédits gratuits</p></div>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div><label className="block text-xs font-medium mb-1.5" style={{ color: c.fg2 }}>Nom</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: c.bg2, color: c.fg, border: `1px solid ${errors.name ? '#EF4444' : c.border}` }} />{errors.name && <p className="text-xs mt-1 text-red-500">{errors.name}</p>}</div>
            <div><label className="block text-xs font-medium mb-1.5" style={{ color: c.fg2 }}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: c.bg2, color: c.fg, border: `1px solid ${errors.email ? '#EF4444' : c.border}` }} />{errors.email && <p className="text-xs mt-1 text-red-500">{errors.email}</p>}</div>
            <div><label className="block text-xs font-medium mb-1.5" style={{ color: c.fg2 }}>Mot de passe</label>
              <div className="relative"><input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm outline-none" style={{ background: c.bg2, color: c.fg, border: `1px solid ${errors.password ? '#EF4444' : c.border}` }} /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 border-none cursor-pointer" style={{ background: 'none', color: c.muted }}><i className={`fa-solid ${showPw ? 'fa-eye-slash' : 'fa-eye'} text-sm` /></button></div>
              {errors.password && <p className="text-xs mt-1 text-red-500">{errors.password}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-sm font-semibold border-none cursor-pointer disabled:opacity-50 mt-2" style={{ background: c.accent, color: '#fff' }}>{loading ? <i className="fa-solid fa-spinner fa-spin" /> : "Créer mon compte"}</button>
          </form>
          <p className="text-sm text-center mt-6" style={{ color: c.muted }}>Déjà un compte ? <Link href="/login" className="font-semibold no-underline" style={{ color: c.accent }}>Connexion</Link></p>
        </div>
      </div>
    </div>
  );
}
