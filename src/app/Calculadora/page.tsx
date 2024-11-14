"use client";

import React, { useState } from 'react';
import Button from '@/components/Buttons/button';
import ChartComponent from '@/components/Charts/PieChart';
import TechAba from '@/components/Tabs/TechTab';
import Modal from '@/components/Modal/modal';

const CalculadoraPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('emissaoVeiculos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-8 bg-green-50 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-900">Calculadora de Emissões</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <TechAba
          label="Emissão de Veículos"
          isActive={activeTab === 'emissaoVeiculos'}
          onClick={() => handleTabChange('emissaoVeiculos')}
        />
        <TechAba
          label="Emissão Aérea"
          isActive={activeTab === 'emissaoAerea'}
          onClick={() => handleTabChange('emissaoAerea')}
        />
      </div>

      {activeTab === 'emissaoVeiculos' && (
        <div className="flex flex-col md:flex-row md:space-x-8 items-start">
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Taxa de Emissão de Automóveis</h2>
            <p className="text-base text-gray-700 mb-6">
              O setor de transporte é um dos principais responsáveis pelas emissões de carbono no mundo. Os veículos movidos a combustíveis fósseis emitem gases poluentes. Alternativas como veículos elétricos são fundamentais para reduzir esse impacto.
            </p>
            <Button label="Calcular Emissão" route="#" onClick={toggleModal} />
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <ChartComponent
              series={[30, 40, 30]}
              labels={['Carro', 'Moto', 'Caminhão']}
              title="Emissão de Veículos"
            />
          </div>
        </div>
      )}

      {activeTab === 'emissaoAerea' && (
        <div className="flex flex-col md:flex-row md:space-x-8 items-start">
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Taxa de Emissão Aérea</h2>
            <p className="text-base text-gray-700 mb-6">
              Voos comerciais e privados contribuem para as emissões de carbono. O uso de biocombustíveis e aviões mais eficientes são soluções para reduzir esse impacto ambiental.
            </p>
            <Button label="Calcular Emissão" route="#" onClick={toggleModal} />
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <ChartComponent
              series={[50, 30, 20]}
              labels={['Voo Nacional', 'Voo Internacional', 'Fretado']}
              title="Emissão Aérea"
            />
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Top 10 Cidades com Maior Emissão de CO<sub>2</sub></h3>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <ul className="text-green-900 list-disc pl-5 md:w-1/2">
            <li>São Paulo - 1,200,000 toneladas de CO₂/ano</li>
            <li>Rio de Janeiro - 980,000 toneladas de CO₂/ano</li>
            <li>Belo Horizonte - 870,000 toneladas de CO₂/ano</li>
            <li>Curitiba - 810,000 toneladas de CO₂/ano</li>
            <li>Porto Alegre - 760,000 toneladas de CO₂/ano</li>
            <li>Salvador - 730,000 toneladas de CO₂/ano</li>
            <li>Fortaleza - 700,000 toneladas de CO₂/ano</li>
            <li>Recife - 680,000 toneladas de CO₂/ano</li>
            <li>Brasília - 650,000 toneladas de CO₂/ano</li>
            <li>Manaus - 600,000 toneladas de CO₂/ano</li>
          </ul>
          <div className="text-green-800 text-base leading-relaxed md:max-w-lg">
            <p>
              As emissões de carbono variam amplamente entre diferentes regiões e são influenciadas por fatores como o tamanho da frota de veículos, uso de transporte público e políticas de sustentabilidade.
              Ao considerar soluções para reduzir as emissões, é importante focar em iniciativas como a eletrificação da frota, melhorias em infraestrutura de transporte público e incentivos para tecnologias limpas.
            </p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        {activeTab === 'emissaoVeiculos' ? (
          <div>
            <h2 className="text-lg font-bold mb-2">Preencha os Dados para Calcular a Emissão</h2>
            <form>
              <label>Distância percorrida</label>
              <input type="text" className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
              <label>Unidade de distância</label>
              <input type="text" className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
              <label>Modelo do veículo</label>
              <input type="text" className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
              <label>Tipo de transporte (veículo)</label>
              <input type="text" className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
              <Button label="Ver Resultado" route="#" onClick={toggleModal} />
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-2">Preencha os Dados para Calcular a Emissão Aérea</h2>
            <form>
              <label>Número de passageiros</label>
              <input type="text" className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
              <label>Aeroporto de partida</label>
              <input type="text" className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
              <label>Aeroporto de destino</label>
              <input type="text" className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
              <label>Etapas adicionais do voo</label>
              <input type="text" className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
              <Button label="Ver Resultado" route="#" onClick={toggleModal} />
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CalculadoraPage;
