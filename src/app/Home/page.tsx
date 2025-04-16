"use client";

import React from "react";
import Button from "../../components/Buttons/button";
import dynamic from "next/dynamic";

const ChartComponent = dynamic(() => import("@/components/Charts/PieChart"), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <div className="bg-sky-200 p-8">
      <h1 className="text-4xl font-bold text-sky-900 text-center mb-8">
        Energia Solar
      </h1>

      <section className="bg-blue-250 p-8 my-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-sky-900 mb-4">O que fazemos?</h2>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
          Nossa missão é clara: permitir que qualquer pessoa, de forma simples e
          acessível, possa entender o potencial de geração de energia solar em
          sua residência. Por meio de uma plataforma intuitiva, oferecemos uma
          análise prática que ajuda a visualizar como o uso da energia solar
          pode contribuir para um consumo mais consciente e sustentável. Criamos
          este projeto com o objetivo de tornar o conhecimento sobre energia
          solar mais próximo da realidade das pessoas. Sabemos que, muitas
          vezes, esse tipo de informação pode parecer técnico ou distante, por
          isso desenvolvemos uma ferramenta que facilita esse entendimento e
          ajuda na tomada de decisões. Acreditamos que, ao mostrar de forma
          clara e objetiva como a energia solar pode ser aproveitada em cada
          casa, podemos incentivar escolhas mais sustentáveis e inteligentes.
          Nosso propósito é empoderar o usuário, oferecendo informações úteis e
          acessíveis para promover um futuro com mais energia limpa e
          eficiência.
        </p>
      </section>

      <section className="bg-blue-200 p-8 my-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Por que investir em energia solar residencial?
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center lg:w-1/3">
            <h3 className="text-sky-900 font-bold mb-2">
              Impacto da Energia Solar
            </h3>
            <ChartComponent
              series={[40, 60]}
              labels={["Uso de Fontes Poluentes", "Energia Limpa"]}
              colors={["#ff7f50", "#22d3ee"]}
            />
          </div>
          <div className="flex flex-col items-center lg:w-1/3">
            <h3 className="text-sky-900 font-bold mb-2">
              Projeção de Economia Residencial
            </h3>
            <ChartComponent
              series={[30, 70]}
              labels={["Custo Atual", "Economia com Solar"]}
              colors={["#ff7f50", "#22d3ee"]}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md lg:w-1/3 mt-4 lg:mt-0">
            <h3 className="text-sky-900 font-bold mb-2">
              Benefícios de Investir em Energia Solar
            </h3>
            <p className="text-gray-700">
              De acordo com o Portal Solar, investir em energia solar traz
              diversos benefícios para o consumidor residencial:
            </p>
            <ul className="text-gray-700 mt-2 list-disc list-inside">
              <li>
                <strong>Economia na conta de luz:</strong> Um sistema solar pode
                reduzir até 95% dos custos com energia elétrica, gerando
                economia a longo prazo.
              </li>
              <li>
                <strong>Retorno garantido:</strong> O investimento se paga, em
                média, entre 4 a 6 anos, com vida útil dos painéis de até 25
                anos.
              </li>
              <li>
                <strong>Valorização do imóvel:</strong> Casas com energia solar
                se tornam mais atrativas no mercado e podem ter maior valor de
                venda.
              </li>
              <li>
                <strong>Baixa manutenção:</strong> Sistemas solares exigem pouca
                manutenção e têm alta durabilidade.
              </li>
              <li>
                <strong>Sustentabilidade na prática:</strong> Cada residência
                que adota energia solar ajuda a reduzir a emissão de CO₂ e o uso
                de fontes poluentes.
              </li>
            </ul>
            <p className="text-gray-700 mt-2">
              Investir em energia solar é unir economia, independência
              energética e cuidado com o meio ambiente.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sky-300 p-8 my-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center">
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-bold text-sky-900 mb-4">
            Como funciona?
          </h2>
          <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
            Nosso sistema de análise solar é simples e rápido. Você só precisa
            informar dados básicos sobre a localização e características da sua
            residência. Com essas informações, o sistema estima o potencial de
            geração de energia solar no local, ajudando você a entender como
            aproveitar melhor essa fonte limpa e econômica.
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
