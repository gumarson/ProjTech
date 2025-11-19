"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import TechAba from '../Tabs/TechTab';

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
  <header className="bg-primary-700 text-white shadow-lg">
    <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          ProjTech
        </h1>
        <nav className="hidden md:flex space-x-6">
          <TechAba 
            label="Home" 
            isActive={pathname === '/Home' || pathname === '/'} 
            onClick={() => router.push('/Home')}
          />
          <TechAba 
            label="Simule Aqui" 
            isActive={pathname === '/Calculadora'} 
            onClick={() => router.push('/Calculadora')}
          />
          <TechAba 
            label="Quem Somos" 
            isActive={pathname === '/QuemSomos'} 
            onClick={() => router.push('/QuemSomos')}
          />
        </nav>
      </div>
    </div>
  </header>
);
};

export default Header;
