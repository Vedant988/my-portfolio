import React from 'react';

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
                <div className="relative">
                    {/* Fade gradients for scroll cues */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-neural-black to-transparent z-10 pointer-events-none md:hidden" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neural-black to-transparent z-10 pointer-events-none md:hidden" />

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide md:scrollbar-thin scrollbar-thumb-cyber-cyan/20 scrollbar-track-transparent"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {featuredProjects.map((project, idx) => (
                            <div key={idx} className="min-w-[85vw] md:min-w-[450px] snap-center">
                                <ProjectCard {...project} />
                            </div>
                        ))}

                        {/* "More" Card - Circular 3D Disc */}
                        {otherProjects.length > 0 && (
                            <div className="min-w-[300px] flex items-center justify-center snap-center p-8">
                                <ArchiveDisc count={otherProjects.length} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
