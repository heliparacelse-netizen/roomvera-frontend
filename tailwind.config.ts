// /roomvera-frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'], darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { display: ['Playfair Display', 'serif'], body: ['DM Sans', 'sans-serif'] },
      colors: {
        brand: { 50:'#FFF7ED',100:'#FFEDD5',200:'#FED7AA',300:'#FDBA74',400:'#FB923C',500:'#F97316',600:'#EA580C',700:'#C2410C' },
        surface: { 50:'#FAFAF9',100:'#F5F5F4',200:'#E7E5E4',300:'#D6D3D1',400:'#A8A29E',500:'#78716C',600:'#57534E',700:'#44403C',800:'#292524',900:'#1C1917',950:'#0C0A09' }
      },
      animation: { 'fade-up': 'fadeUp .6s ease both', 'fade-in': 'fadeIn .4s ease both', 'slide-r': 'slideR .4s ease both', 'pulse-soft': 'pulseSoft 2s ease-in-out infinite' },
      keyframes: { fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } }, fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } }, slideR: { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } }, pulseSoft: { '0%,100%': { opacity: '.6' }, '50%': { opacity: '1' } } }
    }
  }, plugins: [],
} satisfies Config;
