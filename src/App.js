import React, { useState, useMemo } from 'react';
import './index.css';

const investmentProducts = [
  { name: "Savings Accounts", averageReturn: 3, risk: 0, durationToAchieveGoal: 72 },
  { name: "Fixed Deposits (FDs)", averageReturn: 5, risk: 10, durationToAchieveGoal: 60 },
  { name: "Public Provident Fund (PPF)", averageReturn: 7, risk: 15, durationToAchieveGoal: 48 },
  { name: "National Pension Scheme (NPS)", averageReturn: 8, risk: 20, durationToAchieveGoal: 45 },
  { name: "Bonds", averageReturn: 6, risk: 25, durationToAchieveGoal: 54 },
  { name: "Gold & Precious Metals", averageReturn: 8, risk: 30, durationToAchieveGoal: 45 },
  { name: "Unit Linked Insurance Plans (ULIPs)", averageReturn: 10, risk: 40, durationToAchieveGoal: 40 },
  { name: "Mutual Funds", averageReturn: 12, risk: 50, durationToAchieveGoal: 36 },
  { name: "Real Estate", averageReturn: 15, risk: 60, durationToAchieveGoal: 32 },
  { name: "Peer-to-Peer (P2P) Lending", averageReturn: 18, risk: 70, durationToAchieveGoal: 28 },
  { name: "Stock Market (Equity Investing)", averageReturn: 20, risk: 80, durationToAchieveGoal: 26 },
  { name: "Cryptocurrency", averageReturn: 25, risk: 100, durationToAchieveGoal: 22 },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    workingStatus: '',
    occupation: '',
    monthlyIncome: '',
    monthlySpendings: '',
    livingPlace: '',
    currentSavings: '',
    investmentExperience: '',
    investmentTypes: [],
    targetAmount: '',
    targetAmountDetails: '',
    financialGoals: [],
    durationToAchieveGoal: '',
    investmentStrategies: [],
  });
  const [sortBy, setSortBy] = useState('risk');

  const questions = [
    { key: 'gender', question: "Gender", type: 'select', options: ['Male', 'Female', 'Other'] },
    { key: 'age', question: "Age", type: 'number' },
    { key: 'workingStatus', question: "Working/Non-working", type: 'radio', options: ['Working', 'Non-working'] },
    { key: 'occupation', question: "Occupation", type: 'text', condition: (data) => data.workingStatus === 'Working' },
    { key: 'monthlyIncome', question: "Monthly Income", type: 'number' },
    { key: 'monthlySpendings', question: "Monthly spendings", type: 'number' },
    { key: 'livingPlace', question: "Where do you live", type: 'text' },
    { key: 'currentSavings', question: "Please specify your Current Savings", type: 'number' },
    { key: 'investmentExperience', question: "How much Investment experience do you have?", type: 'select', options: ['None', 'Beginner', 'Intermediate', 'Expert'] },
    { key: 'investmentTypes', question: "If yes, please specify types of investments", type: 'checkbox', options: ['Stocks', 'Bonds', 'Mutual Funds', 'Real Estate', 'Crypto Currencies', 'Other'] },
    { key: 'targetAmount', question: "Target Amount (Do you have a specific target amount that you aim to invest?)", type: 'radio', options: ['Yes', 'No'] },
    { key: 'targetAmountDetails', question: "Target Amount Details", type: 'radio', options: ['Below 1000', '1K – 5K', '5K – 10K', 'Above 10K'], condition: (data) => data.targetAmount === 'Yes' },
    { key: 'financialGoals', question: "What are your main financial goals?", type: 'checkbox', options: [
      'Saving for a big purchase (e.g., car, house)',
      'Paying off student loans or other debt',
      'Building an emergency fund',
      'Saving for retirement',
      'Growing wealth through investing',
      'Saving for education',
      'Just getting started with investing'
    ]},
    { key: 'durationToAchieveGoal', question: "Duration to achieve this goal", type: 'radio', options: ['6 – 12 months', '1 – 5 years', '5 – 10 years', 'More than 10 years'] },
    { key: 'investmentStrategies', question: "What investment strategies are you interested in?", type: 'checkbox', options: ['Long Term Growth', 'Short Term Gains', 'Income Generation', 'Preservation Capital'] },
  ];

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleNext = () => {
    let nextQuestion = currentQuestion + 1;
    while (nextQuestion < questions.length) {
      const q = questions[nextQuestion];
      if (!q.condition || q.condition(formData)) {
        setCurrentQuestion(nextQuestion);
        break;
      }
      nextQuestion++;
    }
  };

  const handlePrev = () => {
    let prevQuestion = currentQuestion - 1;
    while (prevQuestion >= 0) {
      const q = questions[prevQuestion];
      if (!q.condition || q.condition(formData)) {
        setCurrentQuestion(prevQuestion);
        break;
      }
      prevQuestion--;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];
    if (q.condition && !q.condition(formData)) {
      handleNext();
      return null;
    }

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#155887] mb-4">
          {currentQuestion + 1}. {q.question}
        </h2>
        {q.type === 'select' && (
          <select 
            value={formData[q.key]} 
            onChange={(e) => handleInputChange(q.key, e.target.value)}
            className="w-full p-2 border border-[#155887] rounded bg-white text-[#155887]"
          >
            <option value="">Select an option</option>
            {q.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}
        {q.type === 'number' && (
          <input 
            type="number" 
            value={formData[q.key]} 
            onChange={(e) => handleInputChange(q.key, e.target.value)}
            className="w-full p-2 border border-[#155887] rounded bg-white text-[#155887]"
          />
        )}
        {q.type === 'text' && (
          <input 
            type="text" 
            value={formData[q.key]} 
            onChange={(e) => handleInputChange(q.key, e.target.value)}
            className="w-full p-2 border border-[#155887] rounded bg-white text-[#155887]"
          />
        )}
        {q.type === 'radio' && (
          <div className="space-y-2">
            {q.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={option}
                  name={q.key}
                  value={option}
                  checked={formData[q.key] === option}
                  onChange={(e) => handleInputChange(q.key, e.target.value)}
                  className="text-[#155887] focus:ring-[#155887]"
                />
                <label htmlFor={option} className="text-[#155887]">{option}</label>
              </div>
            ))}
          </div>
        )}
        {q.type === 'checkbox' && (
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={option}
                  checked={formData[q.key].includes(option)}
                  onChange={(e) => {
                    const updatedValues = e.target.checked
                      ? [...formData[q.key], option]
                      : formData[q.key].filter(item => item !== option);
                    handleInputChange(q.key, updatedValues);
                  }}
                  className="text-[#155887] focus:ring-[#155887]"
                />
                <label htmlFor={option} className="text-sm font-medium text-[#155887]">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const sortedProducts = useMemo(() => {
    return [...investmentProducts].sort((a, b) => {
      if (sortBy === 'risk') {
        return a.risk - b.risk;
      } else {
        return a.durationToAchieveGoal - b.durationToAchieveGoal;
      }
    });
  }, [sortBy]);

  const getRiskColor = (risk, name) => {
    if (name === "Cryptocurrency") return 'bg-red-900';
    if (risk <= 20) return 'bg-green-800';
    if (risk <= 40) return 'bg-green-600';
    if (risk <= 60) return 'bg-red-600';
    if (risk <= 80) return 'bg-red-700';
    return 'bg-red-800';
  };

  const getRiskLabel = (risk) => {
    if (risk <= 20) return 'Low Risk';
    if (risk <= 50) return 'Medium Risk';
    return 'High Risk';
  };

  const getTimeToGoalColor = (duration) => {
    const goalDuration = 2; // 2 years
    const ratio = duration / (goalDuration * 12);
    if (ratio <= 1) return 'text-green-600';
    if (ratio <= 1.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#5DFED3]">
      <header className="bg-[#155887] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-[#5DFED3]">L(Earn)</span>
          <nav className="hidden md:flex space-x-4">
            {["Home", "Financial Survey", "Investment"].map((item) => (
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
      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {["Home", "Financial Survey", "Investment"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-4 px-6 text-center font-medium focus:outline-none ${
                  currentTab === tab.toLowerCase().replace(' ', '-')
                    ? 'bg-[#155887] text-white'
                    : 'bg-white text-[#155887] hover:bg-gray-100'
                }`}
                onClick={() => setCurrentTab(tab.toLowerCase().replace(' ', '-'))}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {currentTab === 'home' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#155887]">Free and open</h1>
                  <p className="text-xl md:text-2xl mb-6 text-[#155887]">stock market and financial education</p>
                  <p className="mb-8 text-[#155887]">
                    L(Earn) is an extensive and in-depth collection of stock market and financial lessons. It is free and openly
                    accessible to everyone and is one of the largest financial education resources on the web. No signup, no pay-wall,
                    no ads.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-full h-64 bg-[#155887] flex items-center justify-center text-[#5DFED3] rounded-lg">
                    Illustration Placeholder
                  </div>
                </div>
              </div>
            )}
            {currentTab === 'financial-survey' && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-[#155887]">Financial Survey Quiz</h2>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                  <div 
                    className="bg-[#155887] h-2.5 rounded-full" 
                    style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                  ></div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {renderQuestion()}
                  <div className="flex justify-between">
                    {currentQuestion > 0 && (
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        className="bg-[#155887] text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        Previous
                      </button>
                    )}
                    {currentQuestion < questions.length - 1 ? (
                      <button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-[#155887] text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        Next
                      </button>
                    ) : (
                      <button 
                        type="submit"
                        className="bg-[#155887] text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
            {currentTab === 'investment' && (
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#155887]">
                  <h2 className="text-2xl font-semibold text-[#155887] mb-4">Your Investment Goal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg text-gray-600">Target Amount:</p>
                      <p className="text-2xl font-bold text-[#155887]">₹500,000</p>
                    </div>
                    <div>
                      <p className="text-lg text-gray-600">Time Frame:</p>
                      <p className="text-2xl font-bold text-[#155887]">2 years</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 flex justify-center">
                  <select
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full md:w-64 p-2 border border-[#155887] rounded text-[#155887] bg-white"
                  >
                    <option value="risk">Sort by Risk</option>
                    <option value="duration">Sort by Duration</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <div key={product.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className={`${getRiskColor(product.risk, product.name)} p-4`}>
                        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">Average Return:</span> {product.averageReturn}%
                          </p>
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">Risk Level:</span> {getRiskLabel(product.risk)}
                          </p>
                          <p className={`text-sm ${getTimeToGoalColor(product.durationToAchieveGoal)}`}>
                            <span className="font-medium">Time to Goal:</span> {(product.durationToAchieveGoal / 12).toFixed(1)} years
                            {product.durationToAchieveGoal / 12 <= 2 ? " (Meets your goal)" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4">
                        <button className="w-full bg-[#155887] text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                          LEARN
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-[#155887] text-white py-8">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 L(Earn). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
