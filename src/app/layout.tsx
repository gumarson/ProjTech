"use client";

import Footer from '@/components/Footer/footer';
import Header from '@/components/NavBar/navbar';
import React from 'react';
import './global.css';


const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-900 flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto p-4 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default HomeLayout;
