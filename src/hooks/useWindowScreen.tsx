import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

/** window resize hooks */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 첫로드시 사이즈 set
    handler();

    window.addEventListener('resize', handler);

    // clean up
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return windowSize;
};
