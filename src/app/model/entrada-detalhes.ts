import { parcela } from "./item-lista-entrada";
import { contaBancaria } from "./model";

export interface entrada {
    id: number,
    dataRecebida: Date ,
    valorRecebido: number ,
    valoReceber: number,
    conta: contaBancaria | null
}


export interface EntradaDetalhes {
    id: number,
    descricao: string,
    observacao: string,
    parcela: parcela[],
}