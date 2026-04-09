
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';

interface Ctx { user: User | null; credits: number; maxCredits: number; setAuth: (u: User, c: number, m: number) => void; clearAuth: () => void; updateCredits: (c: number, m: number) => void; }
const C = createContext<Ctx>({ user: null, credits: 0, maxCredits: 0, setAuth: () => {}, clearAuth: () => {}, updateCredits: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(0);
  const [maxCredits, setMax] = useState(0);

  useEffect(() => {
    try {
      const u = localStorage.getItem('rv-user'); const t = localStorage.getItem('rv-token');
      if (u && t) { setUser(JSON.parse(u)); fetchCreditsFromAPI(); }
    } catch {}
  }, []);

  const fetchCreditsFromAPI = async () => {
    try {
      const { fetchCredits } = await import('@/lib/api');
      const data = await fetchCredits();
      setCredits(data.credits); setMax(data.max);
    } catch { setCredits(0); setMax(0); }
  };

  const setAuth = (u: User, c: number, m: number) => { setUser(u); setCredits(c); setMax(m); localStorage.setItem('rv-user', JSON.stringify(u)); localStorage.setItem('rv-token', u.token); };
  const clearAuth = () => { setUser(null); setCredits(0); setMax(0); localStorage.removeItem('rv-user'); localStorage.removeItem('rv-token'); };
  const updateCredits = (c: number, m: number) => { setCredits(c); setMax(m); };

  return <C.Provider value={{ user, credits, maxCredits, setAuth, clearAuth, updateCredits }}>{children}</C.Provider>;
}
export const useAuth = () => useContext(C);
