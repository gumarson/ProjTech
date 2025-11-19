export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; 
  uf: string;         
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function getAddressByCep(cep: string): Promise<ViaCepResponse | null> {
  try {
    const sanitizedCep = cep.replace(/\D/g, ''); 
    const response = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);

    if (!response.ok) throw new Error('Erro ao buscar o CEP.');

    const data = await response.json();

    if (data.erro) return null; 

    return data as ViaCepResponse;
  } catch (error) {
    console.error('Erro no viaCepService:', error);
    return null;
  }
}
