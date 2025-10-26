"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Button from "@/components/Buttons/button";
import TechAba from "@/components/Tabs/TechTab";
import Modal from "@/components/Modal/modal";
import TechInput from "@/components/TechInput/page";
import { getAddressByCep } from "@/services/viaCepService";
import { Company } from "@/types/company";
import { haversineDistance } from "@/utils/distance";
import CompanyList from "@/components/CompanyList/CompanyList";

// Chave da API OpenCage - Substitua pela sua chave
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
};

const NivoBarChart = dynamic(
  () => import("@/components/Charts/NivoSolarBarChart"),
  {
    ssr: false, // This ensures the ChartComponent is only loaded on the client
  }
);

const CalculadoraPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("CidadesPotencial");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nearbyCompanies, setNearbyCompanies] = useState<Company[]>([]);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  }

  const toggleModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
    setCep("");
    setError(null);
  };

  function highlights(value: React.ReactNode) {
    return <span className="font-bold italic underline text-black">{value}</span>;
  }

  useEffect(() => {
    // Limpa o erro quando o usuário começa a digitar novamente
    if (cep.length > 0) setError(null);
  }, [cep])

  // Abre o modal de busca se a URL contiver ?openSearch=true
  useEffect(() => {
    if (searchParams && searchParams.get("openSearch") === "true") {
      setIsSearchModalOpen(true);
    }
  }, [searchParams]);

  const handleSearchCompanies = async () => {
    if (cep.length !== 8 || !/^\d+$/.test(cep)) {
      setError("CEP inválido. Digite 8 números.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Buscar endereço pelo ViaCEP
      const address = await getAddressByCep(cep);
      if (!address || !address.logradouro) {
        throw new Error("CEP não encontrado ou inválido.");
      }

      // 2. Buscar coordenadas pela OpenCage
      const query = `${address.logradouro}, ${address.localidade}, ${address.uf}, Brasil`;
      const opencageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPENCAGE_API_KEY}`;
      const geoResponse = await fetch(opencageUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Não foi possível encontrar as coordenadas para este CEP.");
      }
      const { lat: userLat, lng: userLon } = geoData.results[0].geometry;

      // 3. Carregar empresas do JSON local
      const companiesResponse = await fetch('/data/empresas.json');
      const companies: Company[] = await companiesResponse.json();

      // 4. Calcular distância e ordenar
      const companiesWithDistance = companies.map(company => ({
        ...company,
        distance: haversineDistance(userLat, userLon, company.lat, company.lon),
      }));

      companiesWithDistance.sort((a, b) => {
        if (a.distance! < b.distance!) return -1;
        if (a.distance! > b.distance!) return 1;
        return b.rating - a.rating; // Se a distância for igual, ordena por rating
      });

      setNearbyCompanies(companiesWithDistance.slice(0, 10)); // Pega as 10 mais próximas
      setIsSearchModalOpen(false); // Fecha o modal de busca
      setIsResultModalOpen(true); // Abre o modal de resultados

    } catch (error) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro desconhecido.");
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
              <Button label="Encontrar Empresas Próximas" route="#" onClick={toggleModal} />
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

      {/* Modal para Inserir o CEP */}
      <Modal
        isOpen={isSearchModalOpen}
        onClose={toggleModal}
        title="Encontrar Empresas de Energia Solar"
      >
        <p className="text-white mb-4">Digite seu CEP para encontrar os melhores instaladores e eletricistas perto de você.</p>
        <TechInput
          label="CEP"
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} // Permite apenas números
          placeholder="Apenas números"
          maxLength={8}
          error={!!error}
          errorMessage={error || ""}
        />
        <div className="mt-6 text-right">
          <Button label={isLoading ? "Buscando..." : "Buscar"} route="#" onClick={handleSearchCompanies} disabled={isLoading} />
        </div>
      </Modal>

      {/* Modal para Exibir os Resultados */}
      {isResultModalOpen && (
        <Modal
          isOpen={isResultModalOpen}
          onClose={() => setIsResultModalOpen(false)}
          title={`Empresas Próximas ao CEP ${cep}`}
        >
          <CompanyList companies={nearbyCompanies} />
        </Modal>
      )}
    </div>
  );
};

export default CalculadoraPage;
