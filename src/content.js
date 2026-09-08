// ============================================
// PORTFOLIO CONTENT TEMPLATE
// ============================================
// Edit this file to customize your portfolio
// Fill in your personal information below

export const portfolioContent = {
    // ==========================================
    // PERSONAL INFORMATION
    // ==========================================
    personal: {
        name: "Vedant Badukale",
        tagline: "AI/ML Engineer • Edge AI • LLMs • Computer Vision",
        university: "Indian Institute of Information Technology Nagpur",
        year: "3rd Year",
        major: "Electronics & Telecommunications Engineering (IoT)",

        // Your introduction paragraph
        introduction: `Hello! I'm a B.Tech student at IIIT Nagpur specializing in AI/ML systems — 
    from edge-deployed computer vision to distributed LLM serving and agentic pipelines. 
    I build systems that ship to production.`,

        // Short bio for About section
        bio: `I'm pursuing B.Tech in Electronics & Telecommunications (IoT) at IIIT Nagpur, 
    but my focus is firmly in the AI/ML domain. I've shipped production systems at TiHAN-IIT Hyderabad — 
    from precision agriculture models on Hailo-8 accelerators to low-latency GStreamer pipelines. 
    I work across the full AI stack: model training, quantization, RAG architectures, 
    multi-agent systems, and distributed GPU inference. My goal is to build AI that's fast, reliable, and real.`,
    },

    // ==========================================
    // CONTACT & SOCIAL LINKS
    // ==========================================
    contact: {
        email: "vedantbadukale@gmail.com",
        github: "https://github.com/Vedant988",
        linkedin: "https://www.linkedin.com/in/vedant-badukale-887704283/",
        resume: "https://drive.google.com/file/d/1jasdobVVd5RqC3XclozXM4xSHybV2BTL/view?usp=sharing",
        portfolio: "https://vedant-portfolio-jade.vercel.app/",
    },

    // ==========================================
    // SKILLS & TECHNOLOGIES
    // ==========================================
    skills: {
        languages: ["Python", "C++", "C", "SQL", "Java", "JavaScript", "HTML", "CSS"],

        frameworks: [
            "PyTorch",
            "LangChain",
            "LlamaIndex",
            "HuggingFace",
            "Ultralytics (YOLO)",
            "vLLM",
            "FastAPI",
            "Node.js",
            "Playwright",
            "Surya OCR",
            "FAISS",
            "Pinecone",
            "scikit-learn",
            "NumPy/Pandas",
            "OpenCV",
        ],

        domains: [
            "Computer Vision",
            "Edge AI",
            "LLMs & RAG Pipelines",
            "Multi-Agent Systems",
            "Distributed GPU Inference",
            "Precision Agriculture AI",
            "Document Intelligence",
        ],

        tools: [
            "Docker",
            "Git/GitHub",
            "GStreamer",
            "systemd",
            "CUDA",
            "MLflow",
            "Redis",
            "Kafka",
            "CI/CD",
            "Cloudinary",
            "Linux",
        ],
    },

    // ==========================================
    // PROJECTS
    // ==========================================
    projects: [
        {
            title: "VLM OCR Benchmarking Engine",
            category: "Document AI • Evaluation Framework",
            description: `Architected an automated evaluation suite to benchmark layout-aware VLMs 
      against OmniDocBench and RealDoc-Bench. Measures reading-order recovery accuracy and 
      structured text extraction quality across diverse document layouts at scale.`,
            tech: ["Python", "VLMs", "OmniDocBench", "RealDoc-Bench", "FastAPI", "Evaluation Pipelines"],
            github: "https://github.com/Vedant988",
            demo: null,
            featured: true,
        },

        {
            title: "StructuRAG: Document Intelligence",
            category: "RAG • Document Processing",
            description: `Production-grade pipeline converting handwritten archives into structured Markdown 
      using Surya OCR and a hierarchical RAG architecture with semantic chunking. 
      Features an Auto-Merging Retriever and FastAPI layer for scalable, 
      LLM-powered query answering with visual grounding and full traceability.`,
            tech: ["Surya OCR", "LlamaIndex", "FastAPI", "RAG", "Python", "FAISS"],
            github: "https://github.com/Vedant988",
            demo: null,
            featured: true,
        },

        {
            title: "Web-Automi: Multi-Agent Web",
            category: "Agentic AI • Browser Automation",
            description: `Engineered a ReAct multi-agent pipeline using Set-of-Mark prompting and 
      Llama-4-scout-17b (VLM) to translate visual inputs into Playwright actions for 
      non-semantic page navigation. Includes a Playwright Stealth search fallback that 
      dynamically routes queries across engines and degrades to SERPs on CAPTCHA detection.`,
            tech: ["Llama-4-scout-17b", "Playwright", "ReAct", "VLM", "Python", "LangChain"],
            github: "https://github.com/Vedant988",
            demo: null,
            featured: true,
        },

        {
            title: "Distributed Tensor-Parallel Serving",
            category: "MLOps • Distributed Inference",
            description: `Deployed a low-latency vLLM server across dual NVIDIA T4 GPUs using Tensor 
      Parallelism. Optimized a 3-bucket memory allocation plan leveraging PagedAttention 
      to maximize throughput and minimize per-token latency under concurrent load.`,
            tech: ["vLLM", "CUDA", "Tensor Parallelism", "PagedAttention", "NVIDIA T4", "Python"],
            github: "https://github.com/Vedant988",
            demo: null,
            featured: false,
        },

        {
            title: "Precision Agriculture: Edge AI",
            category: "Computer Vision • Edge Deployment",
            description: `Constructed a dense object detection model for precision agriculture, 
      improving mAP by 8.4% over baseline. Spearheaded edge deployment on 
      Raspberry Pi 5B with Hailo-8 accelerators using INT8 Post-Training Quantization 
      for real-time inference at the field edge.`,
            tech: ["YOLO", "PyTorch", "Hailo-8", "INT8 PTQ", "Raspberry Pi 5B", "GStreamer"],
            github: "https://github.com/Vedant988",
            demo: null,
            featured: false,
        },

        {
            title: "PPE Detection Monitor",
            category: "Computer Vision • MERN Intelligence",
            description: `Automated PPE detection system using YOLOv8s and MERN stack. Trained for 350 epochs
      on a diverse Roboflow dataset, achieving 0.60 mAP@50 for robust real-time 
      laboratory safety compliance for scientists.`,
            tech: ["YOLOv8s", "PyTorch", "OpenCV", "React", "Node.js", "Roboflow"],
            github: "https://github.com/Vedant988/PPE-Compliance-Monitor",
            demo: null,
            featured: false,
        },
    ],

    // ==========================================
    // EXPERIENCE
    // ==========================================
    experience: [
        {
            title: "R&D AI Intern",
            company: "TiHAN — IIT Hyderabad",
            period: "Mar 2025 – Feb 2026",
            description: `Constructed a precision agriculture model for dense object detection, 
      improving mAP by 8.4%. Spearheaded edge deployment on Raspberry Pi 5B + Hailo-8 
      accelerators using INT8 Post-Training Quantization. Orchestrated a low-latency 
      GStreamer streaming pipeline achieving <0.6s RTSP latency, managing autonomous 
      boot-time operations via systemd and integrating Cloudinary APIs.`,
            skills: ["YOLO", "Edge AI", "Hailo-8", "GStreamer", "INT8 PTQ", "Python", "systemd"],
        },
    ],

    // ==========================================
    // EDUCATION
    // ==========================================
    education: [
        {
            degree: "B.Tech in Electronics and Telecommunications Engineering (IoT)",
            institution: "Indian Institute of Information Technology Nagpur",
            period: "Aug 2023 – May 2027",
            gpa: "7.9/10",
            relevant_courses: [
                "Computer Vision",
                "Machine Learning",
                "Deep Learning",
                "Edge AI & Embedded Systems",
                "Signal Processing",
                "Data Structures & Algorithms",
            ],
        },
    ],

    // ==========================================
    // ACHIEVEMENTS
    // ==========================================
    achievements: [
        {
            title: "IEEE ICDSINC 2025 — Research Publication",
            description: "Proposed paper on VGG16 architecture achieving 97.42% accuracy on the DeepFashion dataset.",
            icon: "🏆",
        },
        {
            title: "1st Place — Sankalp Bharat Hackathon",
            description: "AIML Hackathon at Palloti (SVPCET), ranked #1 out of 4000+ participants.",
            icon: "🥇",
        },
        {
            title: "1st Place — Market Wise Hackathon",
            description: "Computer Vision Hackathon at IIIT Nagpur, ranked #1 out of 800+ participants.",
            icon: "🥇",
        },
    ],
};
