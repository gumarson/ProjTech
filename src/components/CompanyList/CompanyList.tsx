import React from 'react';
import CompanyCard from '../CompanyCard/CompanyCard';
import { Company } from '@/types/company';

interface CompanyListProps {
  companies: Company[];
}

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  if (companies.length === 0) {
    return <p className="text-center text-gray-400">Nenhuma empresa encontrada.</p>;
  }

  return (
    <div className="space-y-4">
      {companies.map((company, index) => (
        <CompanyCard key={index} company={company} />
      ))}
    </div>
  );
};

export default CompanyList;

