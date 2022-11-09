import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { CartaoCredito } from 'src/app/model/cartao-credito';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Classificacao } from 'src/app/model/classificacao';
import { Devedor } from 'src/app/model/devedor';

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
  avancado: boolean = false;

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
    })
  }

  ngOnInit(): void {
    this.db.getDevedoresFull().subscribe(res=>{
      this.listaDevedores = res.filter(e=> e.status);
    });

    this.db.getClassificacoesFull().subscribe(res=>{
      this.listaCategorias = res.filter(e=> e.status);
    })
  }

  salvar(){
    if(this.form.valid){
      this.db.novaSaidaRequest(this.form.value).subscribe(res=>{
        console.log(`Resposta da API para nova Saída: ${res}`);
        this.form.reset(alert('Saida Cadastrada')); 

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
  }
}
