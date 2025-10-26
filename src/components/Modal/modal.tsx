"use client"
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title = 'Modal' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white-900 font-bold text-2xl">{title}</h2>
          <button onClick={onClose} className="text-white font-bold text-lg">
        X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
