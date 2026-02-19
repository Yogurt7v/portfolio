import { useEffect, useState } from 'react';

export const useSlideWidth = (
  containerRef: React.RefObject<HTMLElement>,
  isMobile: boolean,
  initialWidth = 410,
) => {
  const [slideWidth, setSlideWidth] = useState(initialWidth);

  useEffect(() => {
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
