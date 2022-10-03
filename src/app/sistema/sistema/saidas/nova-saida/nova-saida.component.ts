import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nova-saida',
  templateUrl: './nova-saida.component.html',
  styleUrls: ['./nova-saida.component.css']
})
export class NovaSaidaComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      id:[null],
      nome:[null, Validators.required],
      obs:[null, Validators.required],
      dataVencimento:[null, Validators.required],
      qtdeParcelas:[null, Validators.required],
      valor: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

}
