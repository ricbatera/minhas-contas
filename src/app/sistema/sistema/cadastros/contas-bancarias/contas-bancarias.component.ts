import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-contas-bancarias',
  templateUrl: './contas-bancarias.component.html',
  styleUrls: ['./contas-bancarias.component.css']
})
export class ContasBancariasComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      id:[null],
      nome:[null, Validators.required],
      descricao:[null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  salvar(){
    if(this.form.valid){
      alert ("Salvando...")
    }else{
      alert('há erros no formulário')
    }
    console.log(this.form.value)
  }

}
