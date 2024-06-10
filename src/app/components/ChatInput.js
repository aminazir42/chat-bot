"use client";
import { useState } from 'react';
import { FaPaperclip, FaPaperPlane, FaPlus, FaSun, FaMoon } from 'react-icons/fa';

const ChatInput = ({ onSend, onAttach, onNewChat, onToggleTheme, isDarkMode }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-gray-100 dark:bg-gray-800">
      <button onClick={onAttach} className="p-2 text-gray-500 dark:text-gray-300">
        <FaPaperclip />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
        placeholder="Type your message..."
      />
      <button onClick={handleSend} className="p-2 text-gray-500 dark:text-gray-300">
        <FaPaperPlane />
      </button>
      <button onClick={onNewChat} className="p-2 text-gray-500 dark:text-gray-300">
        <FaPlus />
      </button>
      <button onClick={onToggleTheme} className="p-2 text-gray-500 dark:text-gray-300">
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default ChatInput;
