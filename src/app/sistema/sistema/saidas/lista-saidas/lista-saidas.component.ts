import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { ItemListaSaida } from 'src/app/model/item-lista-saidas';
import { IAppState, indiceTab, setaIdSaida } from 'src/app/store/app.reducer';
import { DialogPagarCartaoComponent } from '../dialog-pagar-cartao/dialog-pagar-cartao.component';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { ItemListaSaidaApi } from 'src/app/model/item-lista-saida-api';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-lista-saidas',
  templateUrl: './lista-saidas.component.html',
  styleUrls: ['./lista-saidas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaSaidasComponent implements OnInit {
  lista = new MatTableDataSource<ItemListaSaida>(mockDados.getListaSaidas());
  itensLista: ItemListaSaidaApi[] = [];
  itemLista?: ItemListaSaidaApi;
  colunasTabela = ['descricao', 'status', 'Data Pagamento'];
  expandedElement!: ItemListaSaida | null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<{ app: IAppState }>,
    public dialog: MatDialog,
    private db: DatabaseServiceService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.lista.sort = this.sort;
    this.carregaLista();
  }

  carregaLista(){
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.db.getitensSaida()
          .pipe(catchError(() => observableOf(null)))
      }
      ),
      map(data => {
        if (data === null) {
          return [];
        }
        data.map(d=>{
          if(d.situacao == "Aberto"){
            let venc = Date.parse(d.dataVencimento);
            let hoje = Date.now();
            if(hoje > venc){
              d.situacao = "Atrasado"
            }
          }
        })
        return data;
      })
    ).subscribe(data =>{ 
      console.log("Carregando lista de saídas")
      this.itensLista = data
    })
  }

  abreDetalhes(idSaida: number) {
    this.store.dispatch(indiceTab({ payload: 2 }));
    this.store.dispatch(setaIdSaida({ payload: idSaida }));
  }
  
  openDialogSalvar(id: number): void {
    this.itensLista.forEach(item => { if (item.id == id) this.itemLista = item })

    if(this.itemLista?.saida.meioPagto == "bebito"){
      const dialogRef = this.dialog.open(DialogPagaSaida, {
        width: '500px',
        data: this.itemLista,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.itemLista = result;
        console.log(result);
        this.carregaLista();
      });
    } else{
      const dialogRef = this.dialog.open(DialogPagarCartaoComponent, {
        width: '500px',
        data: this.itemLista,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.carregaLista();
      });
    }
  }
}



@Component({
  selector: 'dialog-pagar-saida',
  templateUrl: 'dialog-pagar-saida.html'
})
export class DialogPagaSaida {
  constructor(
    public dialogRef: MatDialogRef<DialogPagaSaida>,
    @Inject(MAT_DIALOG_DATA) public data: ItemListaSaida,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
