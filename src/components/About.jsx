import React from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../content';

const About = () => {
    const { personal, skills } = portfolioContent;

    return (
        <section className="min-h-screen px-6 py-32" id="about">
            <div className="max-w-6xl mx-auto">
                {/* Minimal Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 flex items-baseline gap-4"
                >
                    <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">
                        About
                    </h2>
                    <span className="text-sm font-mono text-gray-500">01</span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                    {/* Column 1: Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Profile
                        </h3>

                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-12">
                            {personal.bio}
                        </p>

                        <div className="space-y-6 border-l border-white/10 pl-6 mt-12">
                            <div className="grid grid-cols-[120px_1fr] gap-2 text-base font-light tracking-wide">
                                <span className="text-gray-500 uppercase text-xs tracking-widest pt-1">University</span>
                                <span className="text-white leading-relaxed">{personal.university}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-2 text-base font-light tracking-wide">
                                <span className="text-gray-500 uppercase text-xs tracking-widest pt-1">Focus</span>
                                <span className="text-white leading-relaxed">{personal.tagline}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-2 text-base font-light tracking-wide">
                                <span className="text-gray-500 uppercase text-xs tracking-widest pt-1">Status</span>
                                <span className="text-white leading-relaxed">{personal.year}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 2: Skills - Elegant List */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
                            <span className="w-2 h-2 border border-white rounded-full"></span>
                            Expertise
                        </h3>

                        <div className="space-y-12">
                            {/* Domains */}
                            <div>
                                <h4 className="text-white text-lg font-light mb-6 border-b border-white/10 pb-2 inline-block">
                                    Core Domains
                                </h4>
                                <ul className="space-y-3">
                                    {skills.domains.map((domain, i) => (
                                        <li key={i} className="flex items-center justify-between group cursor-default">
                                            <span className="text-gray-400 group-hover:text-white transition-colors text-lg font-light">
                                                {domain}
                                            </span>
                                            <span className="text-xs font-mono text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                0{i + 1}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tech Stack - Minimal Tags */}
                            <div>
                                <h4 className="text-white text-lg font-light mb-6 border-b border-white/10 pb-2 inline-block">
                                    Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills.frameworks.map((fw, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-sm text-gray-300 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300"
                                        >
                                            {fw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
