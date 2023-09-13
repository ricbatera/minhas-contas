import { Injectable } from '@angular/core';
import { Classificacao } from '../model/classificacao';
import { from, of } from 'rxjs';
import { meses } from '../model/meses';

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
  public getMeses = of(this.mesesFull());
  private mesesFull(): meses[]{
    return[
      {id:1, mes:"Janeiro"},
      {id:2, mes:"Fevereiro"},
      {id:3, mes:"Março"},
      {id:4, mes:"Abril"},
      {id:5, mes:"Maio"},
      {id:6, mes:"Junho"},
      {id:7, mes:"Julho"},
      {id:8, mes:"Agosto"},
      {id:9, mes:"Setembro"},
      {id:10, mes:"Outubro"},
      {id:11, mes:"Novembro"},
      {id:12, mes:"Dezembro"}
    ]
  }
  public getAnos = of(this.anosList()) 
  private anosList(): number[] {
    // esse método retorna uma lista com 2 anos anteriores e 10 anos pra frente
    // a principio utulizei ele na lista para selecionar o ano para os filtros de gráficos
    let anoAtual = new Date().getFullYear();
    let lista: number[] = [];
    lista.push(anoAtual-2);
    lista.push(anoAtual-1);
    for (let index = 0; index < 10; index++) {
      lista.push(anoAtual+index);      
    }
    return lista;
  }

  public getMesByNumero (num: number): string{
    let meses = this.mesesFull();
    let result = "Janeiro"
    meses.forEach(e=> {if(e.id == num)result = e.mes})
    return result;
  }
  
}
