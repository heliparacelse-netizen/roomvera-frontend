
'use client';
import { useColors } from '@/hooks/useColors';
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const c = useColors(); const s = size === 'sm' ? 32 : size === 'lg' ? 48 : 38;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill={c.accent} />
      <path d="M14 34V18L24 14L34 18V34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M20 34V26H28V34" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="22" r="2" fill="#fff" />
    </svg>
  );
}
