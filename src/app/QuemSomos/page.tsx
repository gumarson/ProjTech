"use client";

import React from "react";

const QuemSomos: React.FC = () => {
  return (
    <div className="bg-green-100 p-8">
      <section className="bg-green-200 p-8 my-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-900 mb-4">Sobre nós</h2>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
          A nossa história começou em 2024, quando quatro colegas se uniram para desenvolver um projeto universitário voltado à sustentabilidade. Apesar de não se conhecerem antes do projeto, eles rapidamente descobriram uma paixão em comum: a preservação do meio ambiente. Cada um trazia consigo experiências distintas, desde desenvolvimento de software até práticas ecológicas, mas o que realmente os uniu foi a vontade de contribuir de forma significativa para a melhoria do planeta.
          <br /><br />
          Assim nasceu nossa start-up, focada na qualidade de vida e na preservação ambiental. A empresa, que começou como um simples trabalho de faculdade, cresceu com o objetivo de se tornar uma referência em soluções sustentáveis. Hoje, acreditamos que o futuro do planeta depende de pequenas atitudes somadas, e estamos aqui para ajudar as pessoas a entenderem seu impacto e como podem fazer a diferença.
        </p>
      </section>

      <section className="bg-green-300 p-8 my-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-900 mb-4">Nossa missão</h2>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
          A nossa missão vai além de simplesmente fornecer uma ferramenta para medir emissões de carbono. Queremos criar um movimento em prol da sustentabilidade, onde cada indivíduo possa reconhecer a importância de suas escolhas diárias e como elas afetam o planeta. Sabemos que a preservação ambiental é um desafio global, e acreditamos que cada pessoa pode ser parte da solução. Nosso objetivo é conscientizar e educar, oferecendo uma plataforma que transforma dados complexos em informações acessíveis e úteis para qualquer pessoa, independentemente de seu nível de conhecimento sobre o tema.
          <br /><br />
          Na prática, isso significa proporcionar uma experiência fácil e intuitiva, onde o usuário pode rapidamente calcular sua pegada de carbono e, a partir disso, adotar ações práticas para reduzir esse impacto.
        </p>
      </section>

      <section className="bg-green-400 p-8 my-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Por que Calcular sua Pegada de Carbono?
        </h2>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
          Estamos comprometidos com um futuro mais verde e sustentável. Não se trata apenas de oferecer uma ferramenta de cálculo; queremos criar uma verdadeira cultura de sustentabilidade, incentivando hábitos que beneficiem o meio ambiente e melhorem a qualidade de vida de todos. Acreditamos que a educação e o acesso a informações claras sobre o impacto ambiental são essenciais para o combate às mudanças climáticas, e estamos aqui para facilitar essa jornada.
        </p>
      </section>
    </div>
  );
};

export default QuemSomos;
