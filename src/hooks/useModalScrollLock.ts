import { useEffect } from 'react';

export default function useModalScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.__openModalCount) window.__openModalCount = 0;

    if (isOpen) {
      window.__openModalCount += 1;
      if (window.__openModalCount === 1) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      if (isOpen) {
        if (window.__openModalCount) {
          window.__openModalCount -= 1;
          if (window.__openModalCount === 0) {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
          }
        }
      }
    };
  }, [isOpen]);
}

declare global {
  interface Window {
    __openModalCount?: number;
  }
}