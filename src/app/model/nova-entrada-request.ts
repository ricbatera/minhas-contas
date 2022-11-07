export interface NovaEntradaRequest {
    id: number | null,
    nome: string,
    obs: string,
    dataPrevistaRecebimento: string,
    qtdeParcelas: number,
    idConta: number,
    valor: number,
    recebido: boolean
}
