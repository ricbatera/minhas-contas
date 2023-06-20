import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaoCredito } from 'src/app/model/cartao-credito';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Classificacao } from 'src/app/model/classificacao';
import { Devedor } from 'src/app/model/devedor';
import { ContaBancaria } from 'src/app/model/conta-bancaria';
import { Store } from '@ngrx/store';
import { getListaIdTagSelecionada, getListaTagsSaidas } from 'src/app/sistema/store/sistema.selectors';
import { resetTagListaSelecionadas } from 'src/app/sistema/store/sistema.actions';

@Component({
  selector: 'app-nova-saida',
  templateUrl: './nova-saida.component.html',
  styleUrls: ['./nova-saida.component.css']
})
export class NovaSaidaComponent implements OnInit {

  listaCartoes: CartaoCredito[] = [];
  isCartao = true;
  listaDevedores: Devedor [] = [];
  listaContasBancarias: ContaBancaria [] = [];
  avancado: boolean = true;
  mostrarDevedor: boolean = true;
  gerarEntrada = "true";
  ric: boolean = false;
  pago: boolean = true;
  listaTagsSaida$: Observable<Classificacao[]>;
  listaIdTagSelecionadas: number[] = []



  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: DatabaseServiceService,
    private store: Store
  ) {
    this.listaTagsSaida$ = store.select(getListaTagsSaidas);
    store.select(getListaIdTagSelecionada).subscribe(res=>{ this.listaIdTagSelecionadas = res});
    this.form = this.fb.group({
      id:[null],
      nome:[null, Validators.required],
      obs:[null, Validators.required],
      dataVencimento:[null, Validators.required],
      dataCompra:[null],
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
      idConta:[null],
      tags:[null]
    })
  }

  ngOnInit(): void {
    this.db.getDevedoresFull().subscribe(res=>{
      this.listaDevedores = res.filter(e=> e.status);
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
     this.form.controls['tags'].setValue(this.listaIdTagSelecionadas);
      const novaSaida = this.form.value;
      console.log(novaSaida);
      this.db.novaSaidaRequest(this.form.value).subscribe(res=>{
        this.store.dispatch(resetTagListaSelecionadas());
        alert(`Sucesso: ${res.nome} adicionada.`); 
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
