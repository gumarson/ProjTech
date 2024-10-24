"use client";

import React from 'react';

interface TechAbaProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TechAba: React.FC<TechAbaProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-green-600 text-white'
          : 'bg-green-300 text-green-900 hover:bg-green-400'
      }`}
    >
      {label}
    </button>
  );
};

export default TechAba;
