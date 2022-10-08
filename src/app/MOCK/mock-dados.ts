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
    getListaEntrada() {
      return [
        { id: 1, descricao: "Faculade", observacao: "faculdade mês de Outubro", valor: "99,99", prvisaoPagto: "2022-10-28", parcela: "1 de 12" },
        { id: 2, descricao: "Casas Baiha", observacao: "faculdade mês de Novembro", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "2 de 12" },
        { id: 3, descricao: "Boleto Bradesco", observacao: "faculdade mês de Novembro", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "3 de 12" },
        { id: 4, descricao: "Boleto Lojas Cem", observacao: "faculdade mês de Novembro", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "4 de 12" },
        { id: 5, descricao: "Conta Mensal", observacao: "Conta de Internet", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "5 de 12" },
        { id: 6, descricao: "Conta Mensal", observacao: "Conta de Agúas", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "6 de 12" },
        { id: 7, descricao: "Conta Mensal", observacao: "Conta de Luz", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "7 de 12" },
        { id: 8, descricao: "Mercado Livre", observacao: "Compra de uma Jaqueta", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "8 de 12" },
        { id: 9, descricao: "Mercado Livre", observacao: "Compra de um Fone de Ouvido", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "9 de 12" },
        { id: 10, descricao: "Mercado Livre", observacao: "Compra de um Teclado", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "10 de 12" },
      ]
    }
  }


