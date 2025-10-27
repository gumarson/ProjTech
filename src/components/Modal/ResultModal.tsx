"use client"
import React, { useState, useEffect } from 'react';
import TechAba from '../Tabs/TechTab';
import { Company } from '@/types/company';

// Definindo o tipo para o resultado do cálculo, que será recebido como prop
type SolarCalcResult = {
  irradiance: number;
  sysKWp: number;
  panelCount: number;
  areaNeeded: number;
  possibleGen: number;
  possibleMonthlySavings: number;
  monthlySavings: number;
  enoughArea: number | boolean;
  usablePct: number;
  totalPct: number;
  msg: string;
  msg2: string;
  msg3: string;
  highlights: {
    roofUsable: number;
    possibleGen: number;
    possibleMonthlySavings: number;
    possiblePct: number;
    usageNeededTotalPct: number;
    usageNeededUsablePct: number;
    usageAvailableTotalPct: number;
    usageAvailableUsablePct: number;
    areaNeeded: number;
  }
  evChargingCostEstimate?: number; 
};

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  solarCalcResult: SolarCalcResult | null;
  nearbyCompanies: Company[];
  children?: React.ReactNode; 
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, solarCalcResult, nearbyCompanies, children }) => {
  const [activeTab, setActiveTab] = useState('economia'); 

  // Efeito para resetar a aba para a inicial sempre que o modal for aberto
  useEffect(() => {
    if (isOpen) {
      setActiveTab('economia');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Função para formatar números como moeda
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return "N/A";
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'economia':
        return (
          <div>
            <h3 className="font-bold text-xl text-white mb-4">Seu Potencial de Economia</h3>
            {solarCalcResult ? (
              <div className="space-y-3 text-slate-300">
                <p>Com base nos dados fornecidos, aqui está sua simulação:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li><strong>Economia Mensal Estimada:</strong> <span className="text-green-400 font-bold">{formatCurrency(solarCalcResult.highlights.possibleMonthlySavings)}</span></li>
                  <li><strong>Geração de Energia Potencial:</strong> <span className="text-blue-400 font-bold">{solarCalcResult.highlights.possibleGen.toFixed(0)} kWh/mês</span></li>
                  <li><strong>Área Necessária para Painéis:</strong> <span className="font-bold">{solarCalcResult.highlights.areaNeeded.toFixed(1)} m²</span></li>
                  <li><strong>Quantidade de Painéis:</strong> <span className="font-bold">{solarCalcResult.panelCount}</span></li>
                </ul>
                <p className="pt-2">{solarCalcResult.msg2}</p>
              </div>
            ) : (
              <p className="text-slate-400">Nenhum resultado de cálculo disponível. Por favor, preencha os dados no modal anterior.</p>
            )}
          </div>
        );
      case 'pontoEletrico':
        return (
          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-bold text-xl text-white mb-3">Expanda sua Sustentabilidade: Pontos de Recarga Elétrica</h3>
            <p className="text-slate-300">
              Aproveitando a energia solar gerada, sua empresa pode se tornar um ponto de referência em mobilidade sustentável. A instalação de postos de recarga para veículos elétricos e híbridos atrai clientes e colaboradores engajados, além de reforçar sua marca como inovadora.
            </p>
            <p className="text-green-400 font-bold text-lg mt-4">
              O investimento adicional para essa implementação seria de aproximadamente <span className="text-blue-400">{formatCurrency(solarCalcResult?.evChargingCostEstimate)}</span>.
            </p>
            <p className="text-slate-400 text-sm mt-2">
              (Este valor é uma estimativa. Consulte nossos fornecedores parceiros para um orçamento detalhado.)
            </p>
          </div>
        );
      case 'fornecedores':
        return (
          <div className="max-h-96 overflow-y-auto pr-2"> 
            <div>
              <p className="text-slate-300 mb-4">
                Abaixo estão nossos parceiros recomendados.
                <br /><br />
                <span className="text-sm text-green-400">*Todas as empresas listadas realizam tanto a instalação de painéis solares quanto de pontos de recarga para veículos elétricos.</span>
              </p>
              {children}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-white font-bold text-2xl">Resultados da Simulação</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-2xl leading-none">&times;</button>
        </div>
        
        <div className="flex space-x-2 border-b border-slate-700 mb-6">
          <TechAba label="1. Sua Economia" isActive={activeTab === 'economia'} onClick={() => setActiveTab('economia')} />
          <TechAba label="2. Ponto Elétrico" isActive={activeTab === 'pontoEletrico'} onClick={() => setActiveTab('pontoEletrico')} />
          <TechAba label="3. Fornecedores" isActive={activeTab === 'fornecedores'} onClick={() => setActiveTab('fornecedores')} />
        </div>

        <div>
          {renderTabContent()}
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;