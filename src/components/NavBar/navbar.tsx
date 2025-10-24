"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import TechAba from '../Tabs/TechTab';

const Header: React.FC = () => {
  const router = useRouter();

  return (
  <header className="bg-primary-800 text-white shadow-lg">
    <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
          ProjTech
        </h1>
        <nav className="hidden md:flex space-x-6">
          <TechAba 
            label="Home" 
            isActive={true} 
            onClick={() => router.push('/Home')}
          />
          <TechAba 
            label="Simule Aqui" 
            isActive={false} 
            onClick={() => router.push('/Calculadora')}
          />
          <TechAba 
            label="Quem Somos" 
            isActive={false} 
            onClick={() => router.push('/QuemSomos')}
          />
        </nav>
      </div>
    </div>
  </header>
);
};

export default Header;
