import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaoCredito } from 'src/app/model/cartao-credito';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Classificacao } from 'src/app/model/classificacao';
import { Devedor } from 'src/app/model/devedor';
import { ContaBancaria } from 'src/app/model/conta-bancaria';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';

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
  pago: boolean = true;

  categorias: Classificacao [] = [];
  tagss:FormControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<Classificacao[]>;
  idTagList: number[] = [];
  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: DatabaseServiceService
  ) {
    this.filteredTags = this.tagss.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.listaCategorias),
    );


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

    this.db.getClassificacoesFull().subscribe(res=>{
      this.listaCategorias = res.filter(e=> e.status && e.tipo == 'Saída').sort(this.ordenar);
      // this.categorias.push(res[0]);
    });

    this.db.getContasAtivas().subscribe(res=>{
      this.listaContasBancarias = res;
    });
  }

  removeItemTag(tag: Classificacao){
    const index = this.categorias.indexOf(tag);
    console.log(index)
    if(index >= 0){
      this.categorias.splice(index,1);
      console.table(this.listaCategorias)
    }
  }

  private _filter(tag: string): Classificacao[]{
    const fil = this.listaCategorias.filter(cat=> cat.nome.includes(tag));
    return fil;
  }

  addNewTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value)
    // Add our fruit
    if (value) {
      const novaCategoria: any = {id: null, nome: value, tipo: 'Saída', status: true}
      this.db.novaClassificacao(novaCategoria).subscribe(res=>{        
        alert("Nova Tag casdastrada na base com sucesso.")
        this.db.getClassificacoesFull().subscribe(res=>{
          this.listaCategorias = res.filter(e=> e.status && e.tipo == 'Saída').sort(this.ordenar);
          this.listaCategorias.forEach(el=>{if(el.nome == value){this.categorias.push(el)}})
          this.tagInput.nativeElement.value = '';
          this.tagss.setValue(null);
        });
      })
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option)    
    this.listaCategorias.forEach(el=>{if(el.nome == event.option.viewValue){
      this.categorias.push(el);
      this.idTagList.push(el.id);
    }})
    this.tagInput.nativeElement.value = '';
    this.tagss.setValue(null);
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
      this.form.controls['tags'].setValue(this.idTagList);
      const novaSaida = this.form.value;
      console.log(novaSaida);
      this.db.novaSaidaRequest(this.form.value).subscribe(res=>{
        console.log(`Resposta da API para nova Saída: ${res}`);
        alert('Saida cadastrada com sucesso'); 
        this.idTagList = [];
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
