export interface parcela {
    id: number,
    dataPagamento: Date | null,
    dataVencimento: Date,
    situacao: string,
    valor: number,
    valorPago: number | null,
    contaBancaria?: contaBancaria | null
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