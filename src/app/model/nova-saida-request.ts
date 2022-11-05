export interface NovaSaidaRequest {
    id: number | null,
    nome: string,
    obs: string,
    dataVencimento: string,
    qtdeParcelas: number,
    valor: number,
    meioPagto: string,
    cartaoSelecionado: number
}
