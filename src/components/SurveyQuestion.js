// src/components/SurveyQuestion.js
import React from 'react';

export default function SurveyQuestion({ question, formData, handleInputChange }) {
  if (!question) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#155887] mb-4">{question.question}</h2>
      {question.type === 'select' && (
        <select
          value={formData[question.key]}
          onChange={(e) => handleInputChange(question.key, e.target.value)}
          className="w-full p-2 border border-[#155887] rounded bg-white text-[#155887]"
        >
          <option value="">Select an option</option>
          {question.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}
      {question.type === 'number' && (
        <input 
          type="number" 
          value={formData[question.key]} 
          onChange={(e) => handleInputChange(question.key, e.target.value)}
          className="w-full p-2 border border-[#155887] rounded bg-white text-[#155887]"
        />
      )}
      {question.type === 'text' && (
        <input 
          type="text" 
          value={formData[question.key]} 
          onChange={(e) => handleInputChange(question.key, e.target.value)}
          className="w-full p-2 border border-[#155887] rounded bg-white text-[#155887]"
        />
      )}
      {question.type === 'radio' && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                id={option}
                name={question.key}
                value={option}
                checked={formData[question.key] === option}
                onChange={(e) => handleInputChange(question.key, e.target.value)}
                className="text-[#155887] focus:ring-[#155887]"
              />
              <label htmlFor={option} className="text-[#155887]">{option}</label>
            </div>
          ))}
        </div>
      )}
      {question.type === 'checkbox' && (
        <div className="grid grid-cols-2 gap-2">
          {question.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={option}
                checked={formData[question.key].includes(option)}
                onChange={(e) => {
                  const updatedValues = e.target.checked
                    ? [...formData[question.key], option]
                    : formData[question.key].filter(item => item !== option);
                  handleInputChange(question.key, updatedValues);
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
}
