import { Classificacao } from "./classificacao";
import { ContaBancaria } from "./conta-bancaria";
import { Devedor } from "./devedor";
import { EntradaApi } from "./entrada-api";

export interface ItemEntradaApi {

    id: 1,
    dataPrevistaRecebimento: string,
    dataRecebimento: string | null,
    valor: number,
    valorRecebido: number | null,
    entrada: EntradaApi,
    situacao: string,
    conta: ContaBancaria,
    devedor: Devedor,
    classificacao: Classificacao
}
