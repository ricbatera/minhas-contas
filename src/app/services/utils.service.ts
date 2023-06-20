import { Injectable } from '@angular/core';
import { Classificacao } from '../model/classificacao';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  ordenarCategoria(a:Classificacao, b: Classificacao){
    if(a.nome > b.nome){
      return 1;
    }
    if(a.nome < b.nome){
      return -1;
    }
    return 0;
  }
}
