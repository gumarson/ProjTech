"use client";

import Footer from '@/components/Footer/footer';
import Header from '@/components/NavBar/navbar';
import React from 'react';
import './global.css';


const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body className="bg-green-900">
        <Header />
        <main className="container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default HomeLayout;
