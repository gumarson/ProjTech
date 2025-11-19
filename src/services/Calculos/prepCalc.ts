import { getCoordinates } from "../geocodingService";
import { getAddressByCep } from "../viaCepService";
import { solarSim } from "./ExecCalc";

export async function calcSolarPotential(
 cep: string, monthlyKWh: number, roofUsable: number, roofTotal: number) {
  try {
    const address = await getAddressByCep(cep);
    if (!address) throw new Error("Endereço não encontrado via CEP");

    const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}`;

    const coords = await getCoordinates(address.logradouro, address.localidade, address.uf);
    if (!coords) throw new Error("Coordenadas não encontradas");

    const { latitude } = coords;

    const resultado = solarSim({
      monthlyKWh: monthlyKWh,
      latitude,
      roofUsable: roofUsable, 
      roofTotal: roofTotal,
    });

    return resultado;
  } catch (error) {
    throw new Error("Erro ao calcular o potencial solar");
  }
}
