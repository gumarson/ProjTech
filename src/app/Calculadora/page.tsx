"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Buttons/button";
import TechAba from "@/components/Tabs/TechTab";
import Modal from "@/components/Modal/modal";
import ResultModal from "@/components/Modal/ResultModal";
import { useSearchParams } from "next/navigation";
import TechInput from "@/components/TechInput/page";
import { Company } from "@/types/company";
import CompanyList from "@/components/CompanyList/CompanyList";
import { simuladorSchema } from "@/schemas/formSchema";
import { calcSolarPotential } from "@/services/Calculos/prepCalc";
import { getAddressByCep } from "@/services/viaCepService";
import { haversineDistance } from "@/utils/distance";

const OPENCAGE_API_KEY = "9c11e6ea220c4bd6979ba6846e82ce81";



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
  // Added for EV charging cost estimation
  evChargingCostEstimate: number;
};

const NivoBarChart = dynamic(
  () => import("@/components/Charts/NivoSolarBarChart"),
  {
    ssr: false,
  }
);

const CalculadoraPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("CidadesPotencial");

  // Estados para os dois modais
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const [cep, setCep] = useState("");
  const [consumoMensal, setConsumoMensal] = useState("");
  const [areaTelhado, setAreaTelhado] = useState("");
  const [areaUtil, setAreaUtil] = useState("");
  const [solarCalcResult, setSolarCalcResult] = useState<SolarCalcResult | null>(null);
  const [nearbyCompanies, setNearbyCompanies] = useState<Company[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  }

  // Abre o modal de input
  const openInputModal = () => {
    setIsInputModalOpen(true);
  };

  // Fecha todos os modais e reseta os estados
  const closeAllModals = () => {
    setIsInputModalOpen(false);
    setIsResultModalOpen(false);
    // Resetar estados para uma nova simulação
    setCep("");
    setConsumoMensal("");
    setAreaTelhado("");
    setAreaUtil("");
    setSolarCalcResult(null);
    setNearbyCompanies([]);
    setError(null);
    setErrors({}); 
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchParams && searchParams.get("openSearch") === "true") {
      setIsInputModalOpen(true);
    }
  }, [searchParams]);

  const handleCalcular = async () => {
  
    const formData = {
      cep,
      consumoMensal,
      areaTelhado,     
      areaUtil,
    };

    const result = simuladorSchema.safeParse(formData);
    

    // Validação com Zod
    const validationResult = simuladorSchema.safeParse(formData);

    if (!validationResult.success) {
      const newErrors: Record<string, string | undefined> = {};
      validationResult.error.errors.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setError(null);
    setErrors({});

    try {
      // 1. Executa o cálculo do potencial solar
      const calcResult = await calcSolarPotential(cep, Number(result.data?.consumoMensal), Number(result.data?.areaUtil), Number(result.data?.areaTelhado));
      setSolarCalcResult(calcResult);

      // 2. Busca fornecedores
      const address = await getAddressByCep(cep);
      if (!address || !address.logradouro) throw new Error("Endereço do CEP não encontrado.");
      const query = `${address.logradouro}, ${address.localidade}, ${address.uf}, Brasil`;
      const opencageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPENCAGE_API_KEY}`;
      const geoResponse = await fetch(opencageUrl);
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) throw new Error("Coordenadas não encontradas para o CEP.");
      const { lat: userLat, lng: userLon } = geoData.results[0].geometry;

      const companiesResponse = await fetch('/data/empresas.json');
      const companies: Company[] = await companiesResponse.json();
      const companiesWithDistance = companies.map(company => ({
        ...company,
        distance: haversineDistance(userLat, userLon, company.lat, company.lon),
      })).sort((a, b) => a.distance! - b.distance!);
      setNearbyCompanies(companiesWithDistance.slice(0, 10));

      // 3. Fecha o modal de input e abre o de resultado
      setIsInputModalOpen(false);
      setIsResultModalOpen(true);

    } catch (err) {
      // Usamos 'errors.general' para erros que não são de campo específico
      setErrors({ general: err instanceof Error ? err.message : "Ocorreu um erro desconhecido ao calcular ou buscar fornecedores." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8  rounded-lg max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white">

      </h1>
      <div className="flex justify-center space-x-4 mb-8">
        <TechAba
          label="placeholder"
          isActive={activeTab === "CidadesPotencial"}
          onClick={() => handleTabChange("CidadesPotencial")}
        />
      </div>

      {activeTab === "CidadesPotencial" && (
        <div>
          {/* Simulação de economia corporativa */}
          <div className="flex flex-col items-center p-6 rounded-lg mb-8">
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                Pronto para descobrir o quanto sua empresa pode economizar com energia solar?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Nossa análise mostra o potencial de geração solar do seu negócio com base em dados simples do seu CNPJ.
                Em poucos minutos, você entende:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg text-gray-300">
                <li>O quanto sua empresa pode gerar em kWh mensalmente.</li>
                <li>O percentual de redução nos custos de energia elétrica.</li>
                <li>O impacto ambiental positivo e as emissões de CO₂ evitadas.</li>
              </ul>
              <p className="text-lg text-gray-300 mt-4">
                Comece agora e veja como a energia solar pode transformar o desempenho energético e sustentável da sua empresa.
              </p>
            </div>

            <div className="mt-12 text-center">
              <Button label="Calcular Potencial Solar" route="#" onClick={openInputModal} />
            </div>

            <div className="mt-8 w-full max-w-lg">
              <NivoBarChart
                data={[
                  { Energia: "Energia Solar", solar: 80, comum: 0 },
                  { Energia: "Convencional", solar: 0, comum: 20 },
                ]}
                keys={["solar", "comum"]}
                indexBy="Energia"
                layout="horizontal"
                margin={{ top: 20, right: 20, bottom: 50, left: 80 }} // Aumenta o espaço à esquerda
                colors={["#22d3ee", "#64748b"]}
                tooltipFormatter={(id, value, indexValue) =>
                  `${indexValue}: ${value}% de eficiência energética`
                }
              />
              <h4 className="text-lg text-gray-300">
                A energia solar corporativa pode reduzir até <strong>90%</strong> dos custos fixos com eletricidade e fortalecer a imagem sustentável da sua marca.
              </h4>
            </div>
          </div>

          {/* Ranking de estados */}
          <div className="flex flex-col items-center p-6 rounded-lg">
            <div className="w-full max-w-4xl text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Top 10 Estados com Maior Potencial de Energia Solar e Mobilidade Elétrica em 2025
              </h3>
              <div className="mx-auto inline-block text-left">
                <ul className="list-disc pl-6 space-y-2 text-gray-300 text-lg">
                  <li>1º) Minas Gerais: 1.730 MW instalados</li>
                  <li>2º) São Paulo: 1.323 MW</li>
                  <li>3º) Rio Grande do Sul: 1.170 MW</li>
                  <li>4º) Mato Grosso: 690 MW</li>
                  <li>5º) Paraná: 514 MW</li>
                  <li>6º) Santa Catarina: 503 MW</li>
                  <li>7º) Goiás: 498 MW</li>
                  <li>8º) Rio de Janeiro: 421 MW</li>
                  <li>9º) Bahia: 407 MW</li>
                  <li>10º) Ceará: 398 MW</li>
                </ul>
              </div>
              <p className="text-gray-300 text-xl mt-8 text-center leading-relaxed">
                O potencial de geração solar e a expansão da mobilidade elétrica variam entre os estados, influenciados por radiação, incentivos e infraestrutura. Regiões com maior investimento em energia limpa atraem mais negócios, reduzem custos e promovem práticas ESG, posicionando sua empresa como protagonista na transição energética.
              </p>
            </div>
          </div>
        </div>

      )}

      {/* Modal 1: Entrada de Dados */}
      <Modal
        isOpen={isInputModalOpen}
        onClose={closeAllModals}
        title="Calcule o potencial energético da sua empresa"
      >
        <div className="space-y-2">
          <p className="text-slate-300 mb-4">Preencha os dados para simular seu potencial solar e encontrar fornecedores.</p>
          <TechInput
            label="CEP"
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} 
            placeholder="Apenas números"
            maxLength={8}
            error={!!errors.cep}
            errorMessage={errors.cep}
          />
          <TechInput
            label="Consumo mensal (kWh)"
            type="number" 
            value={consumoMensal}
            onChange={(e) => setConsumoMensal(e.target.value)}
            placeholder="Ex: 500"
            error={!!errors.consumoMensal}
            errorMessage={errors.consumoMensal}
          />
          <TechInput
            label="Área do telhado (m²)"
            type="number"
            value={areaTelhado}
            onChange={(e) => setAreaTelhado(e.target.value)}
            placeholder="Ex: 100"
            error={!!errors.areaTelhado}
            errorMessage={errors.areaTelhado}
          />
          <TechInput
            label="Área útil do telhado (m²)"
            type="number"
            value={areaUtil}
            onChange={(e) => setAreaUtil(e.target.value)}
            placeholder="Ex: 70"
            error={!!errors.areaUtil}
            errorMessage={errors.areaUtil}
          />
        </div>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {errors.general && <p className="mt-4 text-sm text-red-500">{errors.general}</p>}
        <div className="mt-6 text-right">
          <button onClick={handleCalcular} disabled={isLoading} className={`px-6 py-3 rounded-lg text-white font-bold transition-colors duration-300 ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
            {isLoading ? "Calculando..." : "Calcular e Ver Resultados"}
          </button>
        </div>
      </Modal>
      {/* Modal 2: Resultados com Abas */}
      <ResultModal
        isOpen={isResultModalOpen}
        onClose={closeAllModals}
        solarCalcResult={solarCalcResult}
        nearbyCompanies={nearbyCompanies}
      >
        <CompanyList companies={nearbyCompanies} />
      </ResultModal>

    </div>
  );
}

export default CalculadoraPage;
