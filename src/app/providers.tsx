'use client';
import { useState, useEffect, ReactNode } from 'react';
import { DesignProvider } from '@/contexts/DesignContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { useColors } from '@/hooks/useColors';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DesignProvider>
      <AuthProvider>
        <ToastProvider>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </ToastProvider>
      </AuthProvider>
    </DesignProvider>
  );
}

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const c = useColors();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // On n'applique pas les couleurs custom côté serveur pour éviter le crash React
  if (!mounted) {
    return <div className="min-h-screen transition-colors duration-300">{children}</div>;
  }

  return <div style={{ background: c.bg, color: c.fg }} className="min-h-screen transition-colors duration-300">{children}</div>;
}
