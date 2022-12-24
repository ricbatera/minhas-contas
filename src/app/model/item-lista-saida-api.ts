import { ContaBancaria } from "./conta-bancaria";
import { FaturaApi } from "./fatura-api";
import { SaidaApi } from "./saida-api";

export interface ItemListaSaidaApi {
    id: number,
    dataVencimento: string,
    dataPagamento: string | null,
    valor: number,
    valorPago: number | null,
    situacao: string,
    fatura: FaturaApi | null,
    saida: SaidaApi,
    conta: ContaBancaria | null,
    contagemParcelas: string,
    devedorNome: string | null
    classificacaoNome: string
}
