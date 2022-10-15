import { cartao, parcela } from "./model"

export interface SaidaDetalhes {
    id: number,
    nome: string,
    obs: string,
    parcela: parcela [],
    meioPagamento: string,
    cartao?: cartao
}


