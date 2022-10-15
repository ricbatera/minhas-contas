import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mockDados } from 'src/app/MOCK/mock-dados';

@Component({
  selector: 'app-entrada-detalhe',
  templateUrl: './entrada-detalhe.component.html',
  styleUrls: ['./entrada-detalhe.component.css']
})
export class EntradaDetalheComponent implements OnInit {
 detalhe = mockDados.getEntradaDetalhes

 form: FormGroup;

 constructor(
  private fb: FormBuilder
) {
  this.form = this.fb.group({
    id: [null],
    descricao: [null, Validators.required],
    observacao: [null, Validators.required],

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
