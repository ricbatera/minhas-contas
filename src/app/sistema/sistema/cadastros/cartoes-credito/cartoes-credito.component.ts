
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { DialogDeletarComponent } from '../components/dialog-deletar/dialog-deletar.component';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CartaoCredito } from 'src/app/model/cartao-credito';

export interface cartao {
  id: any,
  cartao: string,
  descricao: string,
  diaVencimento: number
}
@Component({
  selector: 'app-cartoes-credito',
  templateUrl: './cartoes-credito.component.html',
  styleUrls: ['./cartoes-credito.component.css']
})


export class CartoesCreditoComponent implements OnInit {
  form: FormGroup;
  colunasTabela: string[] = ['cartao', 'descricao', 'acao'];
  fonteCartoes: CartaoCredito[] = [];
  fonteCartoesFiltro: CartaoCredito[] = [];

  selecaoLista: any = "2";
  cartao?: CartaoCredito;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private db: DatabaseServiceService
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      diaVencimento: [null, Validators.required],
      descricao: [null, Validators.required]
    })
  }

  ngAfterViewInit() {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.db.getCartoesFull()
          .pipe(catchError(() => observableOf(null)))
      }
      ),
      map(data => {
        if (data === null) {
          return [];
        }
        return data;
      })
    ).subscribe(data => this.fonteCartoes = data)
  }

  ngOnInit(): void {
    // this.cartoesList = this.db.getCartoesFull();
    this.filtraCartao();
  }

  salvar() {
    if (this.form.valid) {
      this.db.novoCartao(this.form.value).subscribe(res => {
        this.ngAfterViewInit();
        this.form.reset( alert('Cartão Adicionado'));

      })
    } else {
      alert('há erros no formulário')
    }
    // console.log(this.form.value)
    // console.log(this.mock.getCartoes())

  }

  filtraCartao() {
    console.log(this.fonteCartoes);
    if (this.selecaoLista == "0") {
      let newList = this.fonteCartoes.filter(cartao => cartao.status);
      this.fonteCartoes = newList;
      this.ngAfterViewInit();
    } else if (this.selecaoLista == "1") {
      let newList = this.fonteCartoes.filter(cartao => !cartao.status);
      this.fonteCartoes = newList;
    } else {
      this.ngAfterViewInit();

      // não é a melhor prática - preciso ver uma forma de fazer cache dessas informações
    }
  }
}
