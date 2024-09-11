// src/components/Header.js
import React from 'react';

export default function Header({ currentTab, setCurrentTab }) {
  const tabs = ["Home", "Financial Survey", "Investment","Certificate","Module","Chat"];
  
  return (
    <header className="bg-[#155887] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold text-[#5DFED3]">L(Earn)</span>
        <nav className="hidden md:flex space-x-4">
          {tabs.map((item) => (
            <button
              key={item}
              className={`text-white hover:text-[#5DFED3] focus:outline-none ${currentTab === item.toLowerCase().replace(' ', '-') ? 'border-b-2 border-[#5DFED3]' : ''}`}
              onClick={() => setCurrentTab(item.toLowerCase().replace(' ', '-'))}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
