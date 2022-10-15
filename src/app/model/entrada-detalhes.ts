import { parcela } from "./item-lista-entrada";


export interface EntradaDetalhes {
    id: number,
    descricao: string,
    observacao: string,
    parcela: parcela [],

}