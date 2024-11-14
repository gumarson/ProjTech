"use client"
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // Adicionado para personalizar o título
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title = 'Modal' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-green-900 font-bold text-xl">{title}</h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
