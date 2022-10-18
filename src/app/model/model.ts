export interface parcela {
    id: number,
    dataPagamento: string | null,
    dataVencimento: string,
    situacao: string,
    valor: number,
    valorPago: number | null,
    contaBancaria?: contaBancaria | null,
    parcela: string
}

export interface contaBancaria {
    id: number,
    conta: string,
    descricao: string,
    ativo: true
}

export interface cartao {
    id: number,
    cartao: string,
    descricao: string,
    ativo: boolean
}