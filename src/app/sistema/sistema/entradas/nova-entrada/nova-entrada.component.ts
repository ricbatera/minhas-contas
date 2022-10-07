import { mockDados } from 'src/app/MOCK/mock-dados';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-nova-entrada',
  templateUrl: './nova-entrada.component.html',
  styleUrls: ['./nova-entrada.component.css']
})
export class NovaEntradaComponent implements OnInit {

  listaCartoes = mockDados.getCartoes()
  isCartao = true;

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      obs: [null, Validators.required],
      dataRecebimento: [null, Validators.required],
      qtdeParcelas: [null, Validators.required],
      valor: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  salvar() { }

  toogleComboCartoes() {
    console.log('foi')
    if (this.form.controls['meioPagto'].value != "cartao") {
      this.isCartao = true;
      this.form.controls['cartaoSelecionado'].reset();
    } else {
      this.isCartao = false
    }
  }

}
