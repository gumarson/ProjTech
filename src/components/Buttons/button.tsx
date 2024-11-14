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
      className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full shadow-md"
    >
      {label}
    </button>
  );
};

export default Button;
