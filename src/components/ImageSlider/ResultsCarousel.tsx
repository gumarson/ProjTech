"use client";

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ResultCard } from './ResultCard';

// O tipo SolarCalcResult deve ser o mesmo usado na CalculadoraPage
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
  evChargingCostEstimate: number;
};

interface ResultsCarouselProps {
  history: SolarCalcResult[];
}

export const ResultsCarousel: React.FC<ResultsCarouselProps> = ({ history }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <Slider {...settings}>
      {history.map((result, index) => (
        <div key={index}>
          <ResultCard result={result} index={index} />
        </div>
      ))}
    </Slider>
  );
};
