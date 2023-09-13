// Generated by https://quicktype.io

import { GrafParceladas } from "src/app/model/graf-parceladas";
import { GraficoMensal } from "src/app/model/grafico-mensal";
import { ItemListaSaidaApi } from "src/app/model/item-lista-saida-api";

export interface IdashboardState {
    cartoes:            Cartoe[];
    debitoBoleto:       DebitoBoleto[];
    devedores:          Devedore[];
    contas:             Conta[];
    totalSaidasDoMes:   number;
    totalEntradasDoMes: number;
    totalPagoDoMes:     number;
    totalRecebidoDoMes: number;
    totalEmBoletos:     number;
    minhasSaidas:       number;
    minhasEntradas:     number;
    saldo:              Saldo;
    saldoAcumulado:     number;
}

interface Cartoe {
    id:         number;
    valor:      number;
    vencimento: string;
    cartao:     Cartao;
    situacao:   boolean;
}

interface Cartao {
    id:            number;
    nome:          string;
    descricao:     string;
    diaVencimento: number;
    status:        boolean;
    dados:         Dados;
}

interface Dados {
}

interface Conta {
    id:     number;
    nome:   string;
    obs:    string;
    saldo:  number;
    status: boolean;
}

interface DebitoBoleto {
    id:         number;
    valor:      number;
    vencimento: string;
    saida:      Saida;
    situacao:   string;
}

interface Saida {
    id:         number;
    nome:       string;
    obs:        string;
    dataCompra: null | string;
    meioPagto:  string;
}


interface Devedore {
    devedor:  Devedor;
    parcelas: Parcela[];
    total:    number;
}

interface Devedor {
    id:     number;
    nome:   string;
    status: boolean;
}

interface Parcela {
    id:                      number;
    dataPrevistaRecebimento: string;
    dataRecebimento:         null | string;
    valor:                   number;
    valorRecebido:           number | null;
    situacao:                ParcelaSituacao;
}

enum ParcelaSituacao {
    Aberto = "Aberto",
    Recebido = "Recebido",
}

interface Saldo {
    totalSaidas:   number;
    totalEntradas: number;
    saldo:         number;
}


// saidas

export interface Isaidas {
    lista: ItemListaSaidaApi[]
}

export interface ICategoriaPeriod {
    categorias: string[];
    valores:    number[];
}

// grafico mensal
export interface IGraficoMensal{
    loading: boolean;
    data: GraficoMensal[];
}

export interface IGraficoParceladas{
    loading: boolean;
    data: GrafParceladas[];
}
