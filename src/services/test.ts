import { getCoordinatesFromAddress } from "./geocodingService";
import { getAddressByCep } from "./viaCepService";
import { calcularGeracaoSolar } from "../components/TechInput/test";

export async function calcularPotencialSolar(
  cep: string,
  consumoMensal: number,
  usaArCondicionado: boolean,
  usaAquecimentoEletrico: boolean,
  areaUtilM2: number
) {
  try {
    const address = await getAddressByCep(cep);
    if (!address) throw new Error("Endereço não encontrado via CEP");

    const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}`;
    console.log("[calcularPotencialSolar] Endereço completo:", fullAddress);

    const coords = await getCoordinatesFromAddress(address.logradouro, address.localidade, address.uf);
    if (!coords) throw new Error("Coordenadas não encontradas");

    const { latitude } = coords;

    const resultado = calcularGeracaoSolar({
      consumoMensalKWh: consumoMensal,
      latitude,
      usaArCondicionado,
      usaAquecimentoEletrico,
      areaUtilM2: areaUtilM2, 
      
    });

    console.log("[calcularPotencialSolar] Resultado:", resultado);
    return resultado;
  } catch (error) {
    console.error("[calcularPotencialSolar] Erro:", error);
    throw new Error("Erro ao calcular o potencial solar");
  }
}
