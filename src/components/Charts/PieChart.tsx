"use client"

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface ChartComponentProps {
  series: number[];
  labels: string[];
  title?: string;
  colors?: string[];
  type?: 'pie' | 'bar';
}

const industrialColors = [
  "#1e293b", // slate-800
  "#334155", // slate-700
  "#0f172a", // slate-900
  "#2563eb", // accent blue
  "#64748b", // slate-500
  "#111827", // near-black
];

const ChartComponent: React.FC<ChartComponentProps> = ({
  series,
  labels,
  title,
  colors = industrialColors, // alterado aqui
  type = 'pie',
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const options = {
    chart: {
      type,
    },
    labels,
    colors,
    legend: {
      position: 'bottom' as 'bottom', // Posição da legenda
      labels: {
        colors: '#fff', // Define a cor dos labels da legenda como branco
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`,
      style: {
        colors: ['#fff'],
        fontSize: '14px',
        fontWeight: 'bold',
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 3,
        color: '#000',
        opacity: 0.5,
      },
    },
    title: {
      text: title,
      align: 'center' as 'center',
      style: {
        fontSize: '16px',
        color: '#065f46',
      },
    },
    tooltip: {
      theme: 'dark' as 'dark',
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type={type} width="280" />
    </div>
  );
};

export default ChartComponent;
