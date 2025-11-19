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

      <section className="p-8 rounded-xl mb-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Nossa Missão
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto mb-12">
          Nossa missão é democratizar o acesso à energia limpa e à mobilidade elétrica para empresas em todo o Brasil. Acreditamos que a sustentabilidade é um pilar para o crescimento, por isso, oferecemos soluções inteligentes que reduzem custos, fortalecem a marca e preparam seu negócio para um futuro mais verde e competitivo.
        </p>
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Coluna 1: Visão Geral */}
          <div className="flex-1 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-3">Soluções Integradas</h3>
            <p className="text-gray-300 leading-relaxed">
              Nossa plataforma conecta empresas a um futuro mais verde e econômico. Facilitamos a transição para a energia solar e a implementação de infraestrutura de recarga para veículos elétricos, transformando sustentabilidade em um diferencial competitivo.
            </p>
          </div>

          {/* Coluna 2: Energia Solar */}
          <div className="flex-1 p-6 rounded-lg ">
            <h3 className="text-2xl font-bold text-white mb-3">Energia Solar para empresas</h3>
            <p className="text-gray-300 leading-relaxed">
              Oferecemos uma análise completa para a instalação de painéis solares em sua empresa. Reduza drasticamente seus custos com eletricidade, gere sua própria energia limpa e valorize seu imóvel com uma solução de alto retorno sobre o investimento.
            </p>
          </div>

          {/* Coluna 3: Postos Elétricos */}
          <div className="flex-1 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-3">Pontos de Recarga Elétrica</h3>
            <p className="text-gray-300 leading-relaxed">
              Prepare sua empresa para a revolução da mobilidade elétrica. Desenvolvemos e instalamos pontos de recarga para veículos elétricos, atraindo novos clientes e posicionando sua marca como líder em inovação e sustentabilidade.
            </p>
          </div>
        </div>
      </section>

      <section className="p-8 rounded-xl mb-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6 pb-4">
          Por que investir em energia sustentável para sua empresa?
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
          {/* Gráficos lado a lado */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="text-white text-xl font-bold mb-2">
             Crescimento da Geração de Energia Solar - Brasil (2023–2025)
            </h3>
            <div className="w-full max-w-lg">
              <ChartComponent
                series={[61, 39]}
                labels={["Outras Fontes", "Crescimento Solar"]}
                colors={["#475569", "#fbbf24"]}
                height={400}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="text-white text-xl font-bold mb-2">
              Redução Média de Custos Empresariais (2024–2025)
            </h3>
            <div className="w-full max-w-lg">
              <ChartComponent
                series={[20, 80]}
                labels={["Custo Anterior", "Economia com Solar"]}
                colors={["#64748b", "#22d3ee"]}
                height={400}
              />
            </div>
          </div>
        </div>

        {/* Texto de benefícios embaixo */}
        <div className="mt-10 p-4 rounded-lg">
          <h3 className="text-white text-2xl font-bold mb-2">
            Benefícios de investir em energia solar e mobilidade elétrica corporativa
          </h3>
          <p className="text-white text-2xl">
            Empresas que adotam soluções sustentáveis não apenas reduzem custos operacionais,
            mas também fortalecem sua imagem de marca e se alinham às metas ESG (Environmental, Social and Governance).
          </p>
          <ul className="text-white mt-4 space-y-2 list-disc list-inside text-2xl">
            <li>
              <strong>Redução de custos fixos:</strong> Sistemas fotovoltaicos podem reduzir até 90% da conta de energia da.
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
          <p className="mt-4 text-white text-2xl">
            Investir em energia solar e mobilidade elétrica é transformar sua empresa em referência de inovação, economia e responsabilidade ambiental.
          </p>
        </div>
      </section>
    
       <section className=" p-8 rounded-xl mb-8 flex justify-center">
        <Button label="Faça o Teste Agora" route="Calculadora?openSearch=true"/>
      </section>

    </div>
  );
};

export default Home;
