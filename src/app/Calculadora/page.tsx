"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Buttons/button";
import TechAba from "@/components/Tabs/TechTab";
import Modal from "@/components/Modal/modal";
import TechInput from "@/components/TechInput/page";

const NivoBarChart = dynamic(
  () => import("@/components/Charts/NivoSolarBarChart"),
  {
    ssr: false, // This ensures the ChartComponent is only loaded on the client
  }
);

const CalculadoraPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("CidadesPotencial");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-8 bg-sky-50 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-sky-900">
        Análise Solar
      </h1>
      <div className="flex justify-center space-x-4 mb-8">
        <TechAba
          label="Calculo potencial de geração solar"
          isActive={activeTab === "CidadesPotencial"}
          onClick={() => handleTabChange("CidadesPotencial")}
        />
        {/* <TechAba
          label="Paises que adotaram o modelo de geração solar"
          isActive={activeTab === "PaisesModelo"}
          onClick={() => handleTabChange("PaisesModelo")}
        /> */}
      </div>

      {activeTab === "CidadesPotencial" && (
        <div>
          <div className="flex flex-col md:flex-row md:space-x-8 items-start bg-white p-6 rounded-lg shadow mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-sky-800 mb-4">
                Está pronto para descobrir o quanto sua casa pode economizar com
                energia solar?
              </h2>
              <p className="text-base text-gray-700 mb-6">
                Nossa simulação mostra o potencial de geração solar da sua
                residência com base em informações simples. Você não precisa ser
                especialista — em poucos cliques, descubra:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
                <li>Quantos kWh sua casa pode gerar por mês.</li>
                <li>Quanto isso representa em economia na conta de luz.</li>
              </ul>
              <p className="text-base text-gray-700">
                Comece agora e veja como sua casa pode se transformar em uma
                fonte de energia limpa e econômica!
              </p>
            </div>
            <div className="mt-10 w-full h-[400px]">
              <NivoBarChart
                data={[
                  { Energia: "Solar", solar: 70, comum: 0 },
                  { Energia: "Comum", solar: 0, comum: 30 },
                ]}
                keys={["solar", "comum"]}
                indexBy="Energia"
                layout="horizontal"
                colors={["#16a34a", "#facc15"]}
                tooltipFormatter={(id, value, indexValue) =>
                  `${indexValue} gera ${value} kWh/m²`
                }
              />
              <h4 className="text-base text-gray-700">
                A energia solar pode gerar mais que o dobro da energia comum — o
                que pode representar economia de até R$ <strong>150</strong> por
                mês na sua conta de luz.
              </h4>
            </div>
          </div>

          <div className="flex flex-col md:flex-row bg-gray-50 p-6 rounded-lg shadow">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-sky-900 mb-4">
                Top 10 Estados do Brasil com Maior Potencial de Geração Solar em 2025
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>1º) Minas Gerais: 1.730 MW</li>
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
            <div className="md:w-1/2 md:pl-8">
              <p className="text-base text-gray-700">
                O potencial de geração solar varia significativamente entre as
                cidades brasileiras e é influenciado por fatores como índice de
                radiação solar, disponibilidade de áreas para instalação de
                sistemas fotovoltaicos, políticas de incentivo e engajamento da
                população com fontes renováveis. Cidades com maior capacidade
                instalada de energia solar podem se tornar referências em
                sustentabilidade e segurança energética, promovendo benefícios
                como redução de custos com eletricidade, diminuição da
                dependência de fontes poluentes e estímulo à economia verde.
                Investir nesse potencial é essencial para uma transição
                energética eficiente e descentralizada.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* {activeTab === "PaisesModelo" && (
        <div>
          <div className="flex flex-col md:flex-row md:space-x-8 items-start bg-white p-6 rounded-lg shadow mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-sky-800 mb-4">
                Como isso pode beneficiar todo mundo?
              </h2>
              <p className="text-base text-gray-700 mb-6">
                A energia solar é uma das alternativas mais promissoras para um
                futuro sustentável, reduzindo a dependência de combustíveis
                fósseis e minimizando impactos ambientais. Os países
                mencionados, líderes na geração solar, demonstram que investir
                nessa tecnologia traz benefícios econômicos, criando empregos e
                fortalecendo a independência energética. Além disso, a adoção da
                energia solar permite que consumidores reduzam custos com
                eletricidade, tenham mais autonomia e até valorizem seus
                imóveis. Com incentivos adequados, mais países e indivíduos
                podem aproveitar essa fonte limpa e abundante, contribuindo para
                um planeta mais saudável e equilibrado. O avanço das tecnologias
                solares também aumenta a eficiência energética, tornando essa
                opção cada vez mais acessível. Ao optar por essa alternativa,
                empresas e residências podem se destacar na sustentabilidade e
                impulsionar inovações no setor.
              </p>
            </div>
            <div className="mt-10 w-full h-[400px]">
              <NivoBarChart
                data={[
                  {
                    country: "China",
                    investimentos: 151,
                    geracao: 609.5,
                  },
                  {
                    country: "Estados Unidos",
                    investimentos: 50,
                    geracao: 139.2,
                  },
                  {
                    country: "Japão",
                    investimentos: 15,
                    geracao: 87.1,
                  },
                  {
                    country: "Alemanha",
                    investimentos: 20,
                    geracao: 81.7,
                  },
                  {
                    country: "Brasil",
                    investimentos: 9.4,
                    geracao: 37.4,
                  },
                ]}
                keys={["investimentos", "geracao"]}
                indexBy="country"
                layout="vertical"
                colors={["#F4A261", "#2A9D8F"]}
                tooltipFormatter={(id, value, indexValue) =>
                  `${indexValue} qualquer ${value} coisa`
                }
              />

              <h4 className="text-base text-gray-700">
                A adoção da energia solar tem sido impulsionada por
                investimentos significativos em diversos países, refletindo uma
                mudança global em direção a fontes de energia mais sustentáveis.
                Em 2024, os investimentos globais em energia solar devem
                ultrapassar US$ 500 bilhões, superando os aportes em
                combustíveis fósseis e outras fontes renováveis .
              </h4>
            </div>
          </div>

          <div className="flex flex-col md:flex-row bg-gray-50 p-6 rounded-lg shadow">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-sky-900 mb-4">
                Top 10 Paises que adotaram o modelo de geração solar
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>1) China - 609.921 MW</li>
                <li>2) Estados Unidos - 139.205 MW</li>
                <li>3) Japão - 87.068 MW</li>
                <li>4) Alemanha - 81.739 MW</li>
                <li>5) Índia - 73.109 MW</li>
                <li>6) Brasil - 37.449 MW</li>
                <li>7) Austrália - 33.683 MW</li>
                <li>8) Espanha - 31.016 MW</li>
                <li>9) Itália - 29.795 MW</li>
                <li>10) Coreia do Sul - 27.046 MW</li>
              </ul>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-base text-gray-700">
                A energia solar é uma das alternativas mais promissoras para um
                futuro sustentável, reduzindo a dependência de combustíveis
                fósseis e minimizando impactos ambientais. Os países
                mencionados, líderes na geração solar, demonstram que investir
                nessa tecnologia traz benefícios econômicos, criando empregos e
                fortalecendo a independência energética. Além disso, a adoção da
                energia solar permite que consumidores reduzam custos com
                eletricidade, tenham mais autonomia e até valorizem seus
                imóveis. Com incentivos adequados, mais países e indivíduos
                podem aproveitar essa fonte limpa e abundante, contribuindo para
                um planeta mais saudável e equilibrado.
              </p>
            </div>
          </div>
        </div>
      )} */}

      <div className="mt-8 text-center">
        <Button label="Calcular Emissão" route="#" onClick={toggleModal} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title={
          activeTab === "CidadesPotencial"
            ? "Calcular Emissão de Veículos"
            : "Calcular Emissão Aérea"
        }
      >
        {activeTab === "CidadesPotencial" ? (
          <form>
            <TechInput
              label="Distância percorrida"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Insira a distância"
            />
            <TechInput
              label="Unidade de distância"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Ex.: km, milhas"
            />
            <TechInput
              label="Modelo do veículo"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Ex.: compact_gas"
            />
            <TechInput
              label="Tipo de transporte (veículo)"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Ex.: Carro, Caminhão"
            />
            <Button label="Ver Resultado" route="#" onClick={toggleModal} />
          </form>
        ) : (
          <form>
            <TechInput
              label="Número de passageiros"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Insira o número de passageiros"
            />
            <TechInput
              label="Aeroporto de partida"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Insira o código IATA do aeroporto"
            />
            <TechInput
              label="Aeroporto de destino"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Insira o código IATA do destino"
            />
            <TechInput
              label="Etapas adicionais do voo"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Códigos dos aeroportos de escala (opcional)"
            />
            <Button label="Ver Resultado" route="#" onClick={toggleModal} />
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CalculadoraPage;
