'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DesignMode } from '@/lib/types';

const MINIMAL = { bg: '#FAFAF9', card: 'rgba(255,255,255,0.75)', border: 'rgba(231,229,228,0.5)', fg: '#1C1917', fg2: '#57534E', muted: '#A8A29E', accent: '#F97316', accentH: '#EA580C', glow: 'rgba(249,115,22,0.1)', bg2: '#F5F5F4' };
const IMMERSIVE = { bg: '#0C0A09', card: 'rgba(28,25,23,0.7)', border: 'rgba(68,64,60,0.4)', fg: '#FAFAF9', fg2: '#D6D3D1', muted: '#78716C', accent: '#FB923C', accentH: '#FDBA74', glow: 'rgba(251,146,60,0.08)', bg2: '#1C1917' };

interface Ctx { mode: DesignMode; setMode: (m: DesignMode) => void; onboarded: boolean; completeOnboarding: (m: DesignMode) => void; showDesignPicker: () => void; colors: typeof MINIMAL; }
const C = createContext<Ctx>({ mode: 'minimal', setMode: () => {}, onboarded: true, completeOnboarding: () => {}, showDesignPicker: () => {}, colors: MINIMAL });

export function DesignProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DesignMode>('minimal');
  const [onboarded, setOnboarded] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('rv-onboarded') === 'true';
  });

  useEffect(() => {
    const m = localStorage.getItem('rv-design') as DesignMode | null;
    if (m) setModeState(m);
  }, []);

  const setMode = (m: DesignMode) => { setModeState(m); localStorage.setItem('rv-design', m); document.documentElement.classList.toggle('dark', m === 'immersive'); };
  const completeOnboarding = (m: DesignMode) => { setMode(m); setOnboarded(true); localStorage.setItem('rv-onboarded', 'true'); };
  const showDesignPicker = () => setOnboarded(false);

  useEffect(() => { document.documentElement.classList.toggle('dark', mode === 'immersive'); }, [mode]);

  return <C.Provider value={{ mode, setMode, onboarded, completeOnboarding, showDesignPicker, colors: mode === 'immersive' ? IMMERSIVE : MINIMAL }}>{children}</C.Provider>;
}
export const useDesign = () => useContext(C);
