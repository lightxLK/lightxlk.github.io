'use client';

import { useState } from "react";

const Credits = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="fixed bottom-8 left-8 z-50 flex items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white/50 text-xs transition-colors hover:text-white cursor-help border border-white/5">
                ©
            </div>

            <div
                className={`pointer-events-none absolute bottom-10 left-0 w-64 rounded-lg bg-black/60 p-4 text-[10px] leading-relaxed text-white/80 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0 bubble-in' : 'opacity-0 translate-y-2'
                    }`}
            >
                <p className="mb-3 italic text-white/60">
                    With deepest gratitude to these incredible artists for their craft and for allowing me to take it forward. Your work is the soul of this experience.
                    <br />
                    <span className="mt-2 block font-bold text-white/40 text-right">- light</span>
                </p>
                <div className="space-y-2">
                    <div className="flex flex-col">
                        <span className="text-white/40 uppercase tracking-widest text-[8px]">Design by</span>
                        <a
                            href="https://www.linkedin.com/feed/update/urn:li:activity:7338226991042654208/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pointer-events-auto text-white hover:text-blue-400 transition-colors"
                        >
                            Mohit Virli, the Designer
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white/40 uppercase tracking-widest text-[8px]">Music by</span>
                        <a
                            href="https://youtu.be/xXkLY-RuytA?si=_ANtOJLRcrCvqjDc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pointer-events-auto text-white hover:text-red-400 transition-colors"
                        >
                            Sameer Hazarika (Guitar Cover)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Credits;
