import { ContaBancaria } from "./conta-bancaria";

export interface parcelaSaida {
    id:               number;
    dataPagamento:    null | string;
    dataVencimento:   string;
    valor:            number;
    valorPago:        number | null;
    conta:            ContaBancaria | null;
    situacao:         string;
    contagemParcelas: string;
}