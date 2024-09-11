// src/components/FinancialSurvey.js
import React, { useState } from 'react';
import SurveyQuestion from './SurveyQuestion';

export default function FinancialSurvey() {
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
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-[#155887]">Financial Survey Quiz</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-[#155887] h-2.5 rounded-full" 
          style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
        ></div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <SurveyQuestion
          question={questions[currentQuestion]}
          formData={formData}
          handleInputChange={handleInputChange}
        />
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
  );
}
