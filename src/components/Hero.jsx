import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, FileText, ExternalLink } from 'lucide-react';
import CVBoundingBox from './CVBoundingBox';
import { portfolioContent } from '../content';

const SocialIcon = ({ href, icon: Icon, label, download = false }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download={download}
        className="group relative p-3 bg-black/50 backdrop-blur-md border border-gray-800 hover:border-cyber-cyan/50 rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label={label}
    >
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyber-cyan transition-colors" />
    </a>
);

const Hero = () => {
    const { contact, personal } = portfolioContent; // Destructure personal

    return (
        <section className="min-h-screen flex items-center justify-center px-6 relative">
            {/* Social Icons - Top Right */}
            <div className="absolute top-10 right-12 flex items-center gap-4 z-20">
                <div className="hidden sm:flex items-center gap-2 mr-4">
                    <span className="h-px w-8 bg-gray-700"></span>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Connect</span>
                </div>

                <div className="flex items-center gap-3">
                    {contact.github && (
                        <CVBoundingBox label="GITHUB" confidence="100%">
                            <SocialIcon
                                href={contact.github}
                                icon={Github}
                                label="GitHub"
                            />
                        </CVBoundingBox>
                    )}
                    {contact.linkedin && (
                        <CVBoundingBox label="LINKEDIN" confidence="100%">
                            <SocialIcon
                                href={contact.linkedin}
                                icon={Linkedin}
                                label="LinkedIn"
                            />
                        </CVBoundingBox>
                    )}
                    {contact.resume && (
                        <CVBoundingBox label="RESUME" confidence="100%">
                            <SocialIcon
                                href={contact.resume}
                                icon={FileText}
                                label="Resume"
                                download
                            />
                        </CVBoundingBox>
                    )}
                </div>
            </div>

            <div className="max-w-4xl w-full text-center">
                {/* Name with CV Bounding Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                >
                    <CVBoundingBox
                        label="NAME"
                        confidence="0.98"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-light text-white tracking-tight">
                            Vedant Badukale
                        </h1>
                    </CVBoundingBox>
                </motion.div>

                {/* College with CV Bounding Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <CVBoundingBox
                        label="INSTITUTION"
                        confidence="0.95"
                    >
                        <h2 className="text-sm sm:text-xl md:text-2xl text-gray-400 font-extralight px-4 tracking-wide">
                            {personal.university}
                        </h2>
                    </CVBoundingBox>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ArrowDown className="w-5 h-5 text-white/30" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
