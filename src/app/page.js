"use client";
import React from 'react';
import Chatbot from './Chatbot';
import './globals.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to My Chatbot</h1>
      <Chatbot />
    </div>
  );
};

export default HomePage;
