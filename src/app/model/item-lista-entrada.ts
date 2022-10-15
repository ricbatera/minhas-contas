export interface itemListaEntrada{
  id: number,
  descricao: string,
  observacao: string,
  parcela: {
    status: string,
    parcela: string,
    previsoaRecebimento: Date ,
   dataRecebida: Date ,
    valoReceber: number,
    valorRecebido: number ,
    conta: string,
  }
}
