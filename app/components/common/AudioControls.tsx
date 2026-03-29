'use client';

import { useVaultStore } from "@stores";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";


const AudioControls = () => {
    const { isMuted, toggleMute } = useVaultStore();
    const isMobile = useIsMobile();
    const audioRef = useRef<HTMLAudioElement>(null);


    const [hasInteracted, setHasInteracted] = useState(false);


    // Initial play on FIRST interaction
    useEffect(() => {
        const startAudio = () => {
            if (!hasInteracted && audioRef.current) {
                // We wrap it in a promise check to handle the browser's sync play requirement
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setHasInteracted(true);
                            const events = ['click', 'touchstart', 'mousedown', 'keydown'];
                            events.forEach(event => window.removeEventListener(event, startAudio));
                        })
                        .catch(error => {
                            console.log("Autoplay prevented, waiting for stronger interaction:", error);
                        });
                }
            }
        };

        const events = ['click', 'touchstart', 'mousedown', 'keydown'];
        events.forEach(event => window.addEventListener(event, startAudio));

        return () => {
            events.forEach(event => window.removeEventListener(event, startAudio));
        };
    }, [hasInteracted]);

    // Handle Mute/Unmute Fading
    useEffect(() => {
        if (!audioRef.current) return;

        if (isMuted) {
            gsap.to(audioRef.current, { volume: 0, duration: 1.5, ease: "power2.inOut", onComplete: () => audioRef.current?.pause() });
        } else {
            if (hasInteracted) {
                audioRef.current.play();
                gsap.to(audioRef.current, { volume: 0.5, duration: 1.5, ease: "power2.inOut" });
            }
        }
    }, [isMuted, hasInteracted]);

    // Loop Fade Effect
    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const audio = audioRef.current;
        const fadeOutTime = 0.1; // Minimal fade to prevent pops

        // If near end of track, fade out and loop
        if (audio.currentTime > audio.duration - fadeOutTime && !isMuted) {
            gsap.to(audio, { volume: 0, duration: fadeOutTime, ease: "none" });
        }
    };

    const handleEnded = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        if (!isMuted) {
            // Faster fade in (0.5s) for a more seamless feel
            gsap.to(audioRef.current, { volume: 0.5, duration: 0.5, ease: "power1.out" });
        }
    };

    if (isMobile) return null;

    return (
        <div className="fixed top-8 left-8 z-50 flex items-center justify-center">
            <button 
                onClick={toggleMute}
                className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-all hover:bg-black/40 active:scale-95"
                title={isMuted ? "Unmute" : "Mute"}
            >
                <audio 
                    ref={audioRef}
                    src="/site-light.mp3"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    preload="auto"
                />
                
                {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70 transition-colors group-hover:text-white">
                        <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70 transition-colors group-hover:text-white">
                        <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 12C17.004 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </button>
        </div>
    );
};

export default AudioControls;
