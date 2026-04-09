'use client';
import { useState } from 'react';
import { FAQ_DATA } from '@/lib/data';
import { useColors } from '@/hooks/useColors';
import { Glass } from '@/components/ui';

export default function FAQPage() {
  const c = useColors(); const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 animate-fade-up"><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.accent }}>FAQ</span><h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">Questions fréquentes</h1></div>
        <div className="space-y-3">
          {FAQ_DATA.map((f, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <Glass className="overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="text-sm font-semibold pr-4" style={{ color: c.fg }}>{f.q}</span>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform ${open === i ? 'rotate-180' : ''}`} style={{ color: c.muted }} />
                </button>
                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open === i ? '200px' : '0' }}><p className="px-5 pb-5 text-sm" style={{ color: c.fg2 }}>{f.a}</p></div>
              </Glass>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
