"use client";

import React from "react";

const QuemSomos: React.FC = () => {
  return (
    <div className="p-8">
      <section className="p-8 my-4 rounded-lg shadow-2xl transition-all duration-300 hover:shadow-accent-300/10">
        <h2 className="text-3xl font-bold text-white mb-4">Sobre nós</h2>
        <p className="text-lg text-gray-300 leading-relaxed p-4 rounded-lg">
          Somos uma equipe dedicada a soluções sustentáveis para empresas. Nosso foco é facilitar a implantação de painéis solares em CNPJs, tornando o acesso à energia limpa mais simples, econômica e eficiente para negócios de todos os portes. 
          Além disso, estamos desenvolvendo pontos de carregamento elétrico para veículos, promovendo a mobilidade sustentável e preparando empresas para o futuro da eletrificação. 
          Unimos tecnologia, inovação e responsabilidade ambiental para ajudar nossos clientes a reduzir custos, valorizar seus espaços e contribuir para um planeta mais limpo. 
          Oferecemos informações claras, suporte especializado e ferramentas práticas para que cada empresa possa tomar decisões conscientes e investir em energia renovável com segurança. 
          Nosso compromisso é transformar o setor empresarial, conectando sustentabilidade e crescimento econômico, e impulsionar a adoção de soluções inteligentes que beneficiam tanto o negócio quanto a sociedade.
        </p>
      </section>
    </div>
  );
};

export default QuemSomos;