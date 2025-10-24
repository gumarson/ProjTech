"use client";

import React from "react";
import Button from "../../components/Buttons/button";
import dynamic from "next/dynamic";

const ChartComponent = dynamic(() => import("@/components/Charts/PieChart"), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <div className="p-8">

      <section className=" p-8 rounded-xl shadow-2xl mb-8 transition-all duration-300 hover:shadow-accent-300/10">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-blue-400/30 pb-4">
          Nossa Missão
        </h2>
        <div className="">
          <p className="text-gray-300 leading-relaxed  p-4 rounded-lg text-xl">
            Reduza custos e impulsione seu negócio com energia solar e soluções de carregamento elétrico corporativo.
          </p>
        </div>
      </section>

      <section className="p-8 rounded-xl shadow-2xl mb-8 transition-all duration-300 hover:shadow-accent-300/10">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-blue-400/30 pb-4">
          Por que investir em energia sustentável para sua empresa?
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
          {/* Gráficos lado a lado */}
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-white font-bold mb-2">
              Crescimento da Energia Solar Corporativa (2024–2025)
            </h3>
            <div className="w-full max-w-md">
              <ChartComponent
                series={[25, 75]}
                labels={["Fontes Tradicionais", "Energia Solar Corporativa"]}
                colors={["#FF0000", "#4c9c2e"]}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-white font-bold mb-2">
              Redução Média de Custos Empresariais (2024–2025)
            </h3>
            <div className="w-full max-w-md">
              <ChartComponent
                series={[20, 80]}
                labels={["Custo Anterior", "Economia com Solar"]}
                colors={["#FF0000", "#4c9c2e"]}
              />
            </div>
          </div>
        </div>

        {/* Texto de benefícios embaixo */}
        <div className="mt-10 p-4 rounded-lg shadow-md">
          <h3 className="text-white font-bold mb-2">
            Benefícios de investir em energia solar e mobilidade elétrica corporativa
          </h3>
          <p className="text-white">
            Empresas que adotam soluções sustentáveis não apenas reduzem custos operacionais,
            mas também fortalecem sua imagem de marca e se alinham às metas ESG (Environmental, Social and Governance).
          </p>
          <ul className="text-white mt-2 list-disc list-inside text-lg">
            <li>
              <strong>Redução de custos fixos:</strong> Sistemas fotovoltaicos podem reduzir até 90% da conta de energia do seu CNPJ.
            </li>
            <li>
              <strong>Retorno sobre o investimento:</strong> Payback médio entre 3 e 5 anos, com painéis de alta durabilidade (25+ anos).
            </li>
            <li>
              <strong>Valorização da marca:</strong> Projetos sustentáveis aumentam a credibilidade e atraem clientes e investidores.
            </li>
            <li>
              <strong>Pontos de carregamento elétrico:</strong> Prepare sua empresa para a nova era da mobilidade sustentável,
              oferecendo infraestrutura para veículos elétricos.
            </li>
            <li>
              <strong>Conformidade e sustentabilidade:</strong> Contribua para a redução de emissões de CO₂ e cumpra metas ambientais corporativas.
            </li>
          </ul>
          <p className="mt-4 text-white">
            Investir em energia solar e mobilidade elétrica é transformar sua empresa em referência de inovação, economia e responsabilidade ambiental.
          </p>
        </div>
      </section>


      <section className=" p-8 rounded-xl shadow-2xl mb-8 transition-all duration-300 hover:shadow-accent-300/10 flex justify-center">
        <Button label="Faça o Teste Agora" route="/Calculadora" />
      </section>

    </div>
  );
};

export default Home;
