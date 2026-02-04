# Neural Systems - AI Portfolio Website

A futuristic, high-performance portfolio website featuring neural network backgrounds, computer vision aesthetics, and a **Mini-RAG Terminal Chat** powered by a **Python/FastAPI** backend.

## 🚀 Features

- **Neural Network Background**: Interactive particle system with mouse repulse effect (optimized).
- **Computer Vision Aesthetics**: Bounding box UI elements with object detection labels.
- **Identity Toggle**: Switch between "Human" (Bio) and "Machine" (JSON) data views.
- **Neural Link (Mini-RAG Chat)**: 
    - Floating terminal icon triggers a modal chat interface.
    - **RAG (Retrieval-Augmented Generation)**: Answers questions about your resume/skills.
    - **Streaming Responses**: Real-time typing effects from the Groq LLM.
- **CV Cursor**: Custom crosshair with real-time coordinates and flashlight effect.
- **Mechanical Motion**: Snappy Framer Motion animations with robotic feel.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** - Custom dark theme
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Canvas API** - Neural network simulation

### Backend (The Neural Core)
- **Python 3.11+**
- **FastAPI** - High-performance web framework
- **Groq API** - Llama 3 LLM inference
- **Uvicorn** - ASGI server

## 📦 Installation (Dual Server Setup)

You must run **BOTH** the Frontend and Backend servers for the full experience.

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
# Runs on http://localhost:5173
```

### 2. Backend Setup (Python)
Required for the "Neural Link" chat to function.
```bash
# Navigate to server directory
cd server

# Install Python dependencies
pip install -r requirements.txt

# Create .env file with your Groq API Key
# echo GROQ_API_KEY=your_key_here > .env

# Start the FastAPI server
uvicorn main:app --reload --port 8000
# Runs on http://localhost:8000
```

## 🎨 Color Palette

- **Neural Black**: `#0a0a0a` - Primary background
- **Cyber Cyan**: `#00f0ff` - Accent color for highlights and interactions
- **Slate Gray**: `#9ca3af` - Secondary text and borders

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── NeuralBackground.jsx     # Improved canvas simulation
│   │   ├── TerminalChat.jsx         # RAG Chat logic
│   │   ├── CVBoundingBox.jsx        # Aesthetic wrapper
│   │   ├── CVCursor.jsx             # Custom cursor
│   │   └── ...
│   ├── App.jsx                      # Main layout & Floating Button
│   └── index.css                    # Tailwind imports
├── server/
│   ├── main.py                      # FastAPI Backend (RAG Logic)
│   ├── requirements.txt             # Python dependencies
│   └── server.js                    # (Deprecated) Old Node backend
├── .env                             # Environment variables (API Keys)
├── index.html
└── vite.config.js
```

## 🔌 API Endpoints (Python Backend)

### POST `/chat`
Streams an AI-generated response based on portfolio context.
- **Body**: `{"prompt": "User question"}`
- **Response**: Server-Sent Events (SSE) stream of text.

## 📝 License

MIT License - Feel free to use this for your own portfolio!

---

**System Status**: 🟢 Operational | **Neural Core**: ⚡ Online

## ⚡ Performance Logs

### Update [2026-02-03] - Terminal Lag Fixes
Significant optimizations were made to address UI lag when the Terminal Chat is active:
1.  **Removed Expensive Blurs**: The `backdrop-blur-sm` filter was removed from the Terminal Modal overlay (`App.jsx`). Stacked blur effects were causing heavy GPU usage and frame drops.
2.  **Throttled State Updates**: Implemented a 50ms throttle in `TerminalChat.jsx` for the incoming streaming text. Previously, the React state was updating on every single chunk/byte received, flooding the main thread. Now updates are batched, ensuring smooth typing callbacks without UI freezing.
