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
        name: "Vedant Badukale",                    // Your full name
        tagline: "Python Backend, Computer Vision, GenAI, AI, Edge AI",  // Your main title
        university: "Indian Institute of Information Technology Nagpur", // Updated
        year: "3rd Year",                     // e.g., "3rd Year", "Final Year", "Graduate"
        major: "Electronics & Communication Eng.", // Your major

        // Your introduction paragraph (2-3 sentences)
        introduction: `Hello! I'm an Electronics & Communication Engineering student. I specialize in Computer Vision, Edge AI, 
    and Python backend development to build robust robotics and data-driven solutions.`,

        // Short bio for About section
        bio: `I am currently pursuing my degree in Electronics & Communication Engineering, 
    but my passion lies heavily in the software domain. I focus on building scalable 
    Python backends, developing Computer Vision systems, and working on Data Analysis 
    platforms. My goal is to bridge software and hardware through Edge AI and Robotics.`,
    },

    // ==========================================
    // CONTACT & SOCIAL LINKS
    // ==========================================
    contact: {
        email: "your.email@university.edu",
        github: "https://github.com/Vedant988",
        linkedin: "https://www.linkedin.com/in/vedant-badukale-887704283/",
        resume: "https://drive.google.com/file/d/1jasdobVVd5RqC3XclozXM4xSHybV2BTL/view?usp=sharing",
        portfolio: "https://yourportfolio.com",  // Optional
    },

    // ==========================================
    // SKILLS & TECHNOLOGIES
    // ==========================================
    skills: {
        languages: ["Python", "C++", "JavaScript", "MATLAB"],

        frameworks: [
            "PyTorch",
            "TensorFlow",
            "OpenCV",
            "Vision Transformers (ViT)",
            "HuggingFace",
            "LangChain/LlamaIndex",
            "Ollama",
            "Ultralytics",
            "Albumentations",
            "ROS/ROS2",
            "scikit-learn",
            "NumPy/Pandas",
            "FastAPI"
        ],

        domains: [
            "Computer Vision",
            "Robotics",
            "Python Backend",
            "Data Processing",
            "Backend Management at large scale",
            "Deep Learning",
            "Edge AI"
        ],

        tools: [
            "Git/GitHub",
            "Docker",
            "Pinecone",
            "Redis",
            "Linux",
            "CUDA",
            "VS Code"
        ]
    },

    // ==========================================
    // PROJECTS
    // ==========================================
    // Add your projects here. You can add more or remove projects.
    projects: [
        {
            title: "PPE Detection Monitor",
            category: "Computer Vision • MERN Intelligence",
            description: `Automated PPE detection system using YOLOv8s and MERN stack. Trained for 350 epochs
      on a diverse Roboflow dataset, achieving 0.60 mAP@50 for robust real-time 
      laboratory safety compliance for scientists.`,
            tech: ["YOLOv8s", "PyTorch", "OpenCV", "React", "Node.js", "Roboflow", "Colab"],
            github: "https://github.com/Vedant988/PPE-Compliance-Monitor",
            demo: null,
            featured: true,
        },

        {
            title: "Autonomous Navigation Rover",
            category: "Robotics • SLAM",
            description: `Built a self-driving rover with SLAM-based navigation and obstacle 
      avoidance. Integrated LiDAR and depth cameras for 3D environment mapping and 
      path planning in unknown terrains.`,
            tech: ["C++", "ROS2", "Python", "PCL", "TensorFlow"],
            github: "https://github.com/yourusername/rover-project",
            demo: null,
            featured: true,
        },

        {
            title: "GAN Image Synthesis",
            category: "Deep Learning • Generative AI",
            description: `Implemented a StyleGAN-based generative model for high-resolution 
      image synthesis. Trained on custom datasets to generate photorealistic images 
      with controllable latent space manipulation.`,
            tech: ["Python", "PyTorch", "CUDA", "NumPy", "Matplotlib"],
            github: "https://github.com/yourusername/gan-project",
            demo: null,
            featured: false,
        },

        // ADD MORE PROJECTS HERE:
        // {
        //   title: "Your Project Title",
        //   category: "Category • Subcategory",
        //   description: "Project description...",
        //   tech: ["Tech1", "Tech2", "Tech3"],
        //   github: "https://github.com/...",
        //   demo: null,
        //   featured: false,
        // },
    ],

    // ==========================================
    // EXPERIENCE (Optional)
    // ==========================================
    experience: [
        {
            title: "Research Assistant",
            company: "University AI Lab",
            period: "Sep 2024 - Present",
            description: `Working on computer vision research focused on real-time object 
      detection in challenging environments. Contributing to publications and 
      developing novel deep learning architectures.`,
            skills: ["PyTorch", "Computer Vision", "Research"]
        },

        // ADD MORE EXPERIENCE:
        // {
        //   title: "Job Title",
        //   company: "Company Name",
        //   period: "Date Range",
        //   description: "What you did...",
        //   skills: ["Skill1", "Skill2"]
        // },
    ],

    // ==========================================
    // EDUCATION
    // ==========================================
    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "Your University",
            period: "2022 - 2026 (Expected)",
            gpa: "3.8/4.0",  // Optional
            relevant_courses: [
                "Computer Vision",
                "Machine Learning",
                "Deep Learning",
                "Robotics",
                "Algorithms",
                "Data Structures"
            ]
        }
    ]
};
