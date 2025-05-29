import { z } from "zod";

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

  aquecimentoAgua: z.union([z.boolean(), z.literal("")]).optional(),

  usoArCondicionado: z.union([z.boolean(), z.literal("")]).optional(),
})
.refine((data) => data.areaUtil <= data.areaTelhado, {
  message: "A área útil não pode ser maior que a área do telhado.",
  path: ["areaUtil"],
});