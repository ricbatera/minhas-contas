import { ItemListaSaida } from "../model/item-lista-saidas"
import { cartao, contaBancaria, fatura, parcela } from "../model/model"
import { SaidaDetalhes } from "../model/saida-detalhes"
import { EntradaDetalhes } from "../model/entrada-detalhes"
import { itemListaEntrada } from "../model/item-lista-entrada";

let listaContas: contaBancaria[] = [
  { id: 1, conta: "Itaú", descricao: "Conta Itaú Unibanco", ativo: true },
  { id: 2, conta: "Santander", descricao: "Conta Santander", ativo: true },
  { id: 3, conta: "Nubank", descricao: "Conta Itaú Nubank", ativo: true },
  { id: 4, conta: "C6Bank", descricao: "Conta C6Bank", ativo: true },
  { id: 5, conta: "bala", descricao: "Bala doce", ativo: false },
];

let listaCartoes: cartao[] = [
  { id: 1, cartao: "PicPay", descricao: "Cartão Debito", ativo: true },
  { id: 2, cartao: "NuBank", descricao: "Cartão Credito", ativo: true },
  { id: 3, cartao: "C6Bank", descricao: "Cartão Debito", ativo: true },
  { id: 2, cartao: "Bradesco", descricao: "Cartão Credito", ativo: false },
];

let listaSaidas: ItemListaSaida[] = [
  { id: 1, idFatura: null, cartao: null, descricao: "Conta  de Luz", obs: "Conta de luz anual. Mussum Ipsum, cacilds vidis litro abertis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!Casamentiss faiz malandris se pirulitá.Viva Forevis aptent taciti sociosqu ad litora torquent.Cevadis im ampola pa arma uma pindureta.", meioPagamento: "Boleto / Débito", parcela: { id: 1, dataVencimento: "2022-10-28", dataPagamento: null, situacao: "Aberto", valor: 1321.15, valorPago: null, parcela: "2 de 3" } },
  { id: 2, idFatura: null, cartao: null, descricao: "Internet", obs: "Live TIM internet e telefone.", meioPagamento: "Boleto / Débito", parcela: { id: 10, dataVencimento: "2022-10-28", dataPagamento: null, situacao: "Atrasado", valor: 199.3, valorPago: null, parcela: "2 de 3" } },
  { id: 3, idFatura: null, cartao: null, descricao: "Celular", obs: "Contade celular claro.", meioPagamento: "Boleto / Débito", parcela: { id: 11, dataVencimento: "2022-10-28", dataPagamento: "2022-10-27", situacao: "Pago", valor: 199.3, valorPago: 200, parcela: "2 de 3", contaBancaria: { id: 1, conta: "Itaú", descricao: "Conta Itaú Unibanco", ativo: true } } },
  { id: 4, idFatura: null, cartao: { id: 1, cartao: "PicPay", descricao: "Cartão Debito", ativo: true }, descricao: "Game Stick", obs: "Compra do Game Stick pelo AliExpress", meioPagamento: "Cartão  de Crédito", parcela: { id: 12, dataVencimento: "2022-10-28", dataPagamento: "2022-10-27", situacao: "Pago", valor: 73.25, valorPago: 73.25, parcela: "1 de 2", contaBancaria: null } },
  { id: 5, idFatura: 2, cartao: { id: 1, cartao: "PicPay", descricao: "Cartão Debito", ativo: true }, descricao: "Game Stick", obs: "Compra do Game Stick pelo AliExpress", meioPagamento: "Cartão  de Crédito", parcela: { id: 13, dataVencimento: "2022-12-15", dataPagamento: null, situacao: "Aberto", valor: 73.25, valorPago: null, parcela: "2 de 2", contaBancaria: null } },
  { id: 6, idFatura: 1, cartao: { id: 3, cartao: "C6Bank", descricao: "Cartão Debito", ativo: true }, descricao: "Geladeira", obs: "Teste de fatura de cartão", meioPagamento: "Cartão  de Crédito", parcela: { id: 14, dataVencimento: "2022-10-09", dataPagamento: null, situacao: "Atrasado", valor: 573.25, valorPago: null, parcela: "2 de 10", contaBancaria: null } },
  { id: 7, idFatura: 1, cartao: { id: 3, cartao: "C6Bank", descricao: "Cartão Debito", ativo: true }, descricao: "Batedeira Planetária", obs: "Teste de fatura de cartão item 2", meioPagamento: "Cartão  de Crédito", parcela: { id: 15, dataVencimento: "2022-10-09", dataPagamento: null, situacao: "Atrasado", valor: 573.25, valorPago: null, parcela: "2 de 10", contaBancaria: null } },
  { id: 8, idFatura: 1, cartao: { id: 3, cartao: "C6Bank", descricao: "Cartão Debito", ativo: true }, descricao: "Torradeira", obs: "Teste de fatura de cartão item 3", meioPagamento: "Cartão  de Crédito", parcela: { id: 15, dataVencimento: "2022-10-09", dataPagamento: null, situacao: "Atrasado", valor: 573.25, valorPago: null, parcela: "2 de 10", contaBancaria: null } },
]

