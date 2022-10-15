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
      { id: 1, cartao: "PicPay", descricao: "Cartão Debito" },
      { id: 2, cartao: "NuBank", descricao: "Cartão Credito" },
      { id: 3, cartao: "C6Bank", descricao: "Cartão Debito" },
      { id: 2, cartao: "Bradesco", descricao: "Cartão Credito" },
    ]
  },
  getListaSaidas() {
    return [
      { id: 1, descricao: "Conta  de Luz", obs: "Conta de luz anual. Mussum Ipsum, cacilds vidis litro abertis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!Casamentiss faiz malandris se pirulitá.Viva Forevis aptent taciti sociosqu ad litora torquent.Cevadis im ampola pa arma uma pindureta.", parcela: { id: 1, dataVencimento: "2022-10-28", dataPagamento: null, status: "Aberto", meioPagto: "Boleto / Débito", valor: 1321.15, valorPago: null, parcela:"2 de 3" } },
      { id: 2, descricao: "Internet", obs: "Live TIM internet e telefone.", parcela: { id: 10, dataVencimento: "2022-10-28", dataPagamento: null, status: "Atrasado", meioPagto: "Boleto / Débito", valor: 199.3, valorPago: null, parcela:"2 de 3" } },
      { id: 3, descricao: "Celular", obs: "Contade celular claro.", parcela: { id: 11, dataVencimento: "2022-10-28", dataPagamento: "2022-10-27", status: "Pago", meioPagto: "Boleto / Débito", valor: 199.3, valorPago: 200, parcela:"2 de 3" } },
    ]
  },
    getListaEntrada() {
      return [
        { id: 1, descricao: "Salário", observacao: "salario da Alma Viva", valor: 1121.35, prvisaoPagto: "2022-10-28", parcela: "1 de 12" },
        { id: 2, descricao: "Concerto Note Bia", observacao: "troca de memória do note da bianca", valor: 399.99, prvisaoPagto: "2022-11-28", parcela: "2 de 12" },
        { id: 3, descricao: "Ponto Nivelo", observacao: "Pontos referente ao mês de setembro", valor: 899.80, prvisaoPagto: "2022-11-28", parcela: "3 de 12" },
        { id: 4, descricao: "Bob", observacao: "dineiro que emprestei pro BOB", valor: 99.99, prvisaoPagto: "2022-11-28", parcela: "4 de 12" },
        { id: 5, descricao: "Geladeira Mãe", observacao: "Parcela da geladeira que tirei pra mãe", valor: 239, prvisaoPagto: "2022-11-28", parcela: "5 de 12" },
        // { id: 6, descricao: "Conta Mensal", observacao: "Conta de Agúas", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "6 de 12" },
        // { id: 7, descricao: "Conta Mensal", observacao: "Conta de Luz", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "7 de 12" },
        // { id: 8, descricao: "Mercado Livre", observacao: "Compra de uma Jaqueta", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "8 de 12" },
        // { id: 9, descricao: "Mercado Livre", observacao: "Compra de um Fone de Ouvido", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "9 de 12" },
        // { id: 10, descricao: "Mercado Livre", observacao: "Compra de um Teclado", valor: "99,99", prvisaoPagto: "2022-11-28", parcela: "10 de 12" },
      ]
    }
  }


