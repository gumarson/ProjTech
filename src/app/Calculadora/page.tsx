"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { calcSolarPotential } from "@/services/Calculos/prepCalc";
import Button from "@/components/Buttons/button";
import TechAba from "@/components/Tabs/TechTab";
import Modal from "@/components/Modal/modal";
import TechInput from "@/components/TechInput/page";
import SelectBox from "@/components/SelectBox/SelectBox";
import { simuladorSchema } from "@/schemas/formSchema";
import { getAddressByCep } from "@/services/viaCepService";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultadoModal, setResultadoModal] = useState(false)
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [areaTelhado, setAreaTelhado] = useState("");
  const [consumoMensal, setConsumoMensal] = useState("");
  const [areaUtil, setAreaUtil] = useState("");
  const [usoArCondicionado, setUsoArCondicionado] = useState<boolean | "">("");
  const [aquecimentoAgua, setAquecimentoAgua] = useState<boolean | "">("");
  const [resultado, setResultado] = useState<SolarCalcResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({})
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

  function highlights(value: React.ReactNode) {
    return <span className="font-bold italic underline text-black">{value}</span>;
  }

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
    const formData = {
      nome,
      cep,
      consumoMensal,
      areaTelhado,
      areaUtil,
      aquecimentoAgua,
      usoArCondicionado,
    };

    const result = simuladorSchema.safeParse(formData);

    if (!result.success) {
      const errorDetails = result.error.format();

      setErrors({
        nome: result.error.errors[0].message || "",
        cep: errorDetails.cep?._errors?.[0] || "",
        consumoMensal: errorDetails.consumoMensal?._errors?.[0] || "",
        areaTelhado: errorDetails.areaTelhado?._errors?.[0] || "",
        areaUtil: errorDetails.areaUtil?._errors?.[0] || "",
      });

      return;
    }

    setErrors({});

    const roofUsable = Number(result.data.areaUtil);
    const roofTotal = Number(result.data.areaTelhado);

    try {
      const CalcResult = await calcSolarPotential(
        cep,
        Number(result.data.consumoMensal),
        roofUsable,
        roofTotal
      );

      setResultado(CalcResult);
      setResultadoModal(true);
    } catch (error) {
      console.error("Erro ao calcular o potencial solar:", error);
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
              helperText="Digite seu nome no campo sugerido."
              helperId="helper-nome"
              error={!!errors.nome}
              errorMessage={errors.nome}
            />
            <TechInput label="CEP"
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Digite o CEP da residência"
              helperText="Digite seu CEP para começarmos a simulação."
              helperId="helper-cep"
              error={!!errors.cep}
              errorMessage={errors.cep}
              maxLength={8}
            />
            <TechInput
              label="Estado"
              type="text"
              value={estado}
              onChange={() => { }}
              placeholder="SP"
              helperText="O estado onde você reside."
              helperId="helper-estado"
              disabled
            />
            <TechInput
              label="Cidade"
              type="text"
              value={cidade}
              onChange={() => { }}
              placeholder="Jundiaí"
              helperText="A cidade onde você reside."
              helperId="helper-cidade"
              disabled
            />
            <TechInput
              label="Rua"
              type="text"
              value={rua}
              onChange={() => { }}
              placeholder="7 de março"
              helperText="O endereço que você reside."
              helperId="helper-rua"
              disabled
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
              helperText="Digite seu consumo mensal médio (utilize virgula ou ponto). "
              helperId="helper-consumo"
              error={!!errors.consumoMensal}
              errorMessage={errors.consumoMensal}
            />
            <TechInput
              label="Área do telhado (m²)"
              type="text"
              value={areaTelhado}
              onChange={(e) => setAreaTelhado(e.target.value)}
              placeholder="Ex: 40"
              helperText="Área total disponível do seu telhado para instalação (utilize virgula ou ponto)."
              helperId="helper-telhado"
              error={!!errors.areaTelhado}
              errorMessage={errors.areaTelhado}
            />
            <TechInput
              label="Área útil do telhado (m²)"
              type="text"
              value={areaUtil}
              onChange={(e) => setAreaUtil(e.target.value)}
              placeholder="Ex: 20"
              helperText="Área realmente utilizável do telhado, considerando sombras, estruturas, etc (utilize virgula ou ponto)."
              helperId="helper-util"
              error={!!errors.areaUtil}
              errorMessage={errors.areaUtil}
            />
            <SelectBox
              label="Tipo de aquecimento de água"
              options={aquecimentoAguaOptions}
              value={aquecimentoAgua}
              onChange={(value) => setAquecimentoAgua(value as boolean)}
              placeholder="Gás, Elétrico"
              helperText="O tipo de aquecimento utilizado no cotidiano."
              helperId="helper-AquecAgua"
            />

            <SelectBox
              label="Uso do ar-condicionado"
              options={arCondicionadoOptions}
              value={usoArCondicionado}
              onChange={(value) => setUsoArCondicionado(value as boolean)}
              placeholder="Sim, Não"
              helperText="Se o Ar-condicionado é utilizado no cotidiano."
              helperId="helper-AC"
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
          <p className="text-black mb-1">
            Com apenas {highlights(resultado.highlights.areaNeeded)} m² de área (de um total disponível de {highlights(resultado.highlights.roofUsable)} m²), você já consegue gerar {highlights(resultado.highlights.possibleMonthlySavings)} kWh/mês 
            e economizar até R$ {highlights(resultado.highlights.possibleMonthlySavings)} por mês o que representa 100% da sua conta de luz.
            <br />
            Essa instalação utiliza apenas {highlights(resultado.highlights.usageNeededTotalPct)}% do seu telhado total (e {highlights(resultado.highlights.usageNeededUsablePct)}% da área disponível).
            <br />
            {resultado.highlights.roofUsable > resultado.highlights.areaNeeded && (
              <>
                Se você quiser utilizar os {highlights(resultado.highlights.roofUsable)} m² inteiros disponíveis, seria possível gerar até aproximadamente {highlights(resultado.highlights.possibleGen)} kWh/mês, reduzindo sua conta em até {highlights(resultado.highlights.possiblePct)}% 
                e economizando até R$ {highlights(resultado.highlights.possibleGen)} por mês.
              </>
            )}
          </p>

          <div className="grid grid-cols-2 gap-4 text-black border border-black rounded p-4">
            <div><strong>Irradiância média:</strong> {resultado.irradiance} kWh/m²/dia</div>
            <div><strong>Potência do sistema:</strong> {resultado.sysKWp} kWp</div>
            <div><strong>Qtd. painéis:</strong> {resultado.panelCount}</div>
            <div><strong>Área mínima:</strong> {resultado.areaNeeded} m²</div>
            <div><strong>Geração mensal:</strong> {resultado.possibleMonthlySavings} kWh</div>
            <div><strong>Economia mensal:</strong> R$ {resultado.monthlySavings}</div>
          </div>
          <p className="text-black mt-1">
            {resultado.enoughArea ? (
              <>
                {resultado.msg2}
                <br />
                Este resultado é possível devido a área mínima de {highlights(resultado.highlights.areaNeeded)} m² fornecida.
              </>
            ) : (
              resultado.msg2
            )}
          </p>

        </Modal>
      )}
    </div>
  );
};

export default CalculadoraPage;
