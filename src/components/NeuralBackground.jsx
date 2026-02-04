import React, { useEffect, useRef } from 'react';

/**
 * NeuralBackground - Minimalist Neural Visualization
 * 
 * Design Philosophy: Classic Swiss Minimalism
 * - Monochromatic palette with precise gradations
 * - Refined geometry and mathematical precision
 * - Subtle depth through layering and opacity
 * - Restrained animation with purposeful timing
 * - Clean, breathable spatial composition
 */

const NeuralBackground = ({ paused }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef(null);
    const pausedRef = useRef(paused);

    useEffect(() => {
        pausedRef.current = paused;
    }, [paused]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;

        // ============================================
        // MINIMALIST CONFIGURATION
        // ============================================
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

        const CONFIG = {
            // Refined network topology - balanced and symmetric
            layers: isMobile
                ? [3, 6, 8, 6, 3]           // Mobile: Clean symmetry (26 nodes)
                : [4, 8, 12, 12, 8, 4],     // Desktop: Elegant density (48 nodes)

            // Neural dynamics - smooth and predictable
            firingThreshold: 0.6,
            potentialLeak: 0.88,
            refractoryPeriod: 18,

            // Learning parameters
            baseWeight: 0.45,
            learningRate: 0.08,
            weightDecay: 0.9996,

            // Interaction - gentle and responsive
            mouseRadius: 120,
            mouseInfluence: 0.4,

            // Inference timing - deliberate pacing
            inferenceInterval: 200,
            inputClusterSize: isMobile ? 2 : 3,
            propagationDelay: 140,
            predictionDuration: 80,

            // MONOCHROMATIC PALETTE - Classic minimal
            // Inspiration: Dieter Rams, Braun design, Swiss typography
            // MONOCHROMATIC PALETTE - Pure Dark
            // Inspiration: Dieter Rams, Braun design, Swiss typography
            bg: '0, 0, 0',                 // Pure Black
            nodeIdle: '40, 40, 40',        // Darker Gray (resting state)
            nodeActive: '180, 180, 180',   // Light gray (active)
            nodeHighlight: '240, 240, 240', // Near-white (peak)
            connection: '40, 40, 40',      // Subtle gray (connections)
            signal: '200, 200, 200',       // Bright gray (signals)
            accent: '255, 255, 255',       // Pure white (accents)
        };

        let nodes = [];
        let connections = [];
        let signals = [];
        let outputLayerStartIdx = 0;
        let inputLayerEndIdx = 0;

        let inferenceState = {
            phase: 'idle',
            timer: 0,
            activeInputs: [],
        };

        let imageInputParticles = [];

        // ============================================
        // NEURON CLASS - Minimalist Design
        // ============================================
        class Neuron {
            constructor(x, y, layer, indexInLayer) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.layer = layer;
                this.indexInLayer = indexInLayer;

                this.potential = 0;
                this.refractoryTimer = 0;
                this.accumulatedCharge = 0;

                // Subtle floating motion - barely perceptible
                this.floatPhase = Math.random() * Math.PI * 2;
                this.floatSpeed = 0.005 + Math.random() * 0.003;

                this.isWinner = false;
                this.isInputActive = false;
                this.hoverIntensity = 0;
            }

            receiveInput(amount) {
                if (this.refractoryTimer > 0) return;
                this.potential += amount;
                this.accumulatedCharge += amount;
            }

            update(isOutputLayer) {
                if (this.refractoryTimer > 0) {
                    this.refractoryTimer--;
                    this.potential = 0;
                    return false;
                }

                this.potential *= CONFIG.potentialLeak;
                this.accumulatedCharge *= 0.985;

                // Minimal floating motion - refined and gentle
                this.floatPhase += this.floatSpeed;
                this.x = this.originX + Math.sin(this.floatPhase) * 2;
                this.y = this.originY + Math.cos(this.floatPhase * 0.8) * 2;

                if (!isOutputLayer && this.potential >= CONFIG.firingThreshold) {
                    this.fire();
                    return true;
                }
                return false;
            }

            fire() {
                this.potential = 0;
                this.refractoryTimer = CONFIG.refractoryPeriod;
            }

            draw() {
                const intensity = Math.min(1, this.potential / CONFIG.firingThreshold);
                const isRefractory = this.refractoryTimer > 0;

                // ============================================
                // LAYER 1: BASE STATE (Always visible)
                // Swiss design principle: functional clarity
                // ============================================

                // Outer subtle glow - defines presence
                const baseGlow = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, 12
                );
                baseGlow.addColorStop(0, `rgba(${CONFIG.nodeIdle}, 0.15)`);
                baseGlow.addColorStop(0.7, `rgba(${CONFIG.nodeIdle}, 0.05)`);
                baseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = baseGlow;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
                ctx.fill();

                // Core dot - precise and minimal
                ctx.fillStyle = `rgba(${CONFIG.nodeIdle}, 0.4)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.2, 0, Math.PI * 2);
                ctx.fill();

                // ============================================
                // LAYER 2: INPUT ACTIVE STATE
                // Data loading visualization - geometric clarity
                // ============================================
                if (this.isInputActive) {
                    // Outer ring - precise boundary
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 22, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${CONFIG.nodeActive}, 0.2)`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();

                    // Inner ring - tighter focus
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${CONFIG.nodeActive}, 0.3)`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();

                    // Bright core - data presence
                    const coreGlow = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, 8
                    );
                    coreGlow.addColorStop(0, `rgba(${CONFIG.nodeHighlight}, 0.6)`);
                    coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.fillStyle = coreGlow;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
                    ctx.fill();

                    // Central dot
                    ctx.fillStyle = `rgba(${CONFIG.accent}, 0.8)`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
                    ctx.fill();

                    return;
                }

                // ============================================
                // LAYER 3: HOVER INTERACTION
                // Gentle, responsive feedback
                // ============================================
                if (this.hoverIntensity > 0) {
                    const h = this.hoverIntensity;

                    // Expanding glow on hover
                    const hoverGlow = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, 30
                    );
                    hoverGlow.addColorStop(0, `rgba(${CONFIG.nodeHighlight}, ${h * 0.2})`);
                    hoverGlow.addColorStop(0.5, `rgba(${CONFIG.nodeHighlight}, ${h * 0.1})`);
                    hoverGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.fillStyle = hoverGlow;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
                    ctx.fill();

                    // Enhanced core
                    ctx.fillStyle = `rgba(${CONFIG.nodeHighlight}, ${h * 0.5})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                }

                // ============================================
                // LAYER 4: WINNER STATE
                // Clear, confident visual hierarchy
                // ============================================
                if (this.isWinner) {
                    // Outer halo - subtle emphasis
                    const winGlow = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, 18
                    );
                    winGlow.addColorStop(0, `rgba(${CONFIG.accent}, 0.3)`);
                    winGlow.addColorStop(0.6, `rgba(${CONFIG.accent}, 0.08)`);
                    winGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.fillStyle = winGlow;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 18, 0, Math.PI * 2);
                    ctx.fill();

                    // Defining ring
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${CONFIG.accent}, 0.5)`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();

                    // Bright center
                    ctx.fillStyle = `rgba(${CONFIG.accent}, 0.9)`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
                    ctx.fill();

                    return;
                }

                // ============================================
                // LAYER 5: REFRACTORY (FIRED) STATE
                // Brief, clean flash
                // ============================================
                if (isRefractory) {
                    const flash = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, 8
                    );
                    flash.addColorStop(0, `rgba(${CONFIG.signal}, 0.4)`);
                    flash.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.fillStyle = flash;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = `rgba(${CONFIG.accent}, 0.8)`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                // ============================================
                // LAYER 6: CHARGING STATE
                // Gradual energy build-up
                // ============================================
                if (intensity > 0.08 && !isRefractory) {
                    const chargeGlow = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, 6
                    );
                    chargeGlow.addColorStop(0, `rgba(${CONFIG.nodeActive}, ${intensity * 0.3})`);
                    chargeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.fillStyle = chargeGlow;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // ============================================
        // SYNAPSE CLASS - Minimal Connections
        // ============================================
        class Synapse {
            constructor(from, to) {
                this.from = from;
                this.to = to;
                this.weight = CONFIG.baseWeight;
                this.activity = 0;
            }

            update() {
                this.weight = Math.max(CONFIG.baseWeight, this.weight * CONFIG.weightDecay);
                this.activity *= 0.9;
            }

            strengthen() {
                this.weight = Math.min(1.0, this.weight + CONFIG.learningRate);
                this.activity = 1.0;
            }

            draw() {
                // Extremely subtle background structure
                // Swiss design: structure should whisper, not shout
                ctx.beginPath();
                ctx.moveTo(this.from.x, this.from.y);
                ctx.lineTo(this.to.x, this.to.y);
                ctx.strokeStyle = `rgba(${CONFIG.connection}, 0.015)`;
                ctx.lineWidth = 0.3;
                ctx.stroke();
            }
        }

        // ============================================
        // ACTION POTENTIAL - Clean Signal Propagation
        // ============================================
        class ActionPotential {
            constructor(synapse) {
                this.synapse = synapse;
                this.progress = 0;
                this.speed = 0.6;  // Slower, more deliberate
                this.alive = true;
                this.trailLength = 25;
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 100) {
                    this.alive = false;
                    const charge = 0.65 * this.synapse.weight;
                    this.synapse.to.receiveInput(charge);
                    this.synapse.strengthen();

                    const lastLayerIdx = CONFIG.layers.length - 1;
                    if (this.synapse.to.layer === lastLayerIdx) {
                        computeOutputWinner();
                    }
                }
            }

            draw() {
                const t = this.progress / 100;
                const fromX = this.synapse.from.x;
                const fromY = this.synapse.from.y;
                const toX = this.synapse.to.x;
                const toY = this.synapse.to.y;

                const headX = fromX + (toX - fromX) * t;
                const headY = fromY + (toY - fromY) * t;

                const trailT = Math.max(0, (this.progress - this.trailLength) / 100);
                const tailX = fromX + (toX - fromX) * trailT;
                const tailY = fromY + (toY - fromY) * trailT;

                // Clean gradient trail
                const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                gradient.addColorStop(0.5, `rgba(${CONFIG.signal}, 0.2)`);
                gradient.addColorStop(1, `rgba(${CONFIG.accent}, 0.4)`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(headX, headY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Precise signal head
                ctx.beginPath();
                ctx.arc(headX, headY, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${CONFIG.accent}, 0.7)`;
                ctx.fill();
            }
        }

        // ============================================
        // WINNER COMPUTATION
        // ============================================
        const computeOutputWinner = () => {
            const outputNodes = nodes.slice(outputLayerStartIdx);
            const chargedNeurons = outputNodes.filter(n => n.accumulatedCharge > 0.15);

            outputNodes.forEach(n => n.isWinner = false);

            if (chargedNeurons.length > 0) {
                const randomIdx = Math.floor(Math.random() * chargedNeurons.length);
                chargedNeurons[randomIdx].isWinner = true;
            }
        };

        // ============================================
        // INFERENCE ORCHESTRATION
        // ============================================
        const startInference = () => {
            const inputNodes = nodes.slice(0, inputLayerEndIdx);
            const clusterStart = Math.floor(Math.random() * (inputNodes.length - CONFIG.inputClusterSize));

            inferenceState.activeInputs = [];

            const framesToImpact = 70;

            for (let i = 0; i < CONFIG.inputClusterSize; i++) {
                const node = inputNodes[clusterStart + i];
                inferenceState.activeInputs.push(node);

                // Synchronized particle convergence
                for (let p = 0; p < 2; p++) {
                    const startX = -60 - (p * 40);
                    const startY = node.y + (Math.random() - 0.5) * 60;

                    const dx = node.x - startX;
                    const dy = node.y - startY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    imageInputParticles.push({
                        startX,
                        startY,
                        targetX: node.x,
                        targetY: node.y,
                        progress: 0,
                        speed: 100 / framesToImpact,
                        node: node,
                        hasHit: false
                    });
                }
            }

            inferenceState.phase = 'input';
            inferenceState.timer = 110;
        };

        const updateInference = () => {
            inferenceState.timer--;

            if (inferenceState.phase === 'input' && inferenceState.timer <= 0) {
                inferenceState.activeInputs.forEach(n => n.isInputActive = false);
                inferenceState.phase = 'propagating';
                inferenceState.timer = CONFIG.propagationDelay;
            }

            if (inferenceState.phase === 'propagating' && inferenceState.timer <= 0) {
                inferenceState.phase = 'prediction';
                inferenceState.timer = CONFIG.predictionDuration;
            }

            if (inferenceState.phase === 'prediction' && inferenceState.timer <= 0) {
                nodes.slice(outputLayerStartIdx).forEach(n => n.isWinner = false);
                inferenceState.phase = 'idle';
            }
        };

        // ============================================
        // INITIALIZATION
        // ============================================
        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            nodes = [];
            connections = [];
            signals = [];

            const xStep = width / (CONFIG.layers.length + 1);
            let totalNodes = 0;

            CONFIG.layers.forEach((count, col) => {
                if (col === 0) inputLayerEndIdx = count;
                if (col === CONFIG.layers.length - 1) outputLayerStartIdx = totalNodes;

                // Vertical centering with balanced spacing
                let usableHeight = height;
                let yStart = 0;

                if (isMobile) {
                    const maxAspectRatio = 1.3;
                    const idealHeight = width * maxAspectRatio;
                    if (height > idealHeight) {
                        usableHeight = idealHeight;
                        yStart = (height - usableHeight) / 2;
                    }
                }

                const yStep = usableHeight / (count + 1);
                for (let i = 0; i < count; i++) {
                    const x = xStep * (col + 1);
                    const y = yStart + yStep * (i + 1);
                    nodes.push(new Neuron(x, y, col, i));
                }
                totalNodes += count;
            });

            // Connect layers with full connectivity
            let nodeIdx = 0;
            for (let c = 0; c < CONFIG.layers.length - 1; c++) {
                const currCount = CONFIG.layers[c];
                const nextCount = CONFIG.layers[c + 1];
                for (let i = 0; i < currCount; i++) {
                    for (let j = 0; j < nextCount; j++) {
                        connections.push(new Synapse(
                            nodes[nodeIdx + i],
                            nodes[nodeIdx + currCount + j]
                        ));
                    }
                }
                nodeIdx += currCount;
            }
        };

        // ============================================
        // ANIMATION LOOP
        // ============================================
        let frameCount = 0;

        const animate = () => {
            // Pause when off-screen or explicitly paused
            if (window.scrollY > window.innerHeight || pausedRef.current) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            frameCount++;
            const dpr = window.devicePixelRatio || 1;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const lastLayerIdx = CONFIG.layers.length - 1;

            // Automatic inference cycle
            if (inferenceState.phase === 'idle' && frameCount % CONFIG.inferenceInterval === 0) {
                startInference();
            }
            if (inferenceState.phase !== 'idle') {
                updateInference();
            }

            // Gentle hover interaction
            nodes.forEach(node => {
                node.hoverIntensity = 0;

                const dx = node.x - mx;
                const dy = node.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.mouseRadius) {
                    // Smooth falloff
                    const proximity = 1 - (dist / CONFIG.mouseRadius);
                    node.hoverIntensity = proximity * 0.8;
                }

                const isOutput = node.layer === lastLayerIdx;
                if (node.update(isOutput)) {
                    connections
                        .filter(c => c.from === node)
                        .forEach(c => signals.push(new ActionPotential(c)));
                }
            });

            // Draw connections (background layer)
            connections.forEach(c => { c.update(); c.draw(); });

            // Update and draw signals
            signals = signals.filter(s => s.alive);
            signals.forEach(s => { s.update(); s.draw(); });

            // Input particles (data stream)
            imageInputParticles = imageInputParticles.filter(p => {
                p.progress += p.speed;

                const t = Math.min(1, p.progress / 100);
                const x = p.startX + (p.targetX - p.startX) * t;
                const y = p.startY + (p.targetY - p.startY) * t;

                if (!p.hasHit && p.progress >= 95) {
                    p.hasHit = true;
                    p.node.receiveInput(1.0);
                    connections
                        .filter(c => c.from === p.node)
                        .forEach(c => signals.push(new ActionPotential(c)));
                    p.node.isInputActive = true;
                }

                // Minimal particle visualization
                const particleGlow = ctx.createRadialGradient(x, y, 0, x, y, 4);
                particleGlow.addColorStop(0, `rgba(${CONFIG.nodeActive}, 0.6)`);
                particleGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = particleGlow;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();

                // Precise center
                ctx.fillStyle = `rgba(${CONFIG.accent}, 0.8)`;
                ctx.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);

                return p.progress < 100;
            });

            // Draw nodes (foreground layer)
            nodes.forEach(node => node.draw());

            animationRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = e => {
            mouseRef.current = { x: e.pageX, y: e.pageY };
        };

        init();
        animate();

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 1,
                background: 'transparent' // Let body background show through
            }}
        />
    );
};

// Export config for potential external access
export const NeuralConfig = {
    description: "Minimalist neural network visualization inspired by Swiss design principles",
    palette: "Monochromatic grayscale with precise gradations",
    aesthetic: "Classic minimal - Dieter Rams, Braun, Swiss typography",
};

export default NeuralBackground;