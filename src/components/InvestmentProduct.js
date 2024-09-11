// src/components/InvestmentProduct.js
import React from 'react';

export default function InvestmentProduct({ product }) {
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
  );
}
