import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { EntradaDetalhes } from 'src/app/model/entrada-detalhes';
import { IAppState } from 'src/app/store/app.reducer';
import { parcela } from 'src/app/model/item-lista-entrada'

@Component({
  selector: 'app-entrada-detalhe',
  templateUrl: './entrada-detalhe.component.html',
  styleUrls: ['./entrada-detalhe.component.css']
})


export class EntradaDetalheComponent implements OnInit {
  idEntrada$ = this.store.select('app').pipe(map(dado => dado.idEntrada));
  form: FormGroup;
  listaCartoes = mockDados.getCartoes();
  entradaDetalhe: EntradaDetalhes = mockDados.getEntradaDetalhes();
  listaParcelas = new MatTableDataSource<parcela>(this.entradaDetalhe.parcela);
  colunasTabela = ['Observacao', 'Descricao', 'Ação']
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private store: Store<{ app: IAppState }>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [this.idEntrada$],
      observacao: [null, Validators.required],
      descricao: [null, Validators.required],
      parcela: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.form.controls['observacao'].setValue(this.entradaDetalhe.observacao);
    this.form.controls['descricao'].setValue(this.entradaDetalhe.descricao);

  }

  salvar() {

  }
}
