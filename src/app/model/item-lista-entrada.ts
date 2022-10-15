import { contaBancaria } from "./model";

export interface itemListaEntrada {
  id: number,
  descricao: string,
  observacao: string,
  parcela: parcela
}

export interface parcela {
  id: number,
  status: string,
  previsoaRecebimento: Date,
  valoReceber: number ,
  dataRecebida: Date | null,
  valorRecebido: number| null,
  conta: contaBancaria | null
}
