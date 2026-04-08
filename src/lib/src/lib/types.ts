export interface Tool { id: string; name: string; icon: string; desc: string; cost: number; img: string; }
export interface FurnitureItem { id: string; name: string; price: string; affiliateUrl: string; w: number; h: number; svg: string; }
export interface PlacedFurniture extends FurnitureItem { uid: number; x: number; y: number; }
export interface StyleOption { id: string; name: string; color: string; }
export interface SeasonOption { id: string; name: string; icon: string; }
export interface Project { id: string; tool: string; src: string; resultSrc: string; date: string; }
export interface User { email: string; name: string; token: string; plan: string; }
export interface PricingPlan { id: string; name: string; price: number; period: string; credits: number; features: string[]; cta: string; popular: boolean; }
export type DesignMode = 'minimal' | 'immersive';
