"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [documentText, setDocumentText] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, from: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('/api/query', { query: input });
      setMessages([...newMessages, { text: response.data.answer, from: 'bot' }]);
    } catch (error) {
      console.error('Error querying the AI:', error);
      setMessages([...newMessages, { text: 'Sorry, there was an error processing your request.', from: 'bot' }]);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const text = await file.text();
      setDocumentText(text);

      try {
        const response = await axios.post('/api/process-document', { document: text });
        setMessages([{ text: response.data.summary, from: 'bot' }]);
      } catch (error) {
        console.error('Error processing the document:', error);
        setMessages([{ text: 'Sorry, there was an error processing your document.', from: 'bot' }]);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default Chatbot;
