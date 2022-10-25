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
  previsaoRecebimento: string,
  valoReceber: number ,
  dataRecebida: string | null,
  valorRecebido: number| null,
  conta: contaBancaria | null,
  parcela: string 
}
