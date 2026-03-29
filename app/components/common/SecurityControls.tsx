'use client';

import { useVaultStore } from "@stores";
import { useEffect, useState } from "react";

const SecurityControls = () => {
    const { isLocked, toggleLock } = useVaultStore();
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Track key states for the combo
            const newPressed = new Set(pressedKeys);
            newPressed.add(e.key.toLowerCase());
            setPressedKeys(newPressed);

            // Combo Check: Alt + L + K
            if (e.altKey && newPressed.has('l') && newPressed.has('k')) {
                e.preventDefault();
                toggleLock();
                // Clear combo to prevent rapid toggling
                setPressedKeys(new Set());
                return;
            }

            // If Locked, block standard inspection shortcuts
            if (isLocked) {
                // F12
                if (e.key === 'F12') {
                    e.preventDefault();
                    return false;
                }
                
                // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
                if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
                    e.preventDefault();
                    return false;
                }
                
                // Ctrl+U (View Source)
                if (e.ctrlKey && e.key === 'u') {
                    e.preventDefault();
                    return false;
                }
                
                // Ctrl+S (Save)
                if (e.ctrlKey && e.key === 's') {
                    e.preventDefault();
                    return false;
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const newPressed = new Set(pressedKeys);
            newPressed.delete(e.key.toLowerCase());
            setPressedKeys(newPressed);
        };

        const handleContextMenu = (e: MouseEvent) => {
            if (isLocked) {
                e.preventDefault();
                return false;
            }
        };

        // Attach listeners
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [isLocked, pressedKeys, toggleLock]);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center pointer-events-none">
            <div 
                className={`transition-all duration-500 opacity-60 flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 backdrop-blur-md ${isLocked ? 'shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'shadow-[0_0_15px_rgba(34,197,94,0.15)]'}`}
                title={isLocked ? "Secure Vault Active" : "Vault Unlocked"}
            >
                {isLocked ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-400/80">
                        <path d="M12 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400/80">
                        <path d="M12 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10M17 10H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </div>
        </div>
    );
};

export default SecurityControls;
