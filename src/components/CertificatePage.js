'use client'

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Linkedin, Twitter } from 'lucide-react'; // Ensure 'lucide-react' is installed

export default function CertificatePage({ userName = 'Dhawal Mali', courseName = 'Financial Markets' }) {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimensions({ width, height });

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const shareToLinkedIn = () => {
    // Implement LinkedIn sharing logic here
    console.log('Sharing to LinkedIn');
  };

  const shareToTwitter = () => {
    // Implement Twitter sharing logic here
    console.log('Sharing to Twitter');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      {showConfetti && <Confetti width={windowDimensions.width} height={windowDimensions.height} />}
      <div className="w-full max-w-4xl bg-white shadow-2xl border-8 border-double border-blue-200">
        <div className="p-12 space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-blue-600 mb-2">L(EARN)</h1>
            <p className="text-2xl text-yellow-600 font-semibold">Certificate of Mastery</p>
          </div>
          <div className="border-t-2 border-b-2 border-yellow-200 py-10 my-8 text-center">
            <p className="text-xl mb-4 text-gray-700">This is to certify that</p>
            <h2 className="text-4xl font-bold mb-4 text-yellow-700">Mr. {userName}</h2>
            <p className="text-xl text-gray-700">has successfully completed the L(EARN) course</p>
            <p className="text-2xl mt-6 font-semibold text-blue-600">{courseName}</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-600 font-semibold">Awarded on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex justify-end mt-12">
            <div className="text-center">
              <div className="mb-2 h-16 border-b-2 border-yellow-400 w-48"></div>
              <p className="font-semibold text-gray-800">Tarun Gupta</p>
              <p className="text-sm text-gray-600">Founder & CEO, L(EARN)</p>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-12">
            <button
              onClick={shareToLinkedIn}
              className="bg-[#0077B5] hover:bg-[#006699] text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Share on LinkedIn
            </button>
            <button
              onClick={shareToTwitter}
              className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <Twitter className="w-5 h-5 mr-2" />
              Share on Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
