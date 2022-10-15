import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-detalhes-saida',
  templateUrl: './detalhes-saida.component.html',
  styleUrls: ['./detalhes-saida.component.css']
})
export class DetalhesSaidaComponent implements OnInit {

  idSaida$ =  this.store.select('app').pipe(map(dado => dado.idSaida));
  form: FormGroup;

  constructor(
    private store:Store<{app: IAppState}>,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      id:[null],
      nome:[null, Validators.required],
      obs:[null, Validators.required],
      dataVencimento:[null, Validators.required],
      qtdeParcelas:[null, Validators.required],
      valor: [null, Validators.required],
      meioPagto: [null, Validators.required],
      cartaoSelecionado: [null],
    })
  }

  ngOnInit(): void {
  }

  salvar(){
    
  }

}
