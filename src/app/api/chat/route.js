import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context, selectedCharacter } = req.body;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `${context}

Currently selected character: ${selectedCharacter || 'None'}

User question: ${message}

Please provide helpful, specific advice about Uma Musume characters, training, racing strategy, or team building. Keep responses concise and focused on the game mechanics.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.status(200).json({ message: response });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}