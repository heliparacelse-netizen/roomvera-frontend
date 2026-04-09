// /roomvera-frontend/src/app/providers.tsx
'use client';
import { DesignProvider } from '@/contexts/DesignContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { useColors } from '@/hooks/useColors';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DesignProvider>
      <ThemeProviderWrapper>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </ThemeProviderWrapper>
    </DesignProvider>
  );
}

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const c = useColors();
  return <div style={{ background: c.bg, color: c.fg }} className="min-h-screen transition-colors duration-300">{children}</div>;
}
