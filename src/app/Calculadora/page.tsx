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
                colors={["#4ade80", "#475569"]}
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
            <h3 className="text-lg font-semibold mb-4 text-white">Dados Pessoais</h3>
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
            <h3 className="text-lg font-semibold mb-4 text-white">Dados de Consumo</h3>
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
