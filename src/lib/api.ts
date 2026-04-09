const API = process.env.NEXT_PUBLIC_API_URL || '';
const authHeaders = (): Record<string, string> => { const t = typeof window !== 'undefined' ? localStorage.getItem('rv-token') : null; return t ? { Authorization: `Bearer ${t}` } : {}; };

export async function generateImage(file: File, toolId: string, payload: Record<string, unknown> = {}): Promise<string> {
  const fd = new FormData(); fd.append('image', file); fd.append('payload', JSON.stringify(payload));
  const res = await fetch(`${API}/api/${toolId}`, { method: 'POST', headers: authHeaders(), body: fd });
  if (!res.ok) { const e = await res.json().catch(() => ({ message: 'Erreur réseau' })); throw new Error(e.message || `Erreur ${res.status}`); }
  return URL.createObjectURL(await res.blob());
}

export async function fetchCredits(): Promise<{ credits: number; max: number }> {
  const res = await fetch(`${API}/api/user/credits`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Non authentifié'); return res.json();
}

export async function fetchProjects(): Promise<Array<{ id: string; tool: string; src: string; resultSrc: string; date: string }>> {
  const res = await fetch(`${API}/api/user/projects`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Non authentifié'); return res.json();
}

export async function loginAPI(email: string, password: string) {
  const res = await fetch(`${API}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  if (!res.ok) { const e = await res.json().catch(() => ({ message: 'Erreur' })); throw new Error(e.message); } return res.json();
}

export async function signupAPI(name: string, email: string, password: string) {
  const res = await fetch(`${API}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
  if (!res.ok) { const e = await res.json().catch(() => ({ message: 'Erreur' })); throw new Error(e.message); } return res.json();
}

export async function forgotAPI(email: string) {
  const res = await fetch(`${API}/api/auth/forgot`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
  if (!res.ok) throw new Error('Erreur'); return res.json();
}

export async function checkoutAPI(planId: string) {
  const res = await fetch(`${API}/api/payment/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify({ planId }) });
  if (!res.ok) throw new Error('Erreur'); return res.json() as Promise<{ url: string }>;
}
