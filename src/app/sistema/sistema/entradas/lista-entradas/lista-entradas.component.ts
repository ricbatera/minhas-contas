
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
import { ItemEntradaApi } from 'src/app/model/item-entrada-api';
import { FiltrosService } from 'src/app/services/filtros.service';

export interface filtrosEntradas { devedor: string, classificacao: string }

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
  bkpItensLista: ItemEntradaApi[] = [];
  devedores: string[] = [];
  classificacaoList: string [] = [];
  valorTotal = 0;
  filtros: filtrosEntradas ={devedor: "Todos", classificacao: "Todas"}
  colunasEntradas = [ 'descricao', 'Observação', 'Valor', 'status', 'data Recebida'];
  expandedElement!: itemListaEntrada | null;
  itemEntrada?: ItemEntradaApi;
  mesSelecionado: number = -1;
  anoSelecionado: number = -1;

  constructor(
    public dialog: MatDialog,
    private store:Store<{app: IAppState}>,
    private db: DatabaseServiceService,
    private dataService: DatasService,
    private filtro: FiltrosService,
  ) { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
   
  }

  recebeEventMes(e: any){
    this.mesSelecionado = e.id +1;
    this.carregaLista();
    this.resetFiltros();
  }
  recebeEventAno(e: any){
    this.anoSelecionado = e.ano;
    setTimeout(() => {
      this.carregaLista();
      this.resetFiltros();      
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
      this.itensLista = data;
      this.devedores = this.filtro.filtraDevedoresEntrada(data);
      this.devedores.unshift('Todos');
      this.classificacaoList = this.filtro.filtaClassificacaoEntrada(data);
      this.classificacaoList.unshift('Todas')
      this.calculaTotal();
    })
  }

  calculaTotal() {
    this.valorTotal = this.itensLista.reduce((acc, i) => acc + i.valor, 0);
  }

  filtrar() {
    if (this.bkpItensLista.length == 0) {
      this.bkpItensLista = this.itensLista;
    } else {
      this.itensLista = this.bkpItensLista;
      this.calculaTotal();
    }
    this.itensLista = this.filtro.filtarEntrada(this.filtros, this.itensLista);
    this.calculaTotal();

  }

  resetFiltros() {
    this.filtros.devedor = "Todos";
    this.filtros.classificacao = "Todas";
    this.calculaTotal();
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


