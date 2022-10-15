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
        { id: 1, descricao: "Salário", observacao: "Salario AlmaViva",  parcela: { id: 1 , previsoaRecebimento: "2022-10-30",  valoReceber: 1121.35, dataRecebida: "2022-10-29", valorRecebido: 1121.35, parcela: "1 de 24", status:"Recebido", conta: "Santander"  } },
        { id: 1, descricao: "Faculdade", observacao: "Faculdade",  parcela: { id: 1 , previsoaRecebimento:  "2022-12-30",  valoReceber: 100.00, dataRecebida: null, valorRecebido: null, parcela: "1 de 24", status:"Pendente", conta: null  } },
        { id: 1, descricao: "Notebook Mac Pro", observacao: "Compra de um note pelas lojas Casa Bahia ",  parcela: { id: 1 , previsoaRecebimento:  "2022-8-30",  valoReceber: 11210.34, dataRecebida: null, valorRecebido: null, parcela: "1 de 24", status:"Atrasado", conta: null  } },
      ]
    }
  }


