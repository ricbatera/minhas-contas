import { Classificacao } from "./classificacao";
import { Devedor } from "./devedor";

export interface ParcelaApi {
    id: number,
    dataVencimento: string,
    dataPagamento: string,
    valor: number,
    valorPago: number,
    situacao: string,
    classificacao: Classificacao,
    devedor: Devedor | null
}
