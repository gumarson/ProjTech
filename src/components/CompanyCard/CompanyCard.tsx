import React from 'react';
import StarRating from '../StarRating/StarRating';
import { Company } from '@/types/company';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md text-white flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{company.nome}</h3>
        <p className="text-sm text-gray-400">{company.tipo} - {company.uf}</p>
        <p className="text-sm text-cyan-400">{company.distance?.toFixed(2)} km de distância</p>
      </div>
      <div className="flex flex-col items-end">
        <StarRating rating={company.rating} />
        <span className="text-xs text-gray-300 mt-1">{company.rating.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default CompanyCard;

