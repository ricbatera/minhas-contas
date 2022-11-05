export interface PagarFaturaRequest {
    idFatura: number,
    dataPagamento: string,
    valor:number,
    idConta: number,
    gerarParcelaComDiferenca: boolean
}
