import { Injectable } from '@angular/core';
import { ItemListaSaidaApi } from '../model/item-lista-saida-api';

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

  filtaItensDevedor(devedor: string, lista: ItemListaSaidaApi[]){
    return lista
    .filter(v => v.devedorNome == devedor)
  }
}

