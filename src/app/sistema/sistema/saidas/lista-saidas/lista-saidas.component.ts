import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { IAppState, indiceTab, setaIdSaida } from 'src/app/store/app.reducer';
import { DialogPagarCartaoComponent } from '../dialog-pagar-cartao/dialog-pagar-cartao.component';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { ItemListaSaidaApi } from 'src/app/model/item-lista-saida-api';
import { ContaBancaria } from 'src/app/model/conta-bancaria';
import { FiltrosService } from 'src/app/services/filtros.service';

export interface filtros { devedor: string, meioPagto: string, classificacao: string }


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
  itensLista: ItemListaSaidaApi[] = [];
  bkpItensLista: ItemListaSaidaApi[] = [];
  itemLista?: ItemListaSaidaApi;
  devedores: string[] = [];
  meiosPagto: string[] = [];
  classificacaoList: string [] = [];
  valorTotal = 0;
  colunasTabela = ['descricao', 'status', 'Valor', 'Meio de Pagamento', 'Data Pagamento'];
  expandedElement!: ItemListaSaidaApi | null;
  mesSelecionado: number = -1;
  anoSelecionado = -1;
  filtros: filtros = { devedor: 'Todos', meioPagto: 'Todos', classificacao: "Todas" }


  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<{ app: IAppState }>,
    public dialog: MatDialog,
    private db: DatabaseServiceService,
    private filtro: FiltrosService,
  ) { }
  ngOnInit(): void {
  }

  recebeEventMes(e: any) {
    this.mesSelecionado = e.id + 1;
    this.carregaLista();
    this.resetFiltros();
  }

  recebeEventAno(e: any) {
    this.anoSelecionado = e.ano;
    setTimeout(() => {
      this.carregaLista();
    }, 100);
    this.resetFiltros();
  }

  carregaLista() {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.db.getitensSaida(this.mesSelecionado, this.anoSelecionado)
          .pipe(catchError(() => observableOf(null)))
      }
      ),
      map(data => {
        if (data === null) {
          return [];
        }
        data.map(d => {
          if (d.situacao == "Aberto") {
            let venc = Date.parse(d.dataVencimento);
            let hoje = Date.now();
            if (hoje > venc) {
              d.situacao = "Atrasado"
            }
          }
        })
        return data;
      })
    ).subscribe(data => {
      console.log("Carregando lista de saídas");
      // console.log(data);
      this.itensLista = data
      this.devedores = this.filtro.filtraDevedores(data);
      this.devedores.unshift('Todos');
      this.meiosPagto = this.filtro.filtraMeioPagto(data);
      this.meiosPagto.unshift('Todos');
      this.classificacaoList = this.filtro.filtaClassificacao(data);
      this.classificacaoList.unshift('Todas');
      this.bkpItensLista = [];
      this.calculaTotal();
    })
  }
  
  filtrar() {
    if (this.bkpItensLista.length == 0) {
      this.bkpItensLista = this.itensLista;
    } else {
      this.itensLista = this.bkpItensLista;
      this.calculaTotal();
    }
    this.itensLista = this.filtro.filtrar(this.filtros, this.itensLista);
    this.calculaTotal();
    console.log(this.itensLista);

  }

  resetFiltros() {
    this.filtros.devedor = "Todos";
    this.filtros.meioPagto = "Todos";
    this.filtros.classificacao = "Todas";
    this.calculaTotal();
  }

  calculaTotal() {
    this.valorTotal = this.itensLista.reduce((acc, i) => acc + i.valor, 0);
  }

  abreDetalhes(idSaida: number) {
    this.store.dispatch(indiceTab({ payload: 2 }));
    this.store.dispatch(setaIdSaida({ payload: idSaida }));
  }

  openDialogSalvar(id: number): void {
    this.itensLista.forEach(item => { if (item.id == id) this.itemLista = item })

    if (this.itemLista?.saida.meioPagto == "debito") {
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
    } else {
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
  templateUrl: 'dialog-pagar-saida.html',
  styleUrls: ['./lista-saidas.component.css']
})
export class DialogPagaSaida {

  valor = null;
  date = null;
  pagoDefault = "1";
  contasBancariasList: ContaBancaria[] = [];
  idConta = -1;

  constructor(
    public dialogRef: MatDialogRef<DialogPagaSaida>,
    @Inject(MAT_DIALOG_DATA) public data: ItemListaSaidaApi,
    private db: DatabaseServiceService
  ) { }

  ngOnInit(): void {
    this.setaValores();
    this.db.getContasAtivas().subscribe(res => {
      this.contasBancariasList = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setaValores() {
    if (this.pagoDefault == "1") {
      this.data.valorPago = this.data.valor;
      this.data.dataPagamento = this.data.dataVencimento;
    } else {

      this.data.valorPago = this.valor;
      this.data.dataPagamento = this.date;
    }
  }

  pagar() {
    if (this.pagoDefault == "1") {
      this.data.valorPago = this.data.valor;
      this.data.dataPagamento = this.data.dataVencimento;
    } else {

      this.data.valorPago = this.valor;
      this.data.dataPagamento = this.date;
    }
    if (this.data.dataPagamento != null && this.data.valorPago != null && this.idConta != -1) {
      const payload = {
        idParcela: this.data.id,
        dataPagamento: this.data.dataPagamento,
        valor: this.data.valorPago,
        idConta: this.idConta
      }
      this.db.pagarParcela(payload).subscribe(res => {
        this.dialogRef.close(this.data);
        console.log("Retorno da API pagar parcela: " + res);
      })
    } else {
      alert("Preencha corretamente o valor e a data");
    }
  }
}
