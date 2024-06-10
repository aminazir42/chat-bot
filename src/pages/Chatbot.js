"use client";
import React, { useState } from 'react';
import axios from 'axios';
import ChatInput from '../components/ChatInput';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [documentText, setDocumentText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSend = async (message) => {
    const newMessages = [...messages, { text: message, from: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('/api/query', { query: message });
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

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-2 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <ChatInput
          onSend={handleSend}
          onAttach={handleFileUpload}
          onNewChat={handleNewChat}
          onToggleTheme={handleToggleTheme}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Chatbot;
