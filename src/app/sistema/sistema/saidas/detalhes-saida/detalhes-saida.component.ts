import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { ISaidasState } from 'src/app/store/app.reducer';
import { CartaoCredito } from 'src/app/model/cartao-credito';
import { parcelaSaida } from 'src/app/model/parcelaSaida';
import { saidaDetalhesApi } from 'src/app/model/saida-detalhe-api';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EditaConta } from 'src/app/model/edita-conta';
import { DeletarModel } from 'src/app/model/deletarModel';
import { Tag } from 'src/app/model/tag';
import { updateTagList } from 'src/app/sistema/store/sistema.actions';
import { Classificacao } from 'src/app/model/classificacao';
import { getListaIdTagSelecionada, getListaTagsSelecionadas } from 'src/app/sistema/store/sistema.selectors';

@Component({
  selector: 'app-detalhes-saida',
  templateUrl: './detalhes-saida.component.html',
  styleUrls: ['./detalhes-saida.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DetalhesSaidaComponent implements OnInit {
  idSaida$ = this.store
    .select('saidaReducer')
    .pipe(map((dado) => dado.idSaida));
  form: FormGroup;
  listaCartoes: CartaoCredito[] = [];
  parcelas: parcelaSaida[] = [];
  listaParcelas = new MatTableDataSource<parcelaSaida>(this.parcelas);
  colunasTabela = [
    'Valor',
    'Vencimento',
    'Valor Pago',
    'Pago em',
    'Situação',
    'Ação',
  ];
  saidaApi?: saidaDetalhesApi;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<{ saidaReducer: ISaidasState }>,
    private fb: FormBuilder,
    private db: DatabaseServiceService,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      id: [],
      nome: [null, Validators.required],
      obs: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      qtdeParcelas: [null, Validators.required],
      valor: [null, Validators.required],
      meioPagto: [null],
      cartaoSelecionado: [null],
    });
  }

  ngOnInit(): void {
    this.db.getCartoesAtivos().subscribe((res) => {
      this.listaCartoes = res;
    });
    this.startLoadSaida();
  }

  startLoadSaida(){
    this.idSaida$.subscribe((v) => {
      if (v != 0) this.carregaSaida(v);
    });
  }

  carregaSaida(valor: number | void) {
    this.db.getSaidaById(valor).subscribe((res) => {
      this.saidaApi = res;
      this.form.controls['nome'].setValue(this.saidaApi?.nome);
      this.form.controls['obs'].setValue(this.saidaApi?.obs);
      this.form.controls['meioPagto'].setValue(this.saidaApi?.meioPagto);
      this.form.controls['cartaoSelecionado'].setValue(
        this.saidaApi?.cartao?.id
      );
      this.parcelas = res.parcelas;
      let listagem: Classificacao[] = res.tags;
      this.store.dispatch(updateTagList({tagsSelecionadas: listagem}));
    });
  }

  ngAfterViewInit() {
    this.listaParcelas.sort = this.sort;
  }

  salvar() {
    this.idSaida$.subscribe((res) => this.form.controls['id'].setValue(res));
    console.log(this.form.controls['id'].value);
    let listagem!: number[];
    this.store.select(getListaIdTagSelecionada).subscribe(res => listagem = res);
    let payload: EditaConta = {
      id: this.form.controls['id'].value,
      nome: this.form.controls['nome'].value,
      obs: this.form.controls['obs'].value,
      tags: listagem
    };
    this.db.editaConta(payload).subscribe((res) => {
      console.log(res);
      alert('Salvo com sucesso!');
      this.carregaSaida(this.form.controls['id'].value);
    });
  }

  dialogEditar(id: number) {
    const dialogRef = this.dialog.open(DialogEditarParcela, {
      width: '500px',
      data: { idSelecionado: id, parcelas: this.parcelas },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.saidaApi!.parcelas = result;      
      this.db.editaParcelas({idSaida: this.saidaApi?.id, parcelas: result, }).subscribe(res=>{
        alert("Parcela(s) atualizada(s) com sucesso!");
      });
      
    });
  }
  dialogApagar(id: number) {
    const dialogRef = this.dialog.open(DialogDeletarParcela, {
      width: '500px',
      data: { idSelecionado: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      let payload: DeletarModel = {
        idParcela: 0,
        deletarTudo: false,
        deletarRestante: false
      }
      if (result != 'cancelar') {
        if (result) {
          payload.idParcela = id;   
          payload.deletarRestante = true       
          this.db.deletarParcelaSaida(payload).subscribe(res=>{
            this.startLoadSaida();
            alert('Todas parcelas abertas deletadas com sucesso');
          });
        } else {
          payload.idParcela = id;          
          this.db.deletarParcelaSaida(payload).subscribe(res=>{
            this.startLoadSaida();
            alert('Parcela deletada com sucesso');
          });
        }
      }
    });
  }
}

// DIALOG EDITAR
@Component({
  selector: 'app-editar-parcela',
  templateUrl: './dialog-editar-parcela.html',
  styleUrls: ['./detalhes-saida.component.css'],
})
export class DialogEditarParcela implements OnInit {
  parcelaAtual: parcelaSaida | null = null;
  novoValor = 0;
  atualizaTodas: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarParcela>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: DatabaseServiceService
  ) {}

  ngOnInit(): void {
    this.data.parcelas.forEach((el: parcelaSaida | null) => {
      if (el?.id == this.data.idSelecionado) this.parcelaAtual = el;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salvar() {
    let novaLista: parcelaSaida[] = [];

    if (this.novoValor > -1) {
      if (this.atualizaTodas) {
        novaLista = this.data.parcelas.map((el: parcelaSaida) => {
          if (el.situacao == 'Aberto') el.valor = this.novoValor;
          return el;
        });
      } else {
        novaLista = this.data.parcelas.map((el: parcelaSaida) => {
          if (el?.id == this.data.idSelecionado) el.valor = this.novoValor;
          return el;
        });
      }
    }
    this.dialogRef.close(this.data.parcelas);
  }
}

// DIALOG EXCLUIR
@Component({
  selector: 'app-deletar-parcela',
  templateUrl: './dialog-deletar-parcela.html',
  styleUrls: ['./detalhes-saida.component.css'],
})
export class DialogDeletarParcela implements OnInit {
  atualizaTodas: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogDeletarParcela>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close('cancelar');
  }

  salvar() {
    this.dialogRef.close(this.atualizaTodas);
  }
}
