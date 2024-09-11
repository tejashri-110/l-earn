'use client'

import React, { useState, useEffect } from 'react';
import { BookOpen, BarChart, TrendingUp, BarChart2, PieChart, GitBranch, Briefcase, Umbrella, Wallet, Banknote, CreditCard, Landmark, ChevronLeft, CheckCircle, DollarSign, Users, Building } from "lucide-react"; // Ensure 'lucide-react' is installed

const modules = [
  {
    number: 1,
    title: "Introduction to Stock Markets",
    chapters: [
      {
        id: 1,
        title: "What is a Stock Market?",
        content: (
          <div className="space-y-4">
            <p className="text-lg">
              A stock market is a public market where company stocks and derivatives are traded at an agreed price. It is also known as the equity market and is one of the most vital areas of a market economy as it provides companies with access to capital and investors with a slice of ownership in the company and the potential of gains based on the company's future performance.
            </p>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Key Functions of the Stock Market</h3>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Capital Raising:</strong> Companies can issue shares to raise capital for expansion or other projects.</li>
                <li><strong>Investment Opportunities:</strong> Investors can buy shares to potentially grow their wealth.</li>
                <li><strong>Economic Indicator:</strong> Stock market performance often reflects overall economic health.</li>
                <li><strong>Corporate Governance:</strong> Public companies are subject to regulations that protect investors.</li>
              </ul>
            </div>
            <h3 className="text-xl font-semibold">How Does the Stock Market Work?</h3>
            <p>
              The stock market operates through a network of exchanges, such as the New York Stock Exchange (NYSE) or the NASDAQ. Companies list their shares on these exchanges, and investors can buy or sell these shares through brokers.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-5 h-5" />
                  <h4 className="text-lg font-semibold">Stock Exchanges</h4>
                </div>
                <p>Physical or virtual places where shares are traded. They maintain fair and orderly trading.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5" />
                  <h4 className="text-lg font-semibold">Brokers</h4>
                </div>
                <p>Licensed professionals or firms that execute buy and sell orders on behalf of investors.</p>
              </div>
            </div>
          </div>
        ),
        completed: false
      },
      // Additional chapters can be added here...
    ],
    description: "Learn the fundamentals of stock markets and how to get started.",
    icon: BookOpen,
    color: "border-green-500",
    progress: 0
  },
  {
    number: 2,
    title: "Technical Analysis",
    chapters: 22,
    description: "Discover patterns, indicators, and theories for trading opportunities.",
    icon: BarChart,
    color: "border-blue-500",
    progress: 65
  },
  {
    number: 3,
    title: "Fundamental Analysis",
    chapters: 16,
    description: "Explore equity research and financial statement analysis.",
    icon: TrendingUp,
    color: "border-yellow-500",
    progress: 50
  },
  {
    number: 4,
    title: "Futures Trading",
    chapters: 13,
    description: "Understand derivatives, margins, leverages, and hedging.",
    icon: BarChart2,
    color: "border-pink-500",
    progress: 30
  },
  {
    number: 5,
    title: "Options Theory",
    chapters: 25,
    description: "Learn about options contracts, pricing, and payoffs.",
    icon: PieChart,
    color: "border-orange-500",
    progress: 20
  },
  // Additional modules can be added similarly...
];

export default function ModulePage() {
  const [activeModule, setActiveModule] = useState(null);
  const [updatedModules, setUpdatedModules] = useState(modules);

  const handleContinue = (moduleNumber) => {
    setActiveModule(moduleNumber);
  };

  const handleBack = () => {
    setActiveModule(null);
  };

  const handlePrevious = () => {
    if (activeModule && activeModule > 1) {
      setActiveModule(activeModule - 1);
    }
  };

  const handleNext = () => {
    if (activeModule && activeModule < modules.length) {
      setActiveModule(activeModule + 1);
    }
  };

  const updateModuleProgress = (moduleNumber, newProgress) => {
    setUpdatedModules((prevModules) =>
      prevModules.map((module) =>
        module.number === moduleNumber ? { ...module, progress: newProgress } : module
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#155887] p-4 text-white">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">L(EARN)</div>
          <div className="space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Invest</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">About</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeModule === null ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center">Modules</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {updatedModules.map((module) => (
                <div key={module.number} className={`p-4 border border-gray-200 rounded-lg ${module.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <module.icon className="w-6 h-6" />
                    <h2 className="text-lg font-semibold">{module.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{typeof module.chapters === 'number' ? module.chapters : module.chapters.length} chapters</p>
                  <p className="text-sm text-gray-800 mb-4">{module.description}</p>
                  <div className="w-full mb-2 bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${module.progress}%`, backgroundColor: '#38a169' }}></div>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="text-sm text-gray-600">{module.progress}% complete</span>
                    <button 
                      onClick={() => handleContinue(module.number)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <ModuleContent 
            moduleData={updatedModules[activeModule - 1]}
            onBack={handleBack}
            onPrevious={handlePrevious}
            onNext={handleNext}
            updateProgress={updateModuleProgress}
          />
        )}
      </main>
    </div>
  )
}

function ModuleContent({ moduleData, onBack, onPrevious, onNext, updateProgress }) {
  const [completedChapters, setCompletedChapters] = useState(
    new Set(Array.isArray(moduleData.chapters) 
      ? moduleData.chapters.filter(chapter => chapter.completed).map(chapter => chapter.id)
      : [])
  );

  const toggleChapterCompletion = (chapterId) => {
    setCompletedChapters(prevCompleted => {
      const newCompleted = new Set(prevCompleted);
      if (newCompleted.has(chapterId)) {
        newCompleted.delete(chapterId);
      } else {
        newCompleted.add(chapterId);
      }
      return newCompleted;
    });
  };

  const calculateProgress = () => {
    if (Array.isArray(moduleData.chapters)) {
      return (completedChapters.size / moduleData.chapters.length) * 100;
    }
    return moduleData.progress;
  };

  useEffect(() => {
    const newProgress = calculateProgress();
    updateProgress(moduleData.number, newProgress);
  }, [completedChapters]);

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="inline-flex items-center text-blue-500 hover:underline">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Modules
      </button>
      
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <moduleData.icon className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">{moduleData.title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{moduleData.description}</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-grow bg-gray-200 rounded-full h-2">
            <div className="h-2 rounded-full" style={{ width: `${calculateProgress()}%`, backgroundColor: '#38a169' }}></div>
          </div>
          <span className="text-sm text-gray-600">{Math.round(calculateProgress())}% complete</span>
        </div>
      </div>

      {Array.isArray(moduleData.chapters) && (
        <div className="space-y-4">
          {moduleData.chapters.map((chapter) => (
            <div key={chapter.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className={`w-5 h-5 ${completedChapters.has(chapter.id) ? 'text-green-500' : 'text-gray-400'}`} />
                  <h3 className="text-lg font-semibold">{chapter.title}</h3>
                </div>
                <button 
                  onClick={() => toggleChapterCompletion(chapter.id)}
                  className={`text-sm ${completedChapters.has(chapter.id) ? 'text-red-500' : 'text-green-500'} hover:underline`}
                >
                  {completedChapters.has(chapter.id) ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
              </div>
              <div className="mt-2">{chapter.content}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded" onClick={onPrevious}>Previous Module</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={onNext}>Next Module</button>
      </div>
    </div>
  )
}
