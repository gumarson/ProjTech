type ParametrosCalculo = {
  consumoMensalKWh: number;
  latitude: number;
  usaArCondicionado: boolean;
  usaAquecimentoEletrico: boolean;
  areaUtilM2: number;
};

export function calcularGeracaoSolar({
  consumoMensalKWh,
  latitude,
  usaArCondicionado,
  usaAquecimentoEletrico,
  areaUtilM2,
}: ParametrosCalculo) {
  let irradiancia: number;
  if (latitude >= -10) irradiancia = 6.0;
  else if (latitude >= -15) irradiancia = 5.7;
  else if (latitude >= -20) irradiancia = 5.3;
  else if (latitude >= -25) irradiancia = 4.9;
  else irradiancia = 4.5;

  let consumoAjustado = consumoMensalKWh;
  if (usaArCondicionado) consumoAjustado *= 1.15;
  if (usaAquecimentoEletrico) consumoAjustado *= 1.1;

  const eficiencia = 0.75;
  const potenciaSistemaKWp = consumoAjustado / (irradiancia * 30 * eficiencia);

  const potenciaPainelKWp = 0.34;
  const quantidadePaineis = Math.ceil(potenciaSistemaKWp / potenciaPainelKWp);
  const areaNecessariaM2 = quantidadePaineis * 2;

  const energiaGeradaMensal = irradiancia * 30 * potenciaSistemaKWp * eficiencia;
  const economiaMensal = consumoAjustado * 0.7;
  const economiaAnual = economiaMensal * 12;

  const areaSuficiente = areaUtilM2 >= areaNecessariaM2;

  const mensagem = areaSuficiente ? `Com um sistema de energia solar, você pode economizar até R$ ${economiaAnual.toFixed(2)} por ano, reduzindo sua conta de luz em até 70% mensalmente.` 
  : `Sua área disponível de telhado (${areaUtilM2}m²) é insuficiente para os ${areaNecessariaM2} m² necessários. Considere ajustes para viabilidade.`

  return {
    irradianciaMedia: irradiancia,
    consumoAjustado: +consumoAjustado.toFixed(2),
    potenciaSistemaKWp: +potenciaSistemaKWp.toFixed(2),
    quantidadePaineis,
    areaNecessariaM2,
    energiaGeradaMensal: +energiaGeradaMensal.toFixed(2),
    economiaMensal: +economiaMensal.toFixed(2),
    economiaAnual: +economiaAnual.toFixed(2),
    areaSuficiente,
    mensagem
  };
}
