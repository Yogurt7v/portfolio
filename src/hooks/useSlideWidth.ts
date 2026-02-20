import { useLayoutEffect, useState } from 'react';
import { INITIAL_WIDTH } from '../utils/constants';

export const useSlideWidth = (
  containerRef: React.RefObject<HTMLElement>,
  isMobile: boolean,
  initialWidth = INITIAL_WIDTH,
) => {
  const [slideWidth, setSlideWidth] = useState(initialWidth);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const padding = isMobile ? 32 : 64;
        setSlideWidth(isMobile ? parentWidth - padding : initialWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [containerRef, isMobile, initialWidth]);

  return slideWidth;
};
