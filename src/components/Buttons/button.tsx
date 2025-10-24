"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  label: string;
  route?: string; // Tornando o `route` opcional
  onClick?: () => void; // Adicionando a prop `onClick`
}

const Button: React.FC<ButtonProps> = ({ label, route, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Executa a função onClick se for passada
    } else if (route) {
      router.push(route); // Redireciona se `route` for fornecida
    }
  };

  return (
  <button
    onClick={handleClick}
    className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg 
    transition-all duration-300 ease-in-out transform hover:scale-105 
    shadow-lg hover:shadow-xl"
  >
    {label}
  </button>
);
};

export default Button;
