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
      className={`px-4 py-2 rounded-lg transition-colors duration-200 font-semibold  
        ${isActive
          ? 'bg-slate-900 text-white border-b-4 border-green-400 shadow'
          : 'bg-slate-600 text-white hover:bg-slate-700'
        }`}
    >
      {label}
    </button>
  );
};

export default TechAba;
