// /roomvera-frontend/src/hooks/useColors.ts
'use client';
import { useDesign } from '@/contexts/DesignContext';
export const useColors = () => useDesign().colors;
