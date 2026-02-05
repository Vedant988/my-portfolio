import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FolderOpen, Github, Code } from 'lucide-react';

const ArchiveDisc = ({ projects = [] }) => {
    // If we have few projects, duplicate them to create a nice ring effect
    const displayProjects = projects.length < 4
        ? [...projects, ...projects, ...projects, ...projects].slice(0, 8)
        : projects;

    const count = displayProjects.length;
    const radius = 160; // Distance from center
    const cardWidth = 140;

    // Calculate angle per card
    const angleStep = 360 / count;

    return (
        <div className="relative w-[300px] h-[300px] flex items-center justify-center perspective-1000">
            {/* Rotating Container */}
            <motion.div
                className="relative w-full h-full preserve-3d flex items-center justify-center p-10"
                animate={{ rotateY: 360 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Central "Core" or Label */}
                <div className="absolute inset-0 flex items-center justify-center z-10" style={{ transform: "translateZ(0px)" }}>
                    <div className="w-24 h-24 rounded-full bg-black/80 backdrop-blur-md border border-cyber-cyan/30 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                        <FolderOpen className="w-8 h-8 text-cyber-cyan mb-1" />
                        <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">Archive</span>
                        <span className="text-xs font-bold text-white">+{projects.length} More</span>
                    </div>
                </div>

                {/* Orbiting Cards */}
                {displayProjects.map((project, i) => {
                    const angle = i * angleStep;
                    // Calculate position on the circle (simple trigonometry not needed if we use rotateY + translateZ)

                    return (
                        <div
                            key={i}
                            className="absolute flex items-center justify-center"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* The Card Itself */}
                            <div className="w-[140px] h-[180px] bg-black/90 border border-white/10 rounded-xl p-3 flex flex-col justify-between hover:border-cyber-cyan/50 hover:bg-gray-900 transition-all group overflow-hidden shadow-2xl backface-visible">
                                {/* Top: Tech Icons or decorative */}
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-4 h-4 text-cyber-cyan" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-white text-sm font-bold leading-tight mb-1 line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 line-clamp-2">
                                        {project.tech.slice(0, 3).join(" • ")}
                                    </p>
                                </div>

                                {/* Bottom: Action / Link */}
                                <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                                    <Code className="w-3 h-3 text-gray-600" />
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[10px] bg-white/10 hover:bg-cyber-cyan hover:text-black text-white px-2 py-1 rounded transition-colors"
                                    >
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Floor Reflection / Shadow (Optional aesthetic touch) */}
            <div className="absolute -bottom-12 w-40 h-8 bg-cyber-cyan/20 blur-xl rounded-[100%] opacity-40 animate-pulse" />
        </div>
    );
};

export default ArchiveDisc;
