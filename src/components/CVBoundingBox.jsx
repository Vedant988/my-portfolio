import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// CV Scanner Bounding Box Component
const CVBoundingBox = ({ children, label, confidence, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative inline-block cursor-none ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}

            <AnimatePresence>
                {isHovered && (
                    <>
                        {/* Bounding Box Frame */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            style={{ margin: '-8px', padding: '8px' }}
                        >
                            {/* Corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400" />

                            {/* Dotted Border */}
                            <div className="absolute inset-0 border border-dashed border-green-400/50" />
                        </motion.div>

                        {/* Detection Label */}
                        <motion.div
                            className="absolute -top-8 left-0 flex items-center gap-2 font-mono text-xs z-50"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                        >
                            <span className="bg-green-500 text-black px-2 py-0.5 font-semibold">
                                {label}
                            </span>
                            {confidence && (
                                <span className="text-green-400">
                                    {confidence}
                                </span>
                            )}
                        </motion.div>

                        {/* Scanning Line Effect */}
                        <motion.div
                            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent pointer-events-none"
                            initial={{ top: '0%' }}
                            animate={{ top: '100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CVBoundingBox;
