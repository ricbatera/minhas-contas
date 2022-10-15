import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { SaidaDetalhes } from 'src/app/model/saida-detalhes';
import { IAppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-detalhes-saida',
  templateUrl: './detalhes-saida.component.html',
  styleUrls: ['./detalhes-saida.component.css']
})
export class DetalhesSaidaComponent implements OnInit {

  idSaida$ =  this.store.select('app').pipe(map(dado => dado.idSaida));
  form: FormGroup;
  listaCartoes = mockDados.getCartoes();
  saidaDetalhe: SaidaDetalhes = mockDados.getSaidaDetalhes();

  constructor(
    private store:Store<{app: IAppState}>,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      id:[this.idSaida$],
      nome:[null, Validators.required],
      obs:[null, Validators.required],
      dataVencimento:[null, Validators.required],
      qtdeParcelas:[null, Validators.required],
      valor: [null, Validators.required],
      meioPagto: [null],
      cartaoSelecionado: [null],
    })
  }

  ngOnInit(): void {
    this.form.controls['nome'].setValue(this.saidaDetalhe.nome);
    this.form.controls['obs'].setValue(this.saidaDetalhe.obs);
    this.form.controls['meioPagto'].setValue(this.saidaDetalhe.meioPagamento);
    this.form.controls['cartaoSelecionado'].setValue(this.saidaDetalhe.cartao?.id);
  }

  salvar(){

  }

}
