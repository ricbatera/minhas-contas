
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mockDados } from 'src/app/MOCK/mock-dados';

@Component({
  selector: 'app-cartoes-credito',
  templateUrl: './cartoes-credito.component.html',
  styleUrls: ['./cartoes-credito.component.css']
})
export class CartoesCreditoComponent implements OnInit {
  mock = mockDados; // dados mockados para testes
  form: FormGroup;
  colunasTabela: string[] = ['descricao', 'cartao', 'acao'];
  fonteCartoes = new MatTableDataSource(this.mock.getCartoes());
  selecaoLista: any = "2";


  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      diaVencimento: [null, Validators.required],
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

  filtraLista() {
    if (this.selecaoLista == "0") {
      let newList = mockDados.getCartoes().filter(conta => conta.ativo);
      this.fonteCartoes.data = newList;
    } else if (this.selecaoLista == "1") {
      let newList = mockDados.getCartoes().filter(conta => !conta.ativo);
      this.fonteCartoes.data = newList;
    } else {
      this.fonteCartoes.data = mockDados.getCartoes();
    }
  }

}
