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
          ? 'bg-blue-600 text-white'
          : 'bg-blue-300 text-blue-900 hover:bg-blue-400'
      }`}
    >
      {label}
    </button>
  );
};

export default TechAba;
