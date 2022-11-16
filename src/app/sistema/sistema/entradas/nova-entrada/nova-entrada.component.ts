import { mockDados } from 'src/app/MOCK/mock-dados';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { Classificacao } from 'src/app/model/classificacao';
import { Devedor } from 'src/app/model/devedor';
import { ContaBancaria } from 'src/app/model/conta-bancaria';


@Component({
  selector: 'app-nova-entrada',
  templateUrl: './nova-entrada.component.html',
  styleUrls: ['./nova-entrada.component.css']
})
export class NovaEntradaComponent implements OnInit {

  colunasTabela = mockDados.getCartoes()
  isCartao = true;
  listaCategorias: Classificacao [] = [];
  listaDevedores: Devedor [] = [];
  listaContasBancarias: ContaBancaria [] = [];
  avancado: boolean = true;
  mostrarDevedor: boolean = true;
  recebido = true;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: DatabaseServiceService
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      obs: [null, Validators.required],
      dataPrevistaRecebimento: [null, Validators.required],
      qtdeParcelas: [null, Validators.required],
      idConta: [null],
      valor: [null, Validators.required],
      recebido: [false, Validators.required],
      associaDevedor: [false],
      devedorId:[null],
      classificacaoId:[null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.db.getDevedoresFull().subscribe(res=>{
      this.listaDevedores = res.filter(e=> e.status);
    });

    this.db.getClassificacoesFull().subscribe(res=>{
      this.listaCategorias = res.filter(e=> e.status && e.tipo == 'Entrada').sort(this.ordenar);
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

  salvar() {  
    if (this.form.valid) {
      this.db.novaEntradaRequest(this.form.value).subscribe(res=>{
        console.log(res);
      })
    }else{
      alert("Preencha todos os dados.")
    }
  }

  toogleComboCartoes() {
    console.log('foi')
    if (this.form.controls['meioPagto'].value != "cartao") {
      this.isCartao = true;
      this.form.controls['cartaoSelecionado'].reset();
    } else {
      this.isCartao = false
    }
  }

  validaDevedor(){
    if(!this.form.controls['associaDevedor'].value){
      console.log('alterando');
      this.form.controls['devedorId'].setValue(null);
    }
  }

  toogleMarcarPago(){
    if(this.form.controls['qtdeParcelas'].value == 1){
      this.recebido = false;
    }else{
      this.recebido = true;
      this.form.controls['recebido'].setValue(false);
      this.form.controls['idConta'].setValue(null);
    }
  }

}
