"use client";
import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req.body;

  console.log('Received query:', query);
  console.log('GEMINI API KEY:', process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const response = await axios.post('https://api.gemini.ai/query', 
      { query },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Response from API:', response.data);

    res.status(200).json({ answer: response.data.answer });
  } catch (error) {
    console.error('Error querying the AI:', error);
    res.status(500).json({ error: 'Error querying the AI' });
  }
}
