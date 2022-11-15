
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, indiceTab, indiceTabEntrada, setaIdEntrada, setaIdSaida } from 'src/app/store/app.reducer';
import { itemListaEntrada } from 'src/app/model/item-lista-entrada';
import { MatDialog } from '@angular/material/dialog';
import { DailogReceberEntradaComponent } from '../dailog-receber-entrada/dailog-receber-entrada.component';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DatasService } from 'src/app/services/datas.service';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { Meses } from 'src/assets/menudata/meses';
import { ItemEntradaApi } from 'src/app/model/item-entrada-api';


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
  
  itensLista: ItemEntradaApi[] = [];
  colunasEntradas = [ 'descricao', 'Observação', 'Valor', 'status', 'data Recebida'];
  expandedElement!: itemListaEntrada | null;
  itemEntrada?: ItemEntradaApi;
  mesSelecionado: number = -1;
  anoSelecionado: number = -1;

  constructor(
    public dialog: MatDialog,
    private store:Store<{app: IAppState}>,
    private db: DatabaseServiceService,
    private dataService: DatasService
  ) { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
   
  }

  recebeEventMes(e: any){
    this.mesSelecionado = e.id +1;
    this.carregaLista();
  }
  recebeEventAno(e: any){
    this.anoSelecionado = e.ano;
    setTimeout(() => {
      this.carregaLista();      
    }, 100);
  }

  carregaLista() {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.db.getitensEntrada(this.mesSelecionado, this.anoSelecionado)
          .pipe(catchError(() => observableOf(null)))
      }
      ),
      map(data => {
        if (data === null) {
          return [];
        }
        data.map(d => {
          if (d.situacao == "Aberto") {
            let venc = Date.parse(d.dataPrevistaRecebimento);
            let hoje = Date.now();
            if (hoje > venc) {
              d.situacao = "Atrasado"
            }
          }
        })
        return data;
      })
    ).subscribe(data => {
      this.itensLista = data
    })
  }

  abreDetalhes(idEntrada: number){
    this.store.dispatch(indiceTabEntrada({payload: 2}));
    this.store.dispatch(setaIdEntrada({payload:idEntrada}));
  }

  Receber(idEntrada: number): void {   
    this.itensLista.forEach(e =>{if(e.id == idEntrada) this.itemEntrada = e} )
    console.log(this.itemEntrada)
    const dialogRef = this.dialog.open(DailogReceberEntradaComponent, {
      width: '500px',
    data: this.itemEntrada
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.carregaLista();
    });
  }
}


