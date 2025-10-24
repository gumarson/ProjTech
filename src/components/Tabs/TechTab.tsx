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
          ? 'bg-slate-700 text-white'
          : 'bg-slate-600 text-white-900 hover:bg-slate-500'
      }`}
    >
      {label}
    </button>
  );
};

export default TechAba;
