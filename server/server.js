import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Status endpoint
app.get('/status', (req, res) => {
    res.json({
        system: 'operational',
        hireable: true,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Neural Systems Backend Online`);
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`✅ Status endpoint: http://localhost:${PORT}/status`);
});
