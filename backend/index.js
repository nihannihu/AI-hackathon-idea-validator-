import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Valid8 Backend is running' });
});

// Prompt validation endpoint mock
app.post('/api/validate', (req, res) => {
  const { idea } = req.body;
  if (!idea) {
    return res.status(400).json({ error: 'Idea description is required' });
  }
  
  // Future LLM logic goes here
  res.json({
    originality: 85,
    feasibility: 90,
    impact: 80,
    roast: "A solid idea but might need a clearer monetization strategy.",
    features: ["Core Engine", "Visual Dashboard", "MVP Extractor"],
    techStack: ["React", "Express", "OpenAI API"]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
