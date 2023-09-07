import { Injectable } from '@angular/core';
import { ItemEntradaApi } from '../model/item-entrada-api';
import { ItemListaSaidaApi } from '../model/item-lista-saida-api';
import { filtrosEntradas } from '../sistema/sistema/entradas/lista-entradas/lista-entradas.component';
import { filtros } from '../sistema/sistema/saidas/lista-saidas/lista-saidas.component';
import { Store } from '@ngrx/store';
import { filtrosPesquisaMesAno } from '../sistema/store/sistema.actions';
import { ParamMesAno } from '../model/filtroMesAno';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  constructor(private store:Store) { }

  filtraDevedores(lista: any[]) {
    return lista
      .filter(v => v.devedorNome != null)
      .map(v => v.devedorNome)
      .filter((v, i, arr) => arr.indexOf(v) === i);
  }
  filtraDevedoresEntrada(lista: ItemEntradaApi[]) {
    return lista
      .filter(v => v.devedor.nome != null)
      .map(v => v.devedor.nome)
      .filter((v, i, arr) => arr.indexOf(v) === i);
  }

  filtraMeioPagto(lista: any[]) {
    let result: any[] = lista
      .map(v => this.debitoOrCartao(v))
      .filter((v, i, arr) => arr.indexOf(v) === i);
      return result;
  }

  filtaClassificacao(lista: any[]){
    return lista
    .map(v=> v.classificacaoNome)
    .filter((v, i, arr) => arr.indexOf(v) === i);
  }

  filtaClassificacaoEntrada(lista: ItemEntradaApi[]){
    return lista
    .map(v=> v.classificacao.nome)
    .filter((v, i, arr) => arr.indexOf(v) === i);
  }

  filtrar(p: filtros, lista: ItemListaSaidaApi[]) {
    if (p.devedor != 'Todos') {
      lista = lista.filter(v => v.devedorNome == p.devedor)
    }

    if (p.meioPagto != 'Todos') {
      if (p.meioPagto == 'Débito / Boleto') {
        lista = lista.filter(v => v.saida.meioPagto == 'debito')
      } else {
        lista = lista.filter(v => v.fatura?.cartao?.nome == p.meioPagto)
      }
    }

    if (p.classificacao != 'Todas') {
      lista = lista.filter(v => v.classificacaoNome == p.classificacao)
    }

    return lista;
  }

  filtarEntrada(p: filtrosEntradas, lista:ItemEntradaApi[]){
    if(p.devedor != "Todos"){
      lista = lista.filter(v => v.devedor.nome == p.devedor)
    }
    if (p.classificacao != 'Todas') {
      lista = lista.filter(v => v.classificacao.nome == p.classificacao)
    }
    return lista;
  }

  defineFiltroMesAnoInicial(){
    //aqui vou definir a data inicial como hoje e data final daqui um ano
    let hoje = new Date();
    let anoInicial = hoje.getFullYear()
    let mesInicial = hoje.getMonth()+1;

    let payload: ParamMesAno = {
      mesStart: hoje.getMonth()+1,
      anoStart: hoje.getFullYear(),
      mesEnd: hoje.getMonth()+1,
      anoEnd: hoje.getFullYear()+1,
      idDevedor: 0
    }
    this.store.dispatch(filtrosPesquisaMesAno({payload}));
  }

  capitalize(word: String){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private debitoOrCartao(item: ItemListaSaidaApi) {
    if (item.fatura != null) {
      return item.fatura.cartao?.nome
    } else {
      return "Débito / Boleto"
    }
  }
}

