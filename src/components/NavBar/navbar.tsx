"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import TechAba from '../Tabs/TechTab';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="bg-green-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">ProjTech</h1>
        <div className="flex space-x-4">
          <TechAba 
          label="Home" 
          isActive={true} 
          onClick={() => router.push('/Home')} />
          <TechAba 
          label="Calculadora" 
          isActive={false} 
          onClick={() => router.push('/Calculadora')} />
          <TechAba 
          label="Quem Somos" 
          isActive={false} 
          onClick={() => router.push('/QuemSomos')} />
        </div>
      </div>
    </header>
  );
};

export default Header;
