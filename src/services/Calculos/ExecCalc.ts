type SolarSimParams = {
  monthlyKWh: number;
  latitude: number;
  roofUsable: number;
  roofTotal: number;
};

function getIrradiance(lat: number): number {
  if (lat >= -10) return 6.0;
  if (lat >= -15) return 5.7;
  if (lat >= -20) return 5.3;
  if (lat >= -25) return 4.9;
  return 4.5;
}

function calcEnergySavings(monthlyKWh: number, irradiance: number) {
  const monthlyGenPerKWp = irradiance * 30;
  const sysKWp = monthlyKWh / monthlyGenPerKWp;
  const panelKWp = 0.33;
  const panelCount = Math.ceil(sysKWp / panelKWp);
  const areaNeeded = panelCount * 2;
  const monthlySavings = monthlyKWh;
  return { sysKWp, panelCount, areaNeeded, monthlySavings };
}

function calcRoofUsage(roofTotal: number, roofUsable: number, areaUsed: number) {
  const usablePct = +(areaUsed / roofUsable * 100).toFixed(2);
  const totalPct = +(areaUsed / roofTotal * 100).toFixed(2);
  return { usablePct, totalPct };
}

export function solarSim({
  monthlyKWh,
  latitude,
  roofUsable,
  roofTotal
}: SolarSimParams) {
  if (roofTotal <= 0 || isNaN(roofTotal)) throw new Error("Invalid roof area");

  const irradiance = getIrradiance(latitude);
  const savings = calcEnergySavings(monthlyKWh, irradiance);

  // Energia gerada com a área útil inteira disponível
  const possibleKWp = (roofUsable / 2) * 0.33;
  const possibleGen = irradiance * 30 * possibleKWp;
  const possibleMonthlySavings = Math.min(possibleGen, monthlyKWh);
  const possiblePct = +(possibleMonthlySavings / monthlyKWh * 100).toFixed(2);

  // % uso da área mínima necessária
  const usageNeeded = calcRoofUsage(roofTotal, roofUsable, savings.areaNeeded);
  // % uso da área disponível inteira (roofUsable)
  const usageAvailable = calcRoofUsage(roofTotal, roofUsable, roofUsable);

  const formatNumber = (n: number, casas = 2) => +n.toFixed(casas);

  const highlights = {
    roofUsable: formatNumber(roofUsable),
    possibleGen: formatNumber(possibleGen),
    possibleMonthlySavings: formatNumber(possibleMonthlySavings),
    possiblePct: formatNumber(possiblePct),
    usageNeededTotalPct: formatNumber(usageNeeded.totalPct),
    usageNeededUsablePct: formatNumber(usageNeeded.usablePct),
    usageAvailableTotalPct: formatNumber(usageAvailable.totalPct),
    usageAvailableUsablePct: formatNumber(usageAvailable.usablePct),
    areaNeeded: formatNumber(savings.areaNeeded),
  };

  const msg = `Com a área mínima necessária (${highlights.areaNeeded} m²), você pode gerar aproximadamente ${highlights.possibleMonthlySavings} kWh/mês, economizando até R$ ${highlights.possibleMonthlySavings} por mês — que é 100% da sua conta de luz. 
Essa instalação ocupa ${highlights.usageNeededTotalPct}% do seu telhado total (${highlights.usageNeededUsablePct}% da área que você informou como disponível: ${highlights.roofUsable} m²).

Se você utilizar toda a área disponível (${highlights.roofUsable} m²), seria possível gerar até aproximadamente ${highlights.possibleGen} kWh/mês, que corresponde a ${highlights.possiblePct}% da sua conta de luz.`;

  const msg2 = roofUsable >= savings.areaNeeded
    ? "Sua área disponível é suficiente para alcançar 100% de economia na sua conta de luz com energia solar."
    : `Para alcançar 100% de economia, você precisaria de aproximadamente ${highlights.areaNeeded} m² de telhado para painéis solares.`;

  const msg3 = `Este resultado é possível devido à área mínima de ${highlights.areaNeeded} m² fornecida.`;

  return {
    irradiance,
    sysKWp: +savings.sysKWp.toPrecision(2),
    panelCount: savings.panelCount,
    areaNeeded: savings.areaNeeded,
    possibleGen: +possibleGen.toPrecision(2),
    possibleMonthlySavings: +possibleMonthlySavings.toPrecision(2),
    monthlySavings: +savings.monthlySavings.toFixed(2),
    enoughArea: roofUsable >= savings.areaNeeded,
    usablePct: usageNeeded.usablePct,
    totalPct: usageNeeded.totalPct,
    possiblePct,
    msg,
    msg2,
    msg3,
    highlights
  };
}
