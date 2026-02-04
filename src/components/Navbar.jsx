import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileText, Circle } from 'lucide-react';

const Navbar = () => {
    const [systemStatus, setSystemStatus] = useState({ system: 'initializing', hireable: false });
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        // Fetch status from backend
        const fetchStatus = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
                const response = await fetch(`${API_URL}/status`);
                const data = await response.json();
                setSystemStatus(data);
                setIsOnline(true);
            } catch (error) {
                console.error('Failed to fetch system status:', error);
                setIsOnline(false);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-neural-black/80 backdrop-blur-md border-b border-cyber-cyan/30"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo / Branding */}
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse-slow"></div>
                    <span className="font-mono text-cyber-cyan text-lg tracking-wider">NEURAL.SYS</span>
                </div>

                {/* System Status */}
                <div className="flex items-center space-x-3">
                    <Circle
                        className={`w-3 h-3 ${isOnline ? 'fill-green-500 text-green-500 animate-pulse-slow' : 'fill-red-500 text-red-500'}`}
                    />
                    <span className="font-mono text-sm text-slate-gray uppercase">
                        {isOnline ? 'System Online' : 'System Offline'}
                    </span>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
