import { Component, OnInit, ViewChild } from '@angular/core';
import { mockDados } from './../../../../MOCK/mock-dados';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { IAppState, indiceTabEntrada } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {
  mock = mockDados; // dados mockados para testes
  form: FormGroup;
  colunasTabela: string[] = ['conta', 'descricao', 'acao'];
  fonteCartoes = new MatTableDataSource(this.mock.getCartoes());

  listaTabs = ['Nova Entrada', "Lista de Entradas", "Detalhes"];
  selecionada = new FormControl(0);
  tab$ = this.store.select('app').pipe(map(dado => dado.indiceEntradas));
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<{ app: IAppState }>,
    private fb: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      descricao: [null, Validators.required]
    })
  }

  ngAfterViewInit() {
    this.fonteCartoes.sort = this.sort;
  }

  ngOnInit(): void {
  }
  salvar() {
    if (this.form.valid) {
      alert("Salvando...")
    } else {
      alert('há erros no formulário')
    }
    // console.log(this.form.value)
    console.log(this.mock.getCartoes())

  }
  setaTab(ev: number) {
    this.store.dispatch(indiceTabEntrada({ payload: ev }));
  }
}

