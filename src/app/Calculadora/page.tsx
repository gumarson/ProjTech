"use client"

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/Buttons/button';
import TechAba from '@/components/Tabs/TechTab';
import Modal from '@/components/Modal/modal';
import TechInput from '@/components/TechInput/page';

const ChartComponent = dynamic(() => import('@/components/Charts/PieChart'), {
  ssr: false, // This ensures the ChartComponent is only loaded on the client
});

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
      <h1 className="text-4xl font-extrabold mb-8 text-center text-green-900">Calculadora de Emissões</h1>
      <div className="flex justify-center space-x-4 mb-8">
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
        <div>
          <div className="flex flex-col md:flex-row md:space-x-8 items-start bg-white p-6 rounded-lg shadow mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Taxa de Emissão de Automóveis</h2>
              <p className="text-sm text-gray-700 mb-6">
                O setor de transporte é um dos principais responsáveis pelas emissões de carbono no mundo. Os veículos movidos a combustíveis fósseis emitem gases poluentes. Alternativas como veículos elétricos são fundamentais para reduzir esse impacto. O transporte público e outras alternativas sustentáveis podem ajudar a diminuir a pegada ecológica.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <ChartComponent
                series={[30, 40, 30]}
                labels={['Carro', 'Moto', 'Caminhão']}
                title="Emissão de Veículos"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row bg-gray-50 p-6 rounded-lg shadow">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Top 10 Cidades com Maior Emissão de CO₂</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
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
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-sm text-gray-700">
                As emissões de carbono variam amplamente entre diferentes regiões e são influenciadas por fatores como tamanho da frota de veículos, uso de transporte público e políticas de sustentabilidade. Ao considerar soluções para reduzir as emissões, é importante focar em iniciativas como a eletrificação da frota, melhorias em infraestrutura de transporte público e incentivos para tecnologias limpas.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'emissaoAerea' && (
        <div>
          <div className="flex flex-col md:flex-row md:space-x-8 items-start bg-white p-6 rounded-lg shadow mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Taxa de Emissão Aérea</h2>
              <p className="text-sm text-gray-700 mb-6">
                Voos comerciais e privados contribuem para as emissões de carbono. O uso de biocombustíveis e aviões mais eficientes são soluções para reduzir esse impacto ambiental. Escolher voos diretos, optar por companhias aéreas sustentáveis e diminuir viagens desnecessárias são algumas das práticas que podem ajudar.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <ChartComponent
                series={[50, 30, 20]}
                labels={['Voo Nacional', 'Voo Internacional', 'Fretado']}
                title="Emissão Aérea"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row bg-gray-50 p-6 rounded-lg shadow">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Top 10 Aeroportos com Maior Emissão de CO₂</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Aeroporto de Guarulhos (SP) - 1,000,000 toneladas de CO₂/ano</li>
                <li>Aeroporto de Congonhas (SP) - 850,000 toneladas de CO₂/ano</li>
                <li>Aeroporto de Brasília (DF) - 800,000 toneladas de CO₂/ano</li>
                <li>Aeroporto do Galeão (RJ) - 770,000 toneladas de CO₂/ano</li>
                <li>Aeroporto de Confins (MG) - 740,000 toneladas de CO₂/ano</li>
                <li>Aeroporto de Salvador (BA) - 710,000 toneladas de CO₂/ano</li>
                <li>Aeroporto de Fortaleza (CE) - 700,000 toneladas de CO₂/ano</li>
                <li>Aeroporto de Recife (PE) - 680,000 toneladas de CO₂/ano</li>
                <li>Aeroporto de Porto Alegre (RS) - 650,000 toneladas de CO₂/ano</li>
                <li>Aeroporto de Manaus (AM) - 600,000 toneladas de CO₂/ano</li>
              </ul>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-sm text-gray-700">
                O transporte aéreo é uma das maiores fontes de emissões de carbono no setor de transporte. Aeroportos movimentados e voos frequentes podem gerar grandes quantidades de emissões. Incentivar o uso de combustíveis sustentáveis, promover eficiência nas operações de voo e investir em infraestrutura aeroportuária mais limpa são passos importantes para mitigar os impactos.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Button label="Calcular Emissão" route="#" onClick={toggleModal} />
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal} title={activeTab === 'emissaoVeiculos' ? 'Calcular Emissão de Veículos' : 'Calcular Emissão Aérea'}>
        {activeTab === 'emissaoVeiculos' ? (
          <form>
            <TechInput label="Distância percorrida" type="text" value="" onChange={() => {}} placeholder="Insira a distância" />
            <TechInput label="Unidade de distância" type="text" value="" onChange={() => {}} placeholder="Ex.: km, milhas" />
            <TechInput label="Modelo do veículo" type="text" value="" onChange={() => {}} placeholder="Ex.: compact_gas" />
            <TechInput label="Tipo de transporte (veículo)" type="text" value="" onChange={() => {}} placeholder="Ex.: Carro, Caminhão" />
            <Button label="Ver Resultado" route="#" onClick={toggleModal} />
          </form>
        ) : (
          <form>
            <TechInput label="Número de passageiros" type="text" value="" onChange={() => {}} placeholder="Insira o número de passageiros" />
            <TechInput label="Aeroporto de partida" type="text" value="" onChange={() => {}} placeholder="Insira o código IATA do aeroporto" />
            <TechInput label="Aeroporto de destino" type="text" value="" onChange={() => {}} placeholder="Insira o código IATA do destino" />
            <TechInput label="Etapas adicionais do voo" type="text" value="" onChange={() => {}} placeholder="Códigos dos aeroportos de escala (opcional)" />
            <Button label="Ver Resultado" route="#" onClick={toggleModal} />
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CalculadoraPage;
