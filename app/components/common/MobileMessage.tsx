'use client';

import { useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";


const MobileMessage = () => {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if mobile and hasn't been dismissed in this session
    const isDismissed = sessionStorage.getItem('mobile-message-dismissed');
    if (isMobile && !isDismissed) {
      setShow(true);
    }
  }, [isMobile]);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem('mobile-message-dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] md:hidden">
      <div className="relative overflow-hidden rounded-2xl bg-black/40 p-4 shadow-2xl backdrop-blur-xl border border-white/10">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white/90">Experience Optimized for Desktop</h4>
            <p className="mt-1 text-xs leading-relaxed text-white/60">
              For the full 3D experience and immersive music, please switch to a laptop or desktop screen.
            </p>
          </div>
          <button 
            onClick={handleDismiss}
            className="rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white transition-all"
            aria-label="Dismiss"
          >
            {/* Using a simple X SVG since lucide-react might not be installed */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMessage;
