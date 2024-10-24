
"use client";

import React, { useState } from 'react';
import TechInput from '../TechInput/page';
import Modal from '../Modal/modal';


const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <footer className="bg-green-200 p-4 text-center">
      <p className="text-green-900">
        Quer fazer parte da nossa equipe?{' '}
        <span
          className="text-green-800 font-bold cursor-pointer hover:underline"
          onClick={handleOpenModal}
        >
          Trabalhe Conosco
        </span>
      </p>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TechInput
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
        />
        <TechInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
        />
        <TechInput
          label="Telefone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(XX) XXXXX-XXXX"
        />
        <div className="mb-4">
          <label className="block text-green-900 font-bold mb-2">Mensagem</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem aqui..."
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={4}
          />
        </div>
        <button
          onClick={handleCloseModal}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full"
        >
          Enviar
        </button>
      </Modal>

      <p className="text-green-800 mt-4">
        &copy; 2024 ProjTech. Todos os direitos reservados.
      </p>
      <p className="text-green-800">
        Entre em contato: <a href="mailto:contato@projtech.com" className="underline hover:text-green-900">contato@projtech.com</a>
      </p>
    </footer>
  );
};

export default Footer;
