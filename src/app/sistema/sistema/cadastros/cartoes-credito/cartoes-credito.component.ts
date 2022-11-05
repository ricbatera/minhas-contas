
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { CartaoCredito } from 'src/app/model/cartao-credito';
import { DatabaseServiceService } from 'src/app/services/database-service.service';

@Component({
  selector: 'app-cartoes-credito',
  templateUrl: './cartoes-credito.component.html',
  styleUrls: ['./cartoes-credito.component.css']
})
export class CartoesCreditoComponent implements OnInit {
  mock = mockDados; // dados mockados para testes
  cartoesList?:any =[];
  // cartoesList?:Observable<CartaoCredito[]>;
  form: FormGroup;
  colunasTabela: string[] = ['cartao', 'descricao', 'acao'];
  // fonteCartoes = new MatTableDataSource<CartaoCredito>(this.cartoesList);
  // fonteCartoes = new MatTableDataSource(this.mock.getCartoes());

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
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
    // this.fonteCartoes.sort = this.sort;
  }

  ngOnInit(): void {
    // this.cartoesList = this.db.getCartoesFull();
    this.carregaCartoes();
  }

  private carregaCartoes() {
    this.db.getCartoesFull().subscribe(res => {
      this.cartoesList = res;
    });
  }


  salvar() {
    if (this.form.valid) {
      this.db.novoCartao(this.form.value).subscribe(res=>{
        this.carregaCartoes();
      })
    } else {
      alert('há erros no formulário')
    }
    // console.log(this.form.value)
    // console.log(this.mock.getCartoes())

  }

}
