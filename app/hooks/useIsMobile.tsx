'use client';

import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // We use matchMedia for a more reliable check that doesn't depend on UA strings
    const mql = window.matchMedia('(max-width: 768px)');
    
    const onChange = () => {
      setIsMobile(mql.matches);
    };

    // Set initial value
    onChange();

    // Listen for changes (e.g., orientation change or resize)
    mql.addEventListener('change', onChange);
    
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
};
