import { useEffect, useState } from 'react';
import { isClient } from '~/utils/commonUtils';

/** scroll 방향 hooks */
export const useScrollDirection = () => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>();
  const [bodyOffset, setBodyOffset] = useState<DOMRect | null>(
    isClient() ? document.body.getBoundingClientRect() : null,
  );

  const listener = () => {
    if (isClient() && bodyOffset) {
      setBodyOffset(document.body.getBoundingClientRect());
      setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up');
      setLastScrollTop(-bodyOffset.top);
    }
  };

  // useEffect
  useEffect(() => {
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return {
    scrollDirection,
  };
};
