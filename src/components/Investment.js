// src/components/Investment.js
import React, { useState, useMemo } from 'react';
import InvestmentProduct from './InvestmentProduct';

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

export default function Investment() {
  const [sortBy, setSortBy] = useState('risk');

  const sortedProducts = useMemo(() => {
    return [...investmentProducts].sort((a, b) => (sortBy === 'risk' ? a.risk - b.risk : a.durationToAchieveGoal - b.durationToAchieveGoal));
  }, [sortBy]);

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <select onChange={(e) => setSortBy(e.target.value)} className="w-full md:w-64 p-2 border border-[#155887] rounded text-[#155887] bg-white">
          <option value="risk">Sort by Risk</option>
          <option value="duration">Sort by Duration</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <InvestmentProduct key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}
