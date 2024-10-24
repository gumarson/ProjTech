"use client";

import React from "react";
import Button from "../../components/Buttons/button";
import ChartComponent from "@/components/Charts/PieChart";

const Home: React.FC = () => {
  return (
    <div className="bg-green-100 p-8">
      {/* Título da Página */}
      <h1 className="text-4xl font-bold text-green-900 text-center mb-8">
        Emissão de CO₂ e Previsões Futuras
      </h1>

      {/* Seção O que fazemos? */}
      <section className="bg-green-250 p-8 my-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          O que fazemos?
        </h2>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
          Nossa missão é clara: permitir que qualquer pessoa, de forma simples e
          acessível, tenha a oportunidade de entender sua emissão de carbono.
          Através de uma calculadora prática e informativa, oferecemos a chance
          de descobrir como suas atividades diárias contribuem para a emissão de
          CO₂. Sabemos que, para muitas pessoas, esse tipo de informação pode
          ser complicada ou inacessível, e por isso criamos uma ferramenta que
          facilita esse entendimento. A empresa foi fundada com a ideia de
          tornar o processo de conscientização ambiental mais prático e direto.
          Queremos mostrar que calcular sua própria pegada de carbono não
          precisa ser algo complexo – e que a partir dessas informações, é
          possível tomar decisões mais sustentáveis no dia a dia. Nossa proposta
          é dar poder às pessoas, mostrando de forma clara e objetiva o impacto
          de suas escolhas e como pequenas mudanças podem contribuir para um
          planeta mais saudável.
        </p>
      </section>

      {/* Seção dos Gráficos */}
      <section className="bg-green-200 p-8 my-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Gráficos de Emissão de CO₂
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center lg:w-1/3">
            <h3 className="text-green-900 font-bold mb-2">Gráfico CO₂ Brasil</h3>
            <ChartComponent
              series={[27, 73]}
              labels={["Emissão Atual", "Redução"]}
              title="Gráfico CO₂ Brasil"
              colors={["#034732", "#81c784"]}
            />
          </div>
          <div className="flex flex-col items-center lg:w-1/3">
            <h3 className="text-green-900 font-bold mb-2">
              Previsão para os próximos 50 anos
            </h3>
            <ChartComponent
              series={[54, 46]}
              labels={["Manutenção", "Redução Prevista"]}
              title="Previsão para os próximos 50 anos"
              colors={["#034732", "#81c784"]}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md lg:w-1/3 mt-4 lg:mt-0">
            <h3 className="text-green-900 font-bold mb-2">
              Análise das Emissões de CO₂: Passado e Futuro
            </h3>
            <p className="text-gray-700">
              O gráfico de emissões no Brasil mostra como setores como energia,
              transporte e desmatamento têm impactado as emissões de carbono nas
              últimas décadas. O Brasil representa cerca de 3% das emissões
              globais, com destaque para o desmatamento e a agropecuária.
            </p>
            <p className="text-gray-700 mt-2">
              Já o gráfico de projeções aponta possíveis cenários para os
              próximos 50 anos. Com políticas de energia renovável, as emissões
              podem cair significativamente. Sem ações, o aumento das emissões
              poderá agravar ainda mais as mudanças climáticas.
            </p>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona com Botão */}
      <section className="bg-green-300 p-8 my-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center">
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Como funciona?
          </h2>
          <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
            Nossa calculadora de emissões de carbono é simples e rápida. Você só
            precisa inserir informações sobre suas atividades diárias, como
            transporte, consumo de energia e hábitos gerais. Com base nesses
            dados, o sistema calcula automaticamente sua pegada de carbono e
            mostra o impacto ambiental que você gera.
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button label="Faça o Teste Agora" route="/Calculadora" />
        </div>
      </section>
    </div>
  );
};

export default Home;
