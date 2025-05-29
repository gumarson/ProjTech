import { getCoordinates } from "../geocodingService";
import { getAddressByCep } from "../viaCepService";
import { solarSim } from "./ExecCalc";

export async function calcSolarPotential(
cep: string, monthlyKWh: number, roofUsable: number, roofTotal: number) {
  try {
    const address = await getAddressByCep(cep);
    if (!address) throw new Error("Endereço não encontrado via CEP");

    const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}`;
    console.log("[calcularPotencialSolar] Endereço completo:", fullAddress);

    const coords = await getCoordinates(address.logradouro, address.localidade, address.uf);
    if (!coords) throw new Error("Coordenadas não encontradas");

    const { latitude } = coords;

    const resultado = solarSim({
      monthlyKWh: monthlyKWh,
      latitude,
      roofUsable: roofUsable, 
      roofTotal: roofTotal,
    });
    console.log("resultado: ",resultado)

    console.log("[calcularPotencialSolar] Resultado:", resultado);
    return resultado;
  } catch (error) {
    console.error("[calcularPotencialSolar] Erro:", error);
    throw new Error("Erro ao calcular o potencial solar");
  }
}
