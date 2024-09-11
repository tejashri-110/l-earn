'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react'; 

export default function FinanceChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { content: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Placeholder AI response
    setTimeout(() => {
      const aiMessage = {
        content: "I'm an AI assistant created by Vercel to be helpful, harmless, and honest. How can I assist you with your finance-related questions?",
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <nav className="bg-[#155887] p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">L(EARN)</a>
          <div className="space-x-6">
            <a href="/modules" className="text-white hover:text-gray-300 transition-colors">Modules</a>
            <a href="/invest" className="text-white hover:text-gray-300 transition-colors">Invest</a>
            <a href="/about" className="text-white hover:text-gray-300 transition-colors">About</a>
            <a href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</a>
            <a href="/chat" className="text-yellow-300 font-semibold">Chat</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col">
        <div className="flex-grow p-4 overflow-auto" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-start max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {message.sender === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`mx-2 p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-800 shadow'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your finance question here..."
              className="flex-grow p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
