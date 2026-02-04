import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

/**
 * ProjectCard - Classic Minimal Design
 * 
 * Design Philosophy:
 * - Swiss International Style typography
 * - Brutalist black & white palette
 * - Refined 3D tilt with restraint
 * - Purposeful animations (no decoration)
 * - Mathematical precision in spacing
 * - Content-first hierarchy
 */

const ProjectCard = ({
    title,
    category,
    description,
    tech,
    github,
    demo,
    imageUrl,
    index = 0
}) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // ============================================
    // 3D TILT - Refined & Subtle
    // ============================================
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Gentler spring for elegant motion
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

    // Reduced rotation angles for subtlety
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["8deg", "-8deg"]);

    // Optimized: Cache dimensions to avoid layout thrashing on every mouse move
    const rectRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouseMove = (e) => {
        if (!rectRef.current) return;

        const width = rectRef.current.width;
        const height = rectRef.current.height;
        const mouseX = e.clientX - rectRef.current.left;
        const mouseY = e.clientY - rectRef.current.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
        rectRef.current = null;
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
                willChange: "transform", // Hint to browser
            }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1], // Custom easing for Swiss elegance
                delay: index * 0.1 // Stagger effect
            }}
            className="group relative h-[520px] w-full bg-black rounded-none border border-white/[0.08] overflow-hidden"
        >
            {/* ============================================ */}
            {/* IMAGE LAYER - Deep in 3D space */}
            {/* ============================================ */}
            <motion.div
                className="absolute inset-0 h-full w-full"
                style={{ transform: "translateZ(-40px)" }}
            >
                {imageUrl ? (
                    <div className="relative h-full w-full">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-full w-full object-cover grayscale opacity-30 group-hover:opacity-20 transition-opacity duration-1000 ease-out"
                        />
                        {/* Scan Line Effect - Subtle retro reference */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
                    </div>
                ) : (
                    // Geometric Placeholder - Bauhaus inspired
                    <div className="flex h-full w-full items-center justify-center bg-[#000000]">
                        <div className="relative">
                            {/* Concentric squares - grid reference */}
                            <div className="w-40 h-40 border border-white/[0.06] absolute inset-0" />
                            <div className="w-32 h-32 border border-white/[0.08] absolute inset-0 m-auto" />
                            <div className="w-24 h-24 border border-white/[0.12] absolute inset-0 m-auto" />
                            <div className="w-16 h-16 bg-white/[0.02] absolute inset-0 m-auto" />
                        </div>
                    </div>
                )}

                {/* Multi-layer gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
            </motion.div>

            {/* ============================================ */}
            {/* GRID OVERLAY - Swiss design reference */}
            {/* ============================================ */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ transform: "translateZ(5px)" }}
            >
                {/* Subtle grid lines */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* ============================================ */}
            {/* CONTENT LAYER - Elevated in 3D space */}
            {/* ============================================ */}
            <div
                className="absolute inset-0 flex flex-col justify-between p-10"
                style={{ transform: "translateZ(20px)" }}
            >
                {/* ============================================ */}
                {/* HEADER SECTION */}
                {/* ============================================ */}
                <div className="space-y-6">
                    {/* Category Label - Helvetica inspired */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                    >
                        {/* Geometric marker */}
                        <div className="flex items-center gap-2">
                            <span className="h-[1px] w-12 bg-white/40 block" />
                            <span className="h-1.5 w-1.5 bg-white/40 block" />
                        </div>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-white/60 uppercase font-light">
                            {category || 'Project'}
                        </span>
                    </motion.div>

                    {/* Title - Large, airy, impactful */}
                    <motion.h3
                        className="text-4xl md:text-5xl font-extralight text-white tracking-tight leading-[1.1] max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1), duration: 0.8 }}
                    >
                        {title}
                    </motion.h3>
                </div>

                {/* ============================================ */}
                {/* FOOTER SECTION */}
                {/* ============================================ */}
                <div className="space-y-6">
                    {/* Description - Revealed on hover */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: isHovered ? 'auto' : 0,
                            opacity: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="border-l-[1px] border-white/20 pl-6 py-2">
                            <p className="text-sm text-gray-400 leading-relaxed font-light max-w-md">
                                {description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Tech Stack Pills */}
                    <motion.div
                        className="flex gap-2 flex-wrap"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
                    >
                        {tech.slice(0, 4).map((t, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (i * 0.05) + (index * 0.1) }}
                                className="text-[9px] font-mono border border-white/[0.15] px-3 py-1.5 text-gray-400 tracking-wider uppercase bg-white/[0.02]"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Actions Row - Clean separation */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
                        {/* Project Index Number - Swiss style */}
                        <motion.div
                            className="text-xs font-mono text-white/30 tracking-wider"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 + (index * 0.1) }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </motion.div>

                        {/* Action Links */}
                        <div className="flex gap-6 items-center">
                            {github && (
                                <motion.a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link relative"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Github className="w-5 h-5 text-white/40 group-hover/link:text-white transition-colors duration-300" />
                                    {/* Underline animation */}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover/link:w-full transition-all duration-300" />
                                </motion.a>
                            )}
                            {demo && (
                                <motion.a
                                    href={demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link relative flex items-center gap-2"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="text-xs font-mono tracking-wider text-white/40 group-hover/link:text-white transition-colors duration-300">
                                        VIEW
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/link:text-white transition-colors duration-300" />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================ */}
            {/* HOVER EFFECTS - Layered depth */}
            {/* ============================================ */}

            {/* Edge Light - Architectural accent */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ transform: "translateZ(25px)" }}
            >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Corner Accent - Minimal detail */}
            <div
                className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"
                style={{ transform: "translateZ(30px)" }}
            >
                <div className="absolute top-0 right-0 w-full h-[1px] bg-white/20" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-white/20" />
            </div>

            {/* Subtle shine effect - Restrained */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                    transform: "translateZ(2px)",
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 70%)'
                }}
            />
        </motion.div>
    );
};


// ============================================
// CSS KEYFRAMES (Removed for performance)
// ============================================
// const styles = ...;

export default ProjectCard;