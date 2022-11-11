export interface PagarFaturaRequest {
    idFatura: number | undefined,
    dataPagamento: string | undefined,
    valor:number | undefined,
    idConta: number | undefined | null,
    gerarParcelaComDiferenca: boolean,
    classificacaoId: number | undefined,
    associaDevedor: boolean,

}
