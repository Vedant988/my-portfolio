import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BoundingBox from './BoundingBox';

const TerminalChat = ({ backendStatus = 'offline' }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: 'Neural Link Established.' },
        { type: 'system', text: 'Type a query to access Vedant\'s Knowledge Base.' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const bottomRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!input.trim()) return;

            const userCmd = input;
            setInput('');
            setIsProcessing(true);

            // 1. Add User Command to Log
            setHistory(prev => [...prev, { type: 'user', text: `> ${userCmd}` }]);

            // 2. The "Fake" Loading Sequence (The Visual Flex)
            const loadingSteps = [
                `$ pip install vedant-info --upgrade`,
                `> Resolving dependencies (PyTorch, RAG-Core)...`,
                `> [RAG] Embedding query vector...`,
                `> [RAG] Searching knowledge base...`,
                `> [LLM] Context injected. Generating response...`
            ];

            for (const step of loadingSteps) {
                await new Promise(r => setTimeout(r, 400)); // Delay for effect
                setHistory(prev => [...prev, { type: 'system', text: step }]);
            }

            // 3. Call the Python Backend
            try {
                // Vite exposes env vars via import.meta.env
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

                const response = await fetch(`${API_URL}/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: userCmd })
                });

                if (!response.body) throw new Error('No response body');

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let aiResponse = "";

                // Add placeholder for AI response
                setHistory(prev => [...prev, { type: 'ai', text: '...' }]);

                let lastUpdate = 0;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    aiResponse += chunk;

                    // Throttling: Update React state only every 50ms to prevent UI freeze
                    const now = Date.now();
                    if (now - lastUpdate > 50) {
                        setHistory(prev => {
                            const newHist = [...prev];
                            const lastMsg = newHist[newHist.length - 1];
                            if (lastMsg.type === 'ai') {
                                lastMsg.text = aiResponse;
                            }
                            return newHist;
                        });
                        lastUpdate = now;
                    }
                }

                // Final update to ensure complete message is shown
                setHistory(prev => {
                    const newHist = [...prev];
                    const lastMsg = newHist[newHist.length - 1];
                    if (lastMsg.type === 'ai') {
                        lastMsg.text = aiResponse;
                    }
                    return newHist;
                });
            } catch (err) {
                setHistory(prev => [...prev, { type: 'error', text: 'Error: Connection to Neural Core Failed. ensure backend is running on port 8000.' }]);
            }

            setIsProcessing(false);
        }
    };

    return (
        <BoundingBox label="TERMINAL_CHAT" className="w-full max-w-4xl mx-auto h-[500px] bg-black border border-gray-800 shadow-lg overflow-hidden flex flex-col font-mono text-sm">
            {/* Terminal Title Bar */}
            <div className="bg-gray-900/50 p-2 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                        <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
                        <div className="w-3 h-3 rounded-full bg-zinc-500"></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">vedant-ai -- bash -- 80x24</span>
                </div>

                {/* Connection Signal */}
                <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                        {backendStatus === 'pinging' ? 'INIT' : backendStatus}
                    </span>
                    <div className={`w-2.5 h-2.5 rounded-full ${backendStatus === 'online' ? 'bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.4)]' :
                        backendStatus === 'pinging' ? 'bg-yellow-500 animate-pulse' :
                            'bg-red-500'
                        }`} />
                </div>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {history.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-2 whitespace-pre-wrap ${line.type === 'user' ? 'text-gray-400 font-bold' :
                            line.type === 'system' ? 'text-gray-600 italic text-xs' :
                                line.type === 'ai' ? 'text-white' : 'text-gray-500 italic border-l-2 border-white/20 pl-2'
                            }`}
                    >
                        {line.text}
                    </motion.div>
                ))}
                {isProcessing && (
                    <div className="animate-pulse text-cyber-cyan">_</div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-gray-900/80 border-t border-gray-800 flex gap-2 items-center">
                <span className="text-cyber-cyan whitespace-nowrap">user@vedant-portfolio:~$</span>
                <input
                    className="bg-transparent outline-none text-white w-full font-mono placeholder-gray-700"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    disabled={isProcessing}
                    autoFocus
                    placeholder="Ask about skills, projects, or experience..."
                />
            </div>
        </BoundingBox>
    );
};

export default TerminalChat;
