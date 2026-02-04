import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BoundingBox = ({ children, label = 'DETECTED', className = '' }) => {
    const [displayText, setDisplayText] = useState('INITIALIZING...');
    const [isDetected, setIsDetected] = useState(false);

    const startDecoding = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_@#&";
        let iteration = 0;
        // Start with a small delay to match the visual "wipe" of the box
        setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayText(prev =>
                    label
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return label[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= label.length) {
                    clearInterval(interval);
                    setIsDetected(true);
                    setDisplayText(label); // Ensure exact match at end
                }

                iteration += 1 / 3; // Decodes 1 char every 3 ticks
            }, 30);
        }, 600); // 500ms(wipe) + 100ms(buffer)
    };

    return (
        <motion.div
            className={`relative p-8 ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onViewportEnter={startDecoding}
            transition={{
                duration: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96],
            }}
        >
            {/* Corner brackets */}
            <div className="corner corner-tl"></div>
            <div className="corner corner-tr"></div>
            <div className="corner corner-bl"></div>
            <div className="corner corner-br"></div>

            {/* Label tag with Scanning Delay */}
            <motion.div
                className={`absolute -top-3 left-4 bg-neural-black px-2 py-1 border transition-colors duration-500 ${isDetected ? 'border-cyber-cyan' : 'border-slate-gray/50'}`}
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            >
                <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isDetected ? 'bg-cyber-cyan' : 'bg-red-500 animate-pulse'}`}></span>
                    <span className={`text-xs font-mono uppercase tracking-wider transition-colors duration-300 ${isDetected ? 'text-cyber-cyan' : 'text-slate-gray'}`}>
                        {displayText}
                    </span>
                    {!isDetected && (
                        <span className="text-[10px] text-slate-gray/50 font-mono">
                            {Math.floor(Math.random() * 80)}%
                        </span>
                    )}
                </div>
            </motion.div>

            {/* Content */}
            {children}
        </motion.div>
    );
};

export default BoundingBox;
