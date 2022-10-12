import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { mockDados } from 'src/app/MOCK/mock-dados';

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

  constructor() { }

  ngOnInit(): void {
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
