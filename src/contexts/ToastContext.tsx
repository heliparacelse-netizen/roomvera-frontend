
'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
type T = 'success' | 'error' | 'info';
const C = createContext<(m: string, t?: T) => void>(() => {});
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Array<{id:number; msg:string; type:T}>>([]);
  const add = useCallback((msg: string, type: T = 'info') => {
    const id = Date.now(); setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return <C.Provider value={add}>{children}<div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">{toasts.map(t => (
    <div key={t.id} className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl text-sm font-medium text-white animate-slide-r ${t.type === 'success' ? 'bg-emerald-600' : t.type === 'error' ? 'bg-red-600' : 'bg-surface-800'}`}>{t.msg}</div>
  ))}</div></C.Provider>;
}
export const useToast = () => useContext(C);
