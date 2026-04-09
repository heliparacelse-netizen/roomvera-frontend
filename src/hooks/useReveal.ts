
'use client';
import { useEffect, useRef } from 'react';
export function useReveal(t = 0.1) { const r = useRef<HTMLDivElement>(null); useEffect(() => { const el = r.current; if (!el) return; el.style.opacity = '0'; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('animate-fade-up'); o.unobserve(el); } }, { threshold: t }); o.observe(el); return () => o.disconnect(); }, [t]); return r; }
