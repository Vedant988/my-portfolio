import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const ArchiveDisc = ({ count }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-25deg", "25deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["25deg", "-25deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-neural-black border border-white/10 flex items-center justify-center cursor-pointer"
        >
            {/* Spinning Text Ring (Visual Effect) */}
            <div className="absolute inset-2 rounded-full border border-dashed border-white/5 animate-[spin_10s_linear_infinite] group-hover:border-white/20 transition-colors" />
            <div className="absolute inset-8 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Inner Content Floating in 3D */}
            <div
                className="text-center flex flex-col items-center justify-center"
                style={{ transform: "translateZ(30px)" }}
            >
                <div className="text-4xl md:text-5xl font-light text-white mb-2">
                    +{count}
                </div>
                <div className="text-xs font-mono tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors">
                    Archived Codes
                </div>

                <motion.div
                    className="mt-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowRight className="w-5 h-5" />
                </motion.div>
            </div>

            {/* Hover Glow */}
            <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-radial-gradient from-white to-transparent"
                style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)', transform: "translateZ(10px)" }}
            />
        </motion.div>
    );
};

export default ArchiveDisc;
