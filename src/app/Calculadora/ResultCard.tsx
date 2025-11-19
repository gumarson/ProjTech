"use client";

import React from "react";

// O tipo SolarCalcResult deve ser importado ou definido aqui também
type SolarCalcResult = {
  cep: string;
  highlights: {
    possibleMonthlySavings: number;
    possibleGen: number;
  };
  panelCount: number;
  areaNeeded: number;
  // Adicione outros campos que queira exibir
};

interface ResultCardProps {
  result: SolarCalcResult;
  index: number;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const ResultCard: React.FC<ResultCardProps> = ({ result, index }) => {
  return (
    <div className="bg-slate-700 p-6 m-2 rounded-lg shadow-lg text-white h-full flex flex-col justify-between">
      <div>
        <h4 className="text-xl font-bold mb-4 border-b border-slate-600 pb-2">Cálculo #{index + 1}</h4>
        <ul className="space-y-2 text-slate-300">
          <li><strong>Economia Mensal:</strong> <span className="font-semibold text-green-400">{formatCurrency(result.highlights.possibleMonthlySavings)}</span></li>
          <li><strong>Geração Potencial:</strong> <span className="font-semibold text-blue-400">{result.highlights.possibleGen.toFixed(0)} kWh/mês</span></li>
          <li><strong>Painéis Necessários:</strong> <span className="font-semibold">{result.panelCount}</span></li>
          <li><strong>Área Necessária:</strong> <span className="font-semibold">{result.areaNeeded.toFixed(1)} m²</span></li>
        </ul>
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center">Resultado para o CEP: <strong>{result.cep}</strong></p>
    </div>
  );
};
