export const mockDados = {
  getContas() {
    return [
      { id: 1, conta: "Itaú", descricao: "Conta Itaú Unibanco" },
      { id: 2, conta: "Santander", descricao: "Conta Santander" },
      { id: 3, conta: "Nubank", descricao: "Conta Itaú Nubank" },
      { id: 4, conta: "C6Bank", descricao: "Conta C6Bank" },
      { id: 5, conta: "bala", descricao: "Bala doce" },
    ]
  },
  getCartoes() {
    return [
      { id: 1, conta: "PicPay", descricao: "Cartão Debito" },
      { id: 2, conta: "NuBank", descricao: "Cartão Credito" },
      { id: 3, conta: "C6Bank", descricao: "Cartão Debito" },
      { id: 2, conta: "Bradesco", descricao: "Cartão Credito" },
    ]
  },
  getListaSaidas() {
    return [
      { id: 1, descricao: "Conta  de Luz", obs: "Conta de luz anual.", parcela: { id: 1, dataVencimento: "2022-10-28", dataPagamento: null, status: "Aberto", meioPagto: "Boleto / Débito", valor: 321.15, valorPago: null } },
      { id: 2, descricao: "Internet", obs: "Live TIM internet e telefone.", parcela: { id: 10, dataVencimento: "2022-10-28", dataPagamento: null, status: "Aberto", meioPagto: "Boleto / Débito", valor: 199.3, valorPago: null } },
    ]
  },
  getListaEntrada(){
    return[
      {id: 1, descricao:"Faculade", observacao:"faculdade mês de Outubro", valor: "99,99", prvisaoPagto: "2022-10-28",  parcela:"1 de 12"},
      {id: 2, descricao:"Faculade", observacao:"faculdade mês de Novembro", valor: "99,99",  prvisaoPagto: "2022-11-28", parcela:"2 de 12"}
    ]
  }
}


