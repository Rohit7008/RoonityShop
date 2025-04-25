import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current viewport is mobile size
 * @param breakpoint The maximum width in pixels to consider as mobile (default: 767)
 * @returns boolean indicating if the viewport is mobile size
 */
export const useIsMobile = (breakpoint = 767): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Set initial value
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    
    // Check on mount
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [breakpoint]);

  return isMobile;
}; 