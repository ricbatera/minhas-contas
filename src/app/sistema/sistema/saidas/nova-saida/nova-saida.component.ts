import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { CartaoCredito } from 'src/app/model/cartao-credito';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Classificacao } from 'src/app/model/classificacao';
import { Devedor } from 'src/app/model/devedor';
import { ContaBancaria } from 'src/app/model/conta-bancaria';

@Component({
  selector: 'app-nova-saida',
  templateUrl: './nova-saida.component.html',
  styleUrls: ['./nova-saida.component.css']
})
export class NovaSaidaComponent implements OnInit {

  listaCartoes: CartaoCredito[] = [];
  isCartao = true;
  listaCategorias: Classificacao [] = [];
  listaDevedores: Devedor [] = [];
  listaContasBancarias: ContaBancaria [] = [];
  avancado: boolean = true;
  mostrarDevedor: boolean = true;
  gerarEntrada = "true";
  ric: boolean = false;
  pago: boolean = true

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: DatabaseServiceService
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
      associaDevedor: [false],
      pago: [false],
      devedorId:[null],
      criaEntrada:[false],
      valorEntrada:[null],
      classificacaoId:[null, Validators.required],
      idConta:[null]
    })
  }

  ngOnInit(): void {
    this.db.getDevedoresFull().subscribe(res=>{
      this.listaDevedores = res.filter(e=> e.status);
    });

    this.db.getClassificacoesFull().subscribe(res=>{
      this.listaCategorias = res.filter(e=> e.status && e.tipo == 'Saída').sort(this.ordenar);
    });

    this.db.getContasAtivas().subscribe(res=>{
      this.listaContasBancarias = res;
    });
  }

  ordenar(a:Classificacao, b: Classificacao){
    if(a.nome > b.nome){
      return 1;
    }
    if(a.nome < b.nome){
      return -1;
    }
    return 0;
  }

  salvar(){
    if(this.form.valid){
      this.db.novaSaidaRequest(this.form.value).subscribe(res=>{
        console.log(`Resposta da API para nova Saída: ${res}`);
        //this.form.reset(alert('Saida Cadastrada')); 

      })
    }
  }

  ngAfterViewInit() {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.db.getCartoesAtivos()
          .pipe(catchError(() => observableOf(null)))
      }
      ),
      map(data => {
        if (data === null) {
          return [];
        }
        return data;
      })
    ).subscribe(data => this.listaCartoes = data) ;
    
  }

  toogleComboCartoes(){
    if(this.form.controls['meioPagto'].value == 'cartao'){
      this.isCartao = false;
    } else{
      this.isCartao = true;
      this.form.controls['cartaoSelecionado'].setValue(null);
    }
    this.toogleMarcarPago();
  }

  validaDevedor(){
    if(!this.form.controls['associaDevedor'].value){
      console.log('alterando');
      this.form.controls['devedorId'].setValue(null);
    }
  }

  validaValorEntradaDevedor(){
    if(this.form.controls['criaEntrada'].value){
      this.form.controls['valorEntrada'].setValue(this.form.controls['valor'].value);
    } else{
      this.form.controls['valorEntrada'].setValue(null);
    }
  }

  toogleMarcarPago(){
    if(this.form.controls['meioPagto'].value == 'debito' && this.form.controls['qtdeParcelas'].value == 1){
      this.pago = false;
    }else{
      this.pago = true;
      this.form.controls['pago'].setValue(false);
      this.form.controls['idConta'].setValue(null);
    }
  }
}
