import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { IAppState, indiceTab } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-lista-saidas',
  templateUrl: './lista-saidas.component.html',
  styleUrls: ['./lista-saidas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaSaidasComponent implements OnInit {
  lista = mockDados.getListaSaidas();
  colunasTabela = ['descricao', 'status', 'Data Pagamento'];
  expandedElement!: dados | null;

  constructor(
    private store:Store<{app: IAppState}>
  ) { }

  ngOnInit(): void {
  }

  abreDetalhes(){
    this.store.dispatch(indiceTab({payload: 2}))
  }

}

export interface dados{
  id: number,
  descricao: string,
  obs: string,
  parcela:{
    status:string,
    dataVencimento:Date,
    dataPagamento: Date,
    meioPagto: string,
    valor:number,
    valorPago: number,
    parcela: string
  }
}
