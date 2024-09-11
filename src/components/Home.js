// src/components/Home.js
import React from 'react';

export default function Home() {
  return (
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
  );
}
