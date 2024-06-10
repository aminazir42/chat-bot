"use client";
import axios from 'axios';

export default async function handler(req, res) {
  const { document } = req.body;

  console.log('Received document:', document);
  console.log('GEMINI API KEY:', process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const response = await axios.post('https://api.gemini.ai/process-document', 
      { document },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Response from API:', response.data);

    res.status(200).json({ summary: response.data.summary });
  } catch (error) {
    console.error('Error processing the document:', error);
    res.status(500).json({ error: 'Error processing the document' });
  }
}
