import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

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

// Helper for Mock Fallback
const getMockResponse = (idea) => ({
  "scores": {
    "originality": Math.floor(Math.random() * 40) + 50,
    "feasibility": Math.floor(Math.random() * 50) + 40,
    "impact": Math.floor(Math.random() * 30) + 60
  },
  "feedback": "Note: System is currently running in fallback mode due to high API demand. This idea: \"" + idea + "\" has great potential! We recommend focusing on a minimal viable feature set to ensure a stable 24-hour build.",
  "mvpFeatures": [
    "Core logic implementation",
    "Basic user dashboard",
    "Data persistence layer"
  ],
  "techStack": [
    { "name": "React", "category": "Frontend" },
    { "name": "Node.js", "category": "Backend" },
    { "name": "Tailwind CSS", "category": "Styling" }
  ]
});

app.post('/api/validate', async (req, res) => {
  console.log('--- New Validation Request ---');
  console.log('Body:', JSON.stringify(req.body));
  
  const { idea } = req.body;
  if (!idea) {
    return res.status(400).json({ error: 'Idea description is required' });
  }

  // If no API key is configured, immediately fall back
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_google_gemini_api_key_here') {
    console.log('No valid API key found. Using Mock Fallback.');
    return res.json(getMockResponse(idea));
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
    console.error('Gemini API Error (Quota/Invalid):', error.message);
    console.log('Falling back to Mock Data for Idea:', idea);
    
    // Automatic fallback to mock data on ANY API error (quota, key, timeout)
    return res.json(getMockResponse(idea));
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
