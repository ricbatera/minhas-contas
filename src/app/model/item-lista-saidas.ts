import { cartao, parcela } from "./model";

export interface ItemListaSaida {
    id: number,
    descricao:string,
    obs: string,
    parcela: parcela,
    meioPagamento: string,
    cartao: cartao | null
}