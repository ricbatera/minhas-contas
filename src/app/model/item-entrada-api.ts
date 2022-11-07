import { ContaBancaria } from "./conta-bancaria";
import { EntradaApi } from "./entrada-api";

export interface ItemEntradaApi {

    id: 1,
    dataPrevistaRecebimento: string,
    dataRecebimento: string | null,
    valor: number,
    valorRecebido: number | null,
    entrada: EntradaApi,
    situacao: string,
    conta: ContaBancaria
}
