import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Retry helper for rate limits
async function callWithRetry(fn, retries = 3, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      const is429 = error.message && error.message.includes('429');
      if (is429 && i < retries - 1) {
        console.log(`Rate limited. Retry ${i + 1}/${retries} in ${delay / 1000}s...`);
        await new Promise(r => setTimeout(r, delay));
        delay *= 2; // exponential backoff
      } else {
        throw error;
      }
    }
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Valid8 Backend is running' });
});

app.post('/api/validate', async (req, res) => {
  console.log('--- New Validation Request ---');
  console.log('Body:', JSON.stringify(req.body));
  
  const { idea } = req.body;
  if (!idea) {
    return res.status(400).json({ error: 'Idea description is required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in backend' });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const prompt = `
      You are an expert, brutal, and pragmatic Hackathon judge.
      Evaluate the following hackathon idea based on a 24-hour build constraints.
      
      Idea: "${idea}"
      
      Output ONLY a JSON object (no markdown formatting, no comments) adhering strictly to this schema:
      {
        "scores": {
          "originality": number (0-100),
          "feasibility": number (0-100, how easy is it to build a working prototype in 24 hours),
          "impact": number (0-100)
        },
        "feedback": string (Provide a concise, brutal 1-2 paragraph constructive roast. Tell them why it might fail and how to pivot to win.),
        "mvpFeatures": [ string, string, string ] (Exactly 3 core features to build. Strip away feature creep.),
        "techStack": [ 
          { "name": string, "category": string }, 
          { "name": string, "category": string },
          { "name": string, "category": string }
        ] (Give exactly 3 specific tech recommendations with their category, e.g., "Frontend", "Database", "AI Engine")
      }
    `;

    const result = await callWithRetry(() => model.generateContent(prompt));
    const textRes = result.response.text();
    
    // Safety parse
    const jsonRes = JSON.parse(textRes.trim());
    return res.json(jsonRes);
  } catch (error) {
    console.error('Error with Gemini API:', error);
    return res.status(500).json({ error: 'Failed to assess idea', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
