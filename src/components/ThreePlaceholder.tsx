
'use client';
import { useColors } from '@/hooks/useColors';
export function ThreePlaceholder() {
  const c = useColors();
  return (
    <div className="w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center relative" style={{ height: '320px', background: c.bg2, border: `1px solid ${c.border}` }}>
      <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: c.glow }}><i className="fa-solid fa-cube text-2xl" style={{ color: c.accent }} /></div>
      <p className="font-display text-lg font-bold mb-1" style={{ color: c.fg }}>Aperçu 3D</p>
      <p className="text-sm" style={{ color: c.muted }}>Intégration Three.js en cours</p>
    </div>
  );
}
