
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { IAppState, indiceTab, indiceTabEntrada, setaIdEntrada, setaIdSaida } from 'src/app/store/app.reducer';
import { itemListaEntrada } from 'src/app/model/item-lista-entrada';


@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition( 'expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaEntradasComponent {
  lista = mockDados.getListaEntrada();
  colunasEntradas = [ 'descricao', 'status', 'data Recebida'];
  expandedElement!: itemListaEntrada | null;

  constructor(
    private store:Store<{app: IAppState}>
  ) { }
  ngOnInit(): void {
  }

  abreDetalhes(idEntrada: number){
    this.store.dispatch(indiceTabEntrada({payload: 2}));
    this.store.dispatch(setaIdEntrada({payload:idEntrada}));
  }
}


