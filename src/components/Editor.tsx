
'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { PlacedFurniture, ApiError } from '@/lib/types';
import { TOOLS, FURNITURE, STYLES, SEASONS } from '@/lib/data';
import { generateImage } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useColors } from '@/hooks/useColors';
import { AILoader, ErrorDisplay, Btn } from './ui';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { AffiliateModal } from './AffiliateModal';

export function Editor({ toolId }: { toolId: string }) {
  const tool = TOOLS.find(t => t.id === toolId) || TOOLS[0];
  const { user, credits, updateCredits } = useAuth();
  const toast = useToast();
  const c = useColors();
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragItem = useRef<(typeof FURNITURE)[0] | null>(null);
  const dragOff = useRef({ x: 0, y: 0 });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [placed, setPlaced] = useState<PlacedFurniture[]>([]);
  const [selStyle, setSelStyle] = useState<string | null>(null);
  const [selSeason, setSelSeason] = useState<string | null>(null);
  const [maskMode, setMaskMode] = useState(false);
  const [brushSize, setBrushSize] = useState(30);
  const [drawing, setDrawing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [affItem, setAffItem] = useState<PlacedFurniture | null>(null);

  useEffect(() => { setResult(null); setError(null); setPlaced([]); setMaskMode(false); setSelStyle(null); setSelSeason(null); }, [toolId]);

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/')) { toast('Image invalide', 'error'); return; }
    if (f.size > 10485760) { toast('Max 10 Mo', 'error'); return; }
    setFile(f); const r = new FileReader(); r.onload = e => { setPreview(e.target?.result as string); setResult(null); setError(null); }; r.readAsDataURL(f);
  };

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };
  const onFurDrag = (e: React.DragEvent, item: (typeof FURNITURE)[0]) => { dragItem.current = item; e.dataTransfer.effectAllowed = 'copy'; };
  const onEdDrop = (e: React.DragEvent) => {
    e.preventDefault(); if (!dragItem.current || !editorRef.current) return;
    const rect = editorRef.current.getBoundingClientRect();
    setPlaced(p => [...p, { ...dragItem.current!, x: e.clientX - rect.left - dragItem.current!.w / 2, y: e.clientY - rect.top - dragItem.current!.h / 2, uid: Date.now() }]);
    dragItem.current = null;
  };
  const onPlDown = (e: React.MouseEvent, uid: number) => {
    e.stopPropagation(); const item = placed.find(f => f.uid === uid); if (!item || !editorRef.current) return;
    const rect = editorRef.current.getBoundingClientRect(); dragOff.current = { x: e.clientX - rect.left - item.x, y: e.clientY - rect.top - item.y };
    const mv = (ev: MouseEvent) => { const r = editorRef.current?.getBoundingClientRect(); if (r) setPlaced(p => p.map(f => f.uid === uid ? { ...f, x: ev.clientX - r.left - dragOff.current.x, y: ev.clientY - r.top - dragOff.current.y } : f)); };
    const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up);
  };

  useEffect(() => { if (!maskMode || !canvasRef.current || !editorRef.current) return; const cv = canvasRef.current; const rect = editorRef.current.getBoundingClientRect(); cv.width = rect.width; cv.height = rect.height; cv.getContext('2d')?.clearRect(0, 0, cv.width, cv.height); }, [maskMode, preview]);

  const drawMask = useCallback((e: React.MouseEvent) => {
    if (!drawing || !canvasRef.current || !editorRef.current) return;
    const rect = editorRef.current.getBoundingClientRect(); const ctx = canvasRef.current.getContext('2d'); if (!ctx) return;
    ctx.fillStyle = 'rgba(249,115,22,0.3)'; ctx.beginPath(); ctx.arc(e.clientX - rect.left, e.clientY - rect.top, brushSize, 0, Math.PI * 2); ctx.fill();
  }, [drawing, brushSize]);

  const generate = async () => {
    if (!user) { toast('Connectez-vous', 'error'); return; }
    if (credits < 1) { toast('Crédits insuffisants', 'error'); return; }
    if (!file) { toast('Uploadez une image', 'error'); return; }
    setLoading(true); setError(null); setResult(null);

    const payload: Record<string, unknown> = {};
    if (tool.id === 'add-furniture') payload.furniture = placed.map(f => ({ id: f.id, x: Math.round(f.x), y: Math.round(f.y) }));
    if (tool.id === 'style-swap' && selStyle) payload.style = selStyle;
    if (tool.id === 'seasonal' && selSeason) payload.season = selSeason;
    if ((tool.id === 'remove-object' || tool.id === 'declutter') && canvasRef.current) payload.mask = canvasRef.current.toDataURL('image/png');

    try {
      const url = await generateImage(file, toolId, payload);
      setResult(url); updateCredits(credits - 1, user.plan === 'agency' ? Infinity : (parseInt(localStorage.getItem('rv-max-credits') || '3')));
      toast('Image générée', 'success');
    } catch (err) { setError(err as ApiError); } finally { setLoading(false); }
  };

  const sidebar = () => {
    if (tool.id === 'add-furniture') return (
      <div className="p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.muted }}>Mobilier</h4>
        <div className="grid grid-cols-2 gap-2">{FURNITURE.map(f => (
          <div key={f.id} draggable onDragStart={e => onFurDrag(e, f)} className="p-2 rounded-xl cursor-grab active:cursor-grabbing text-center" style={{ background: c.bg2, border: `1px solid ${c.border}` }} title={`${f.name} — ${f.price}`}>
            <svg viewBox={`0 0 ${f.w} ${f.h}`} className="w-full h-10 mb-1" dangerouslySetInnerHTML={{ __html: f.svg }} />
            <span className="text-[10px] font-medium" style={{ color: c.fg2 }}>{f.name}</span>
          </div>
        ))}</div>
        <p className="text-[10px] text-center mt-3" style={{ color: c.muted }}>Glissez · Double-clic = prix</p>
        {placed.length > 0 && <button onClick={() => setPlaced([])} className="w-full mt-3 text-xs py-2 rounded-lg border-none cursor-pointer" style={{ background: c.bg2, color: c.muted }}><i className="fa-solid fa-trash-can mr-1" />Tout supprimer</button>}
      </div>
    );
    if (tool.id === 'remove-object' || tool.id === 'declutter') return (
      <div className="p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.muted }}>Masque</h4>
        <button onClick={() => setMaskMode(!maskMode)} className="w-full text-xs py-2.5 rounded-xl font-semibold border-none cursor-pointer" style={{ background: maskMode ? c.accent : c.bg2, color: maskMode ? '#fff' : c.fg2 }}>
          <i className={`fa-solid ${maskMode ? 'fa-pencil' : 'fa-draw-polygon'} mr-1.5`} />{maskMode ? 'Dessin actif' : 'Activer'}
        </button>
        <div className="mt-4"><label className="text-xs" style={{ color: c.fg2 }}>Pinceau: {brushSize}px</label><input type="range" min="10" max="80" value={brushSize} onChange={e => setBrushSize(+e.target.value)} className="w-full mt-1 accent-brand-500" /></div>
      </div>
    );
    if (tool.id === 'style-swap') return (
      <div className="p-4"><h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.muted }}>Styles</h4>
        <div className="space-y-2">{STYLES.map(s => (
          <button key={s.id} onClick={() => setSelStyle(selStyle === s.id ? null : s.id)} className="w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm border-none cursor-pointer" style={{ background: selStyle === s.id ? c.glow : c.bg2, color: selStyle === s.id ? c.accent : c.fg2, border: selStyle === s.id ? `1px solid ${c.accent}` : `1px solid ${c.border}` }}>
            <div className="w-8 h-8 rounded-lg" style={{ background: s.color }} /><span className="font-medium">{s.name}</span>
          </button>
        ))}</div>
      </div>
    );
    if (tool.id === 'seasonal') return (
      <div className="p-4"><h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.muted }}>Ambiance</h4>
        <div className="grid grid-cols-2 gap-2">{SEASONS.map(s => (
          <button key={s.id} onClick={() => setSelSeason(selSeason === s.id ? null : s.id)} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-none cursor-pointer" style={{ background: selSeason === s.id ? c.glow : c.bg2, border: selSeason === s.id ? `1px solid ${c.accent}` : `1px solid ${c.border}` }}>
            <i className={`fa-solid ${s.icon} text-lg`} style={{ color: selSeason === s.id ? c.accent : c.muted }} /><span className="text-xs font-medium" style={{ color: selSeason === s.id ? c.accent : c.fg2 }}>{s.name}</span>
          </button>
        ))}</div>
      </div>
    );
    return <div className="p-4"><p className="text-sm" style={{ color: c.fg2 }}>Uploadez puis générez.</p></div>;
  };

  return (
    <div className="pt-20 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 animate-fade-up">
          <a href="/plateforme" className="text-xs no-underline inline-flex items-center gap-1" style={{ color: c.muted }}><i className="fa-solid fa-arrow-left" />Retour</a>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.glow }}><i className={`fa-solid ${tool.icon}`} style={{ color: c.accent }} /></div>
            <div><h1 className="font-display text-2xl font-bold" style={{ color: c.fg }}>{tool.name}</h1><p className="text-sm" style={{ color: c.muted }}>1 crédit par génération</p></div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1 min-w-0">
            {!preview ? (
              <div className="rounded-2xl border-2 border-dashed min-h-[500px] flex flex-col items-center justify-center cursor-pointer" style={{ borderColor: c.border, background: c.bg2 }} onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={onDrop}>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: c.glow }}><i className="fa-solid fa-cloud-arrow-up text-2xl" style={{ color: c.accent }} /></div>
                <p className="font-semibold mb-1" style={{ color: c.fg }}>Glissez votre photo ici</p>
                <p className="text-sm" style={{ color: c.muted }}>ou cliquez pour parcourir · Max 10 Mo</p>
              </div>
            ) : result ? (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold" style={{ color: c.fg }}>Résultat</h3>
                  <div className="flex gap-2">
                    <Btn variant="secondary" onClick={() => setResult(null)}><i className="fa-solid fa-arrow-left mr-1.5" />Retour</Btn>
                    <Btn onClick={() => { const a = document.createElement('a'); a.href = result; a.download = 'roomvera-result.jpg'; a.click(); toast('Téléchargé', 'success'); }}><i className="fa-solid fa-download mr-1.5" />Télécharger</Btn>
                  </div>
                </div>
                <BeforeAfterSlider beforeSrc={preview} afterSrc={result} height={500} />
              </div>
            ) : (
              <div>
                <div ref={editorRef} className="relative rounded-2xl overflow-hidden min-h-[400px]" style={{ background: c.bg2 }} onDragOver={e => e.preventDefault()} onDrop={onEdDrop}>
                  <img src={preview} className="w-full block max-h-[600px] object-contain" alt="" draggable={false} />
                  {maskMode && <canvas ref={canvasRef} className="absolute inset-0 z-10 cursor-crosshair" onMouseDown={() => setDrawing(true)} onMouseUp={() => setDrawing(false)} onMouseLeave={() => setDrawing(false)} onMouseMove={drawMask} />}
                  {placed.map(f => (
                    <div key={f.uid} className="absolute cursor-move z-20 group" style={{ left: f.x, top: f.y, width: f.w, height: f.h }} onMouseDown={e => onPlDown(e, f.uid)} onDoubleClick={() => setAffItem(f)}>
                      <svg viewBox={`0 0 ${f.w} ${f.h}`} className="w-full h-full" dangerouslySetInnerHTML={{ __html: f.svg }} />
                      <button className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer" onClick={e => { e.stopPropagation(); setPlaced(p => p.filter(x => x.uid !== f.uid)); }}><i className="fa-solid fa-xmark" /></button>
                    </div>
                  ))}
                  {loading && <div className="absolute inset-0 z-30 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}><AILoader /></div>}
                </div>
                {error && <ErrorDisplay message={error.message} onRetry={generate} />}
                {!loading && !error && (
                  <div className="flex items-center justify-between mt-4 animate-fade-up">
                    <Btn variant="secondary" onClick={() => { setPreview(null); setFile(null); setPlaced([]); }}><i className="fa-solid fa-rotate-left mr-1.5" />Nouvelle photo</Btn>
                    <Btn onClick={generate}><i className="fa-solid fa-wand-magic-sparkles mr-1.5" />Générer (1 crédit)</Btn>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-full lg:w-72 shrink-0"><div className="rounded-2xl shadow-lg sticky top-20" style={{ background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(20px)' }}>{sidebar()}</div></div>
        </div>
        {affItem && <AffiliateModal item={affItem} onClose={() => setAffItem(null)} />}
      </div>
    </div>
  );
}