let faturaC6: fatura[] = [{
  id: 1,
  cartao: { id: 3, cartao: "C6Bank", descricao: "Cartão Debito", ativo: true },
  dataVenvimento: '2022-10-09',
  situacao: 'Atrasado',
  valor: 1719.75,
  valorPago: null,
  itens: getTeste()
}]

function getTeste() {
  const parcelas: parcela[] = []
  listaSaidas.forEach(el => { if (el.cartao?.id == 3) parcelas.push(el.parcela) })
  return parcelas;
}

export const mockDados = {
  getContas() {
    return listaContas.filter(el => el.ativo);
  },

  getCartoes() {
    return listaCartoes.filter(el => el.ativo);
  },

  getListaSaidas() {
    return listaSaidas;
  },

  getFatura(idFatura: number | null) {
    let fat;
    // let fat: fatura;
    faturaC6.forEach(el => { if (el.id == idFatura) fat = el })
    return fat;
  },

  getSaidaDetalhes() {
    const payload: SaidaDetalhes =
    {
      id: 1, nome: 'Game Stick', obs: 'Compra de game stick no Aliexpress', meioPagamento: 'cartao', cartao: { id: 2, cartao: "NuBank", descricao: "Cartão Credito", ativo: true },
      parcela: [
        { id: 1, dataPagamento: "2022-10-15", dataVencimento: "2022-10-15", situacao: "Pago", valor: 53.15, valorPago: 53.15, contaBancaria: null, parcela: '1/3' },
        { id: 2, dataPagamento: null, dataVencimento: "2022-11-15", situacao: "Aberto", valor: 53.15, valorPago: null, contaBancaria: null, parcela: '1/3' },
        { id: 3, dataPagamento: null, dataVencimento: "2022-12-15", situacao: "Aberto", valor: 53.15, valorPago: null, contaBancaria: null, parcela: '1/3' },
      ]
    }
    return payload;
  },
  getListaEntrada() {
    const payload: itemListaEntrada[] = [
      { id: 1, descricao: "Salário", observacao: "Salario AlmaViva", parcela: { id: 1, previsaoRecebimento: "2022-10-30", valoReceber: 1121.35, dataRecebida: "2022-10-29", valorRecebido: 1121.35, parcela: "1 de 24", status: "Recebido", conta: { id: 1, conta: "Itaú", descricao: "Conta Itaú Unibanco", ativo: true } } },
      { id: 2, descricao: "Faculdade", observacao: "Faculdade", parcela: { id: 10, previsaoRecebimento: "2022-12-30", valoReceber: 100.00, dataRecebida: null, valorRecebido: null, parcela: "1 de 24", status: "Pendente", conta: null } },
      { id: 3, descricao: "Notebook Mac Pro", observacao: "Compra de um note pelas lojas Casa Bahia ", parcela: { id: 30, previsaoRecebimento: "2022-8-30", valoReceber: 11210.34, dataRecebida: null, valorRecebido: null, parcela: "1 de 24", status: "Atrasado", conta: null } },
    ]
    return payload;
  },
  getEntradaDetalhes() {
    const payload: EntradaDetalhes =
    {
      id: 1, descricao: "Guarda Roupa", observacao: "Guarda roupa compradado de presente de casamento", parcela: [
        { id: 1, status: "Pago", previsaoRecebimento: '2022-11-15', dataRecebida: '2022-11-20', parcela: "1 de 24",valorRecebido: 2000.00, valoReceber: 7000.00, conta: { id: 2, conta: "Santander", descricao: "Conta Santander", ativo: true } },
        { id: 2, status: "Pendente", previsaoRecebimento: '2022-12-15', dataRecebida: null, valorRecebido: null, valoReceber: 7000.00, conta: null,parcela: "1 de 24" },
        { id: 3, status: "Pendente", previsaoRecebimento: '2022-13-15', dataRecebida: null, valorRecebido: null, valoReceber: 7000.00, conta: null, parcela: "1 de 24" },

      ]

    }
    return payload;
  },

  inativarConta(id: number) {
    listaContas.forEach(el => { if (el.id == id) el.ativo = false });
  }
}
