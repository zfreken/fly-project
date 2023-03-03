import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler, disable)=> {
    useEffect(
      () => {
        const listener = event => {
          if (!ref.current || ref.current.contains(event.target) || event.target.id === disable) {
            return;
          }
          handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      [ref, handler]
    );
  } 

