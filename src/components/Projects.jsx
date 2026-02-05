import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ArchiveDisc from './ArchiveDisc';
import { portfolioContent } from '../content';

const Projects = () => {
    const { projects } = portfolioContent;
    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    const scrollRef = React.useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="min-h-screen px-6 py-20 flex flex-col justify-center" id="projects">
            <div className="max-w-7xl mx-auto w-full">
                {/* Minimal Section Title */}
                <div className="mb-16 flex justify-between items-end">
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">
                            Projects
                        </h2>
                        <span className="text-sm font-mono text-gray-500">02</span>
                    </div>

                    {/* Navigation Buttons for Carousel */}
                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-white/10 hover:border-white hover:bg-white hover:text-black text-white transition-all flex items-center justify-center transform active:scale-95"
                        >
                            {'<'}
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-white/10 hover:border-white hover:bg-white hover:text-black text-white transition-all flex items-center justify-center transform active:scale-95"
                        >
                            {'>'}
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="relative group/carousel">
                    {/* Fade gradients - Adjusted for better visibility */}
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neural-black to-transparent z-10 pointer-events-none" />
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neural-black to-transparent z-10 pointer-events-none" />

                    {/* Mobile Scroll Hint - Animated Bounce Right */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 md:hidden pointer-events-none animate-pulse">
                        <div className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-lg flex flex-col items-center gap-1">
                            <span className="text-[10px] text-white/80 font-mono tracking-widest writing-vertical-rl rotate-180">SCROLL</span>
                            {/* Chevron Right */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyber-cyan animate-bounce-x">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-12 pt-4 px-6 md:px-0 snap-x snap-mandatory scrollbar-hide md:scrollbar-thin scrollbar-thumb-cyber-cyan/20 scrollbar-track-transparent perspective-1000"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', perspective: '1000px' }}
                    >
                        {featuredProjects.map((project, idx) => (
                            <div key={idx} className="min-w-[80vw] md:min-w-[450px] snap-center relative">
                                {/* Wrapper for 3D Entrance Animation */}
                                <motion.div
                                    initial={{ opacity: 0, x: 100, rotateY: -15, z: -50 }}
                                    whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{
                                        duration: 0.8,
                                        delay: idx * 0.1,
                                        ease: "easeOut"
                                    }}
                                    className="h-full"
                                >
                                    <ProjectCard {...project} index={idx} />
                                </motion.div>
                            </div>
                        ))}

                        {/* "More" Card - Circular 3D Disc */}
                        {otherProjects.length > 0 && (
                            <div className="min-w-[300px] flex items-center justify-center snap-center p-8 relative">
                                <motion.div
                                    initial={{ opacity: 0, x: 100, rotateY: -15, z: -50 }}
                                    whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{
                                        duration: 0.8,
                                        delay: featuredProjects.length * 0.1, // Delay after all projects
                                        ease: "easeOut"
                                    }}
                                >
                                    <ArchiveDisc count={otherProjects.length} />
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
