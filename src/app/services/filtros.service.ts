import { Injectable } from '@angular/core';
import { ItemListaSaidaApi } from '../model/item-lista-saida-api';
import { filtros } from '../sistema/sistema/saidas/lista-saidas/lista-saidas.component';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  constructor() { }

  filtraDevedores(lista: any[]) {
    return lista
      .filter(v => v.devedorNome != null)
      .map(v => v.devedorNome)
      .filter((v, i, arr) => arr.indexOf(v) === i);
  }

  filtraMeioPagto(lista: any[]) {
    let result: any[] = lista
      .map(v => this.debitoOrCartao(v))
      .filter((v, i, arr) => arr.indexOf(v) === i);
      return result;
  }

  filtaClassificacao(lista: ItemListaSaidaApi[]){
    return lista
    .map(v=> v.classificacaoNome)
    .filter((v, i, arr) => arr.indexOf(v) === i);
  }

  filtrar(p: filtros, lista: ItemListaSaidaApi[]) {
    if (p.devedor != 'Todos') {
      lista = lista.filter(v => v.devedorNome == p.devedor)
    }

    if (p.meioPagto != 'Todos') {
      if (p.meioPagto == 'Débito / Boleto') {
        lista = lista.filter(v => v.saida.nome == 'debito')
      } else {
        lista = lista.filter(v => v.fatura?.cartao?.nome == p.meioPagto)
      }
    }

    if (p.classificacao != 'Todas') {
      lista = lista.filter(v => v.classificacaoNome == p.classificacao)
    }

    return lista;
  }

  private debitoOrCartao(item: ItemListaSaidaApi) {
    if (item.fatura != null) {
      return item.fatura.cartao?.nome
    } else {
      return "Débito / Boleto"
    }
  }
}

