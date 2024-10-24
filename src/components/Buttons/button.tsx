"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  label: string;
  route: string;
}

const Button: React.FC<ButtonProps> = ({ label, route }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full shadow-md"
    >
      {label}
    </button>
  );
};

export default Button;
