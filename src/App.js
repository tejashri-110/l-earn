// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import FinancialSurvey from './components/FinancialSurvey';
import Investment from './components/Investment';
import CertificatePage from './components/CertificatePage';
import './index.css';
import FinanceChat from './components/FinanceChat';
import ModulePage from './components/ModulePage'

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-grow container mx-auto p-4">
        {currentTab === 'home' && <Home />}
        {currentTab === 'financial-survey' && <FinancialSurvey />}
        {currentTab === 'investment' && <Investment />}
        {currentTab === 'certificate' && <CertificatePage />}
        {currentTab === 'chat' && <FinanceChat />}
        {currentTab === 'module' && <ModulePage />}
      </main>
      <footer className="bg-[#155887] text-white py-8">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 L(Earn). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
