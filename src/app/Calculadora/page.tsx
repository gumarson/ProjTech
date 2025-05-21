"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Buttons/button";
import TechAba from "@/components/Tabs/TechTab";
import Modal from "@/components/Modal/modal";
import TechInput from "@/components/TechInput/page";
import SelectBox from "@/components/SelectBox/SelectBox";
import { calcularPotencialSolar } from "@/services/test";
import { getAddressByCep } from "@/services/viaCepService";

type SolarCalcResult = {
  irradianciaMedia: number;
  consumoAjustado: number;
  potenciaSistemaKWp: number;
  quantidadePaineis: number;
  areaNecessariaM2: number;
  energiaGeradaMensal: number;
  economiaMensal: number;
  economiaAnual: number;
  areaSuficiente: boolean;
  mensagem: string;
};

const NivoBarChart = dynamic(
  () => import("@/components/Charts/NivoSolarBarChart"),
  {
    ssr: false, // This ensures the ChartComponent is only loaded on the client
  }
);

const CalculadoraPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("CidadesPotencial");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultadoModal, setResultadoModal] = useState(false)
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [tipoImovel, setTipoImovel] = useState("")
  const [areaTelhado, setAreaTelhado] = useState("");
  const [consumoMensal, setConsumoMensal] = useState("");
  const [areaUtil, setAreaUtil] = useState("");
  const [usoArCondicionado, setUsoArCondicionado] = useState<boolean | "">("");
  const [aquecimentoAgua, setAquecimentoAgua] = useState<boolean | "">("");
  const [resultado, setResultado] = useState<SolarCalcResult | null>(null);
  const tipoImovelOptions = [
    { value: "residencial", label: "Residencial" },
    { value: "comercial", label: "Comercial" },
    { value: "industrial", label: "Industrial" },
  ]
  const aquecimentoAguaOptions = [
    { value: true, label: "Elétrico" },
    { value: false, label: "Gás" },
  ];
  const arCondicionadoOptions = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

    const ClearForm = () => {
    setNome("");
    setCep("");
    setCidade("");
    setEstado("");
    setRua("");
    setTipoImovel("");
    setAreaTelhado("");
    setConsumoMensal("");
    setAreaUtil("");
    setUsoArCondicionado("");
    setAquecimentoAgua("");
    }

    const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setResultado(null);
    ClearForm();
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (cep.length === 8) {
        const address = await getAddressByCep(cep);
        if (address) {
          setCidade(address.localidade);
          setEstado(address.uf);
          setRua(address.logradouro);
        }
      }
    };
    fetchAddress();
  }, [cep]);

  const handleCalcular = async () => {
    const consumo = Number(consumoMensal);
    const area = Number(areaUtil)
    if (cep && !isNaN(consumo) && consumo > 0 && !isNaN(area) && area > 0) {
      try {
        setIsModalOpen(false);
        const resultadoCalculado = await calcularPotencialSolar(
          cep,
          consumo,
          usoArCondicionado === "" ? false : usoArCondicionado,
          aquecimentoAgua === "" ? false : aquecimentoAgua,
          Number(areaUtil)
        );
        setResultado(resultadoCalculado);
        setResultadoModal(true);
      } catch (error) {
        console.error("Erro ao calcular o potencial solar:", error);
        setResultado(null);
      }
    } else {
      setResultado(null);
    }
  };

  return (
    <div className="p-8 bg-sky-50 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-sky-900">
        Análise Solar
      </h1>
      <div className="flex justify-center space-x-4 mb-8">
        <TechAba
          label="Cálculo potencial de geração solar"
          isActive={activeTab === "CidadesPotencial"}
          onClick={() => handleTabChange("CidadesPotencial")}
        />
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
                colors={["#2a9d8f ", "#ff9f1c"]}
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


      <div className="mt-8 text-center">
        <Button label="Faça o Cálculo!" route="#" onClick={toggleModal} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title={
          activeTab === "CidadesPotencial"
            ? "Calcular Geração Solar"
            : "Calcular Emissão Aérea"
        }
      >
        <form className="flex flex-col md:flex-row gap-6">
          {/* Sub-modal 1 - Dados Pessoais */}
          <div className="flex-1 border-r border-gray-200 pr-4">
            <h3 className="text-lg font-semibold mb-4 text-sky-800">Dados Pessoais</h3>
            <TechInput
              label="Nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
            />
            <TechInput label="CEP"
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Digite o CEP da residência"
            />
            <TechInput
              label="Cidade"
              type="text"
              value={cidade}
              onChange={() => { }}
              placeholder="Jundiaí"
            />
            <TechInput
              label="Estado"
              type="text"
              value={estado}
              onChange={() => { }}
              placeholder="SP"
            />
            <TechInput
              label="Rua"
              type="text"
              value={rua}
              onChange={() => { }}
              placeholder="7 de março"
            />

            <TechInput
              label="Área do telhado (m²)"
              type="text"
              value={areaTelhado}
              onChange={(e) => setAreaTelhado(e.target.value)}
              placeholder="Ex: 20m²"
            />
          </div>

          {/* Sub-modal 2 - Dados Técnicos */}
          <div className="flex-1 pl-4 space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-sky-800">Dados de Consumo</h3>
            <TechInput
              label="Consumo mensal (kWh)"
              type="text"
              value={consumoMensal}
              onChange={(e) => setConsumoMensal(e.target.value)}
              placeholder="Ex: 278.47"
            />
            <TechInput
              label="Área útil do telhado (m²)"
              type="text"
              value={areaUtil}
              onChange={(e) => setAreaUtil(e.target.value)}
              placeholder="área aproveitável para os painéis solares"
            />

            <SelectBox
              label="Tipo de aquecimento de água"
              options={aquecimentoAguaOptions}
              value={aquecimentoAgua}
              onChange={(value) => setAquecimentoAgua(value as boolean)}
              placeholder="Gás, Elétrico"
            />

            <SelectBox
              label="Uso do ar-condicionado"
              options={arCondicionadoOptions}
              value={usoArCondicionado}
              onChange={(value) => setUsoArCondicionado(value as boolean)}
              placeholder="Sim, Não"
            />

            <SelectBox
              label="Tipo do imóvel"
              options={tipoImovelOptions}
              value={tipoImovel}
              onChange={(value) => setTipoImovel(String(value))}
              placeholder="Residêncial, Comercial..."
              
            />

          </div>

        </form>

        <div className="mt-6 text-right">
          <Button label="Ver Resultado" route="#" onClick={handleCalcular} />
        </div>

      </Modal>

      {resultadoModal && resultado && (
  <Modal 
    isOpen={resultadoModal}
    onClose={() => setResultadoModal(false)}
    title="Resultado da Simulação"
  >
    <p className="mb-4 text-black">{resultado.mensagem}</p>

    <div className="grid grid-cols-2 gap-4 text-black">
      <div><strong>Irradiância média:</strong> {resultado.irradianciaMedia} kWh/m²/dia</div>
      <div><strong>Potência do sistema:</strong> {resultado.potenciaSistemaKWp} kWp</div>
      <div><strong>Qtd. painéis:</strong> {resultado.quantidadePaineis}</div>
      <div><strong>Área necessária:</strong> {resultado.areaNecessariaM2} m²</div>
      <div><strong>Geração mensal:</strong> {resultado.energiaGeradaMensal} kWh</div>
      <div><strong>Economia anual:</strong> R$ {resultado.economiaAnual}</div>
    </div>
  </Modal>
)}


    </div>
  );
};

export default CalculadoraPage;
