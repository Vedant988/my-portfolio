import React, { useState } from 'react';
import { Terminal, X } from 'lucide-react';
import NeuralBackground from './components/NeuralBackground';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import CVCursor from './components/CVCursor';
import CVBoundingBox from './components/CVBoundingBox';
import { AnimatePresence, motion } from 'framer-motion';

import TerminalChat from './components/TerminalChat';

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [backendStatus, setBackendStatus] = useState('offline'); // 'offline' | 'pinging' | 'online'

    // Wake up the backend on load
    React.useEffect(() => {
        const wakeUpBackend = async () => {
            setBackendStatus('pinging');
            try {
                // Use environment variable or fallback to production URL if local is not set, 
                // but checking localhost by default for dev is safer.
                // However, user specifically wants to wake Render. 
                // We'll trust VITE_API_URL is set correctly in .env.
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

                const res = await fetch(`${API_URL}/status`);
                if (res.ok) {
                    setBackendStatus('online');
                } else {
                    setBackendStatus('offline');
                }
            } catch (error) {
                console.error("Backend wake-up failed:", error);
                setBackendStatus('offline');
            }
        };

        wakeUpBackend();

        // Optional: Keep alive or retry every 30s if offline? 
        // For now, just one initial wake up as requested.
    }, []);

    return (
        <div className="relative min-h-screen bg-neural-black text-slate-gray font-outfit selection:bg-cyber-cyan/30">
            {/* CV Cursor Effect */}
            <CVCursor />

            {/* Brand / Welcome Text */}
            <div className="absolute top-8 left-8 z-40">
                <h1 className="text-white/80 font-mono text-xs tracking-[0.3em] uppercase">
                    Portfolio_v3.0
                </h1>
                <div className="h-px w-8 bg-white/20 mt-2"></div>
            </div>

            {/* Hero Section with Neural Background */}
            <div className="relative">
                <div className="absolute inset-0 z-0">
                    <NeuralBackground paused={isChatOpen} />
                </div>
                <div className="relative z-10">
                    <Hero />
                </div>
            </div>

            {/* Content Sections */}
            <div className="relative z-10 bg-neural-black">
                <About />
                <Projects />

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-white/10">
                    <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
                        <p className="font-light text-sm text-gray-400">
                            Built with React, Tailwind CSS
                        </p>
                        <p className="font-mono text-xs text-gray-600 tracking-wider">
                            <span>© 2026</span> •
                            <span className="mx-2 text-green-500/80">status: operational</span> •
                            <span className="ml-2 text-gray-500">Made by Vedant Badukale</span>
                        </p>
                    </div>
                </footer>
            </div>

            {/* Floating Terminal Trigger */}
            <div className="fixed bottom-6 right-6 z-50">
                <CVBoundingBox label="NEURAL_LINK" confidence="99%">
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="bg-black/80 backdrop-blur-md border border-cyber-cyan/50 p-4 rounded-full shadow-lg hover:shadow-cyber-cyan/20 hover:scale-110 transition-all duration-300 group"
                    >
                        <Terminal className="w-6 h-6 text-cyber-cyan group-hover:text-white transition-colors" />
                    </button>
                </CVBoundingBox>
            </div>

            {/* Terminal Modal Overlay */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    >
                        {/* Close Overlay Click */}
                        <div
                            className="absolute inset-0"
                            onClick={() => setIsChatOpen(false)}
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl"
                        >
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <TerminalChat backendStatus={backendStatus} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
