import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { EntradaDetalhes } from 'src/app/model/entrada-detalhes';
import { parcela } from 'src/app/model/model';
import { IAppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-entrada-detalhe',
  templateUrl: './entrada-detalhe.component.html',
  styleUrls: ['./entrada-detalhe.component.css']
})


export class EntradaDetalheComponent implements OnInit {
 idEntrada$ =  this.store.select('app').pipe(map(dado => dado.idEntrada));
 detalhe = mockDados.getEntradaDetalhes


 form: FormGroup;
 listaCartoes = mockDados.getCartoes();
 entradaDetalhe: EntradaDetalhes = mockDados.getEntradaDetalhes();
 colunasTabela = ['Valor', 'Vencimento', 'Ação']
 @ViewChild(MatSort) sort!: MatSort;


 constructor(
  private store:Store<{app: IAppState}>,
  private fb: FormBuilder
) {
  this.form = this.fb.group({
    id: [null],
    nome: [null, Validators.required],
    observacao: [null, Validators.required], 
    descricao: [null, Validators.required], 
    dataRecebimento: [null, Validators.required],
    qtdeParcelas: [null, Validators.required],
    valoReceber: [null, Validators.required]
  })
}

  ngOnInit(): void {
  }

  Editar() {  if (this.form.valid) {
    alert("alterando...")
  } else {
    alert('há erros no formulário')
  }

  }
}
