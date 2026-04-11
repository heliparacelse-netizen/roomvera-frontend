import { Tool, FurnitureItem, StyleOption, SeasonOption, PricingPlan } from './types';
export const TOOLS: Tool[] = [
  { id: 'add-furniture', name: 'Ajouter du Mobilier', icon: 'fa-couch', desc: 'Meublez une pièce vide avec des meubles stylés.', cost: 1, img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=400&fit=crop' },
  { id: 'remove-object', name: 'Supprimer un Objet', icon: 'fa-eraser', desc: "Effacez n'importe quel objet indésirable.", cost: 1, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop' },
  { id: 'declutter', name: 'Désencombrer', icon: 'fa-broom', desc: 'Retirez tout le mobilier pour une pièce vide.', cost: 1, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop' },
  { id: 'style-swap', name: 'Changer de Style', icon: 'fa-palette', desc: "Transformez l'ambiance : scandinave, industriel...", cost: 1, img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&h=400&fit=crop' },
  { id: 'seasonal', name: 'Saisons et Météo', icon: 'fa-cloud-sun', desc: 'Été/hiver, jour/nuit, pluie/soleil.', cost: 1, img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop' },
  { id: 'materials', name: 'Matériaux', icon: 'fa-brush', desc: 'Changez murs et sols instantanément.', cost: 1, img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop' },
  { id: 'pool-water', name: 'Piscine et Eau', icon: 'fa-water', desc: "Remplissez une piscine vide.", cost: 1, img: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop' },
  { id: 'enhance', name: 'Amélioration Photo', icon: 'fa-wand-magic-sparkles', desc: 'Super-résolution, netteté, luminosité.', cost: 1, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop' },
];
export const FURNITURE: FurnitureItem[] = [
  { id: 'sofa', name: 'Canapé Milan', price: '1 290 €', affiliateUrl: '#aff', w: 120, h: 55, svg: '<rect x="5" y="20" width="110" height="35" rx="6" fill="#78716C"/><rect x="5" y="8" width="15" height="47" rx="5" fill="#57534E"/><rect x="100" y="8" width="15" height="47" rx="5" fill="#57534E"/>' },
  { id: 'armchair', name: 'Fauteuil Oslo', price: '590 €', affiliateUrl: '#aff', w: 55, h: 55, svg: '<rect x="8" y="18" width="40" height="32" rx="5" fill="#A8A29E"/><rect x="5" y="8" width="12" height="42" rx="5" fill="#78716C"/>' },
  { id: 'table', name: 'Table Lina', price: '349 €', affiliateUrl: '#aff', w: 70, h: 35, svg: '<rect x="5" y="5" width="60" height="6" rx="2" fill="#D6D3D1"/><rect x="10" y="11" width="5" height="18" rx="1" fill="#A8A29E"/><rect x="55" y="11" width="5" height="18" rx="1" fill="#A8A29E"/>' },
  { id: 'plant', name: 'Monstera', price: '79 €', affiliateUrl: '#aff', w: 40, h: 65, svg: '<rect x="10" y="40" width="20" height="22" rx="3" fill="#F97316"/><ellipse cx="20" cy="30" rx="16" ry="14" fill="#4ADE80"/>' },
];
export const STYLES: StyleOption[] = [
  { id: 'scandinave', name: 'Scandinave', color: '#E7E5E4' }, { id: 'industriel', name: 'Industriel', color: '#78716C' },
  { id: 'boheme', name: 'Bohème', color: '#A8A29E' }, { id: 'luxe', name: 'Luxe', color: '#44403C' },
];
export const SEASONS: SeasonOption[] = [
  { id: 'summer', name: 'Été', icon: 'fa-sun' }, { id: 'winter', name: 'Hiver', icon: 'fa-snowflake' },
  { id: 'autumn', name: 'Automne', icon: 'fa-leaf' }, { id: 'night', name: 'Nuit', icon: 'fa-moon' },
];
export const PRICING: PricingPlan[] = [
  { id: 'free', name: 'Découverte', price: 0, period: '', credits: 3, features: ['3 crédits', '5 outils', 'Résolution standard'], cta: 'Commencer', popular: false },
  { id: 'basic', name: 'Basic', price: 9.99, period: '/mois', credits: 50, features: ['50 crédits/mois', 'Tous les outils', 'Support email'], cta: "S'abonner", popular: false },
  { id: 'pro', name: 'Pro', price: 19.99, period: '/mois', credits: 150, features: ['150 crédits/mois', 'Résolution HD', 'Support prioritaire'], cta: "S'abonner", popular: true },
  { id: 'agency', name: 'Agency', price: 39.99, period: '/mois', credits: Infinity, features: ['Crédits illimités', 'Export 3D', 'API privée'], cta: 'Contacter', popular: false },
];
export const FAQ_DATA = [
  { q: 'Comment fonctionne la génération IA ?', a: "L'API backend traite votre image avec des modèles open-source et retourne le résultat." },
  { q: 'Comment fonctionnent les crédits ?', a: "1 action = 1 crédit. Chaque appel API déduit 1 crédit de votre compte." },
  { q: 'Puis-je utiliser les images commercialement ?', a: "Oui, avec les plans Pro et Agency." },
];
export const TEAM = [
  { name: 'Sophie Laurent', role: 'CEO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', bio: "Fondatrice de Roomvera." },
  { name: 'Marc Dubois', role: 'CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', bio: "Architecture technique." },
  { name: 'Léa Chen', role: 'Design', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', bio: "UX et interfaces." },
  { name: 'Thomas Bernard', role: 'Growth', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', bio: "Développement commercial." },
];
