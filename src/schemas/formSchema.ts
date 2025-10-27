import { z } from 'zod';

export const simuladorSchema = z.object({
  consumoMensal: z
    .string()
    .min(1, "Informe o consumo mensal.")
    .transform((val) => parseFloat(val.replace(",", "."))) ,

  cep: z
    .string()
    .min(8, "CEP Inválido. Digite os 8 números."),

  areaTelhado: z
    .string()
    .min(1, "Informe a área do telhado.")        
    .transform((val) => parseFloat(val.replace(",", "."))),

  areaUtil: z
    .string()
    .min(1, "Informe a área útil disponível.")   
    .transform((val) => parseFloat(val.replace(",", "."))) ,
}).refine((data) => data.areaUtil <= data.areaTelhado, {
  path: ['areaUtil'],
  message: "Área útil não pode ser maior que a área total do telhado.",
});
