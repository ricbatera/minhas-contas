import { CartaoCredito } from "./cartao-credito";
import { ContaBancaria } from "./conta-bancaria";
import { ParcelaApi } from "./parcela-api";

export interface FaturaApi {
    id: number,
    valorPago: number | null,
    valor: number,
    situacao: boolean,
    dataVencimento: string,
    dataPagamento: string | null | undefined,
    conta: ContaBancaria | null,
    cartao: CartaoCredito | null,
    itensFatura: ParcelaApi []
}
