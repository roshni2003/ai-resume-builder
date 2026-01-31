import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('GEMINI_API_KEY set?', !!process.env.GEMINI_API_KEY);
console.log('MODEL_NAME:', process.env.MODEL_NAME);

// Health check
app.get('/', (req, res) => {
  res.send('Gemini AI Backend running');
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    // Normalize MODEL_NAME: allow either "models/xyz" or "xyz"
    const rawModel = process.env.MODEL_NAME || 'gemini-1.5-flash';
    const modelSegment = rawModel.startsWith('models/') ? rawModel : `models/${rawModel}`;

    console.log('--- Gemini Request ---');
    console.log('Model:', modelSegment);
    console.log('Prompt preview:', prompt.slice(0, 150));

    const url = `https://generativelanguage.googleapis.com/v1beta/${modelSegment}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [ { parts: [{ text: prompt }] } ]
      }),
    });

    const raw = await response.text();
    console.log('Gemini status:', response.status);
    console.log('Gemini raw:', raw.slice(0, 300));

    if (!response.ok) {
      return res.status(500).json({
        error: 'Gemini API error',
        status: response.status,
        raw
      });
    }

    const data = JSON.parse(raw);
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({
        error: 'No text returned',
        raw: data
      });
    }

    res.json({ text });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Gemini backend running on port ${PORT}`);
});
