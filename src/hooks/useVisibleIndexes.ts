import { useMemo } from 'react';
import { RENDER_BUFFER } from '../utils/constants';

export const useVisibleIndexes = (currentSlide: number, totalItems: number) => {
  return useMemo(() => {
    if (totalItems === 0) return new Set<number>();
    const start = Math.max(0, currentSlide - RENDER_BUFFER);
    const end = Math.min(totalItems - 1, currentSlide + RENDER_BUFFER);
    const indexes = [];
    for (let i = start; i <= end; i++) {
      indexes.push(i);
    }
    return new Set(indexes);
  }, [currentSlide, totalItems]);
};
