import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { ItemListaSaida } from 'src/app/model/item-lista-saidas';
import { IAppState, indiceTab, setaIdSaida } from 'src/app/store/app.reducer';

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
  lista =new MatTableDataSource<ItemListaSaida>(mockDados.getListaSaidas());
  colunasTabela = ['descricao', 'status', 'Data Pagamento'];
  expandedElement!: ItemListaSaida | null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store:Store<{app: IAppState}>
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.lista.sort = this.sort;
  }

  abreDetalhes(idSaida: number){
    this.store.dispatch(indiceTab({payload: 2}));
    this.store.dispatch(setaIdSaida({payload: idSaida}));
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-pagar-saida.html'})
export class DialogPagaSaida {
  constructor(
    public dialogRef: MatDialogRef<DialogPagaSaida>,
    @Inject(MAT_DIALOG_DATA) public data: ItemListaSaida,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
