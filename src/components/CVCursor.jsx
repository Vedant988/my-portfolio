import React, { useState, useEffect, useRef } from 'react';

const CVCursor = () => {
    const cursorRef = useRef(null);
    const gradientRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Use refs for values that change constantly to avoid re-renders
    const pos = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });
    const rafRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const animate = () => {
            // Linear interpolation for smooth movement
            pos.current.x += (target.current.x - pos.current.x) * 0.3;
            pos.current.y += (target.current.y - pos.current.y) * 0.3;

            // Direct DOM update - Zero React overhead
            if (cursorRef.current && gradientRef.current) {
                // Update crosshair
                cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;

                // Update coordinate text
                const coordText = cursorRef.current.querySelector('#cv-coords');
                if (coordText) {
                    coordText.innerText = `X: ${Math.round(pos.current.x)} Y: ${Math.round(pos.current.y)}`;
                }

                // Update gradient background
                gradientRef.current.style.background = `radial-gradient(circle 120px at ${pos.current.x}px ${pos.current.y}px, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 100%)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    // Mobile check
    if (typeof window !== 'undefined' && (window.matchMedia('(hover: none)').matches || window.innerWidth < 768)) {
        return null;
    }

    return (
        <>
            <style>{`
                body { cursor: none !important; }
                a, button, [role="button"] { cursor: none !important; }
            `}</style>

            {/* Flashlight/X-Ray Effect */}
            <div
                ref={gradientRef}
                className="pointer-events-none fixed inset-0 z-40"
                style={{
                    background: `radial-gradient(circle 120px at -100px -100px, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 100%)`
                }}
            />

            {/* Roboflow-style Annotation Crosshair */}
            <div
                ref={cursorRef}
                className="pointer-events-none fixed z-[100] will-change-transform"
                style={{
                    left: 0,
                    top: 0,
                    transform: 'translate3d(-100px, -100px, 0)'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24"
                    style={{ transform: 'translate(-50%, -50%)', position: 'absolute' }}
                >
                    <line x1="0" y1="12" x2="9" y2="12" stroke="#4ade80" strokeWidth="1.5" />
                    <line x1="15" y1="12" x2="24" y2="12" stroke="#4ade80" strokeWidth="1.5" />
                    <line x1="12" y1="0" x2="12" y2="9" stroke="#4ade80" strokeWidth="1.5" />
                    <line x1="12" y1="15" x2="12" y2="24" stroke="#4ade80" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2" fill="#4ade80" />
                </svg>

                {/* Coordinates */}
                <div className="absolute top-2 left-6">
                    <div id="cv-coords" className="bg-black/50 backdrop-blur-md border border-cyber-cyan/50 px-2 py-1 rounded text-[10px] font-mono text-cyber-cyan whitespace-nowrap">
                        X: 0 Y: 0
                    </div>
                </div>
            </div>
        </>
    );
};

export default CVCursor;
