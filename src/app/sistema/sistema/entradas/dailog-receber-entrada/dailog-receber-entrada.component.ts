import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { allowedNodeEnvironmentFlags } from 'process';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { ContaBancaria } from 'src/app/model/conta-bancaria';
import { entrada, EntradaDetalhes } from 'src/app/model/entrada-detalhes';
import { ItemEntradaApi } from 'src/app/model/item-entrada-api';
import { itemListaEntrada } from 'src/app/model/item-lista-entrada';
import { contaBancaria } from 'src/app/model/model';
import { DatabaseServiceService } from 'src/app/services/database-service.service';

@Component({
  selector: 'app-dailog-receber-entrada',
  templateUrl: './dailog-receber-entrada.component.html',
  styleUrls: ['./dailog-receber-entrada.component.css']
})
export class DailogReceberEntradaComponent implements OnInit {

  listaContas: ContaBancaria[] = [];
  isConta = true;
  contaSelecionada = null;
  recebeDefault = "1";
  valor = 0;
  date = "";


  constructor(

    private db: DatabaseServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DailogReceberEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemEntradaApi,

  ) { }



  ngOnInit(): void {
    this.db.getContasAtivas().subscribe(res => {
      this.listaContas = res;
    });
    this.setaValorPago();
  }

  Cacenlar(): void {
    this.dialogRef.close();
  }

  receber(): void {
    if(this.valor != 0 && this.date != "" && this.contaSelecionada != null){
      let payload = {
        idParcela: this.data.id,
        dataRecebimento: this.date,
        valor: this.valor,
        idConta: this.contaSelecionada
      }  
      this.db.receberEntreda(payload).subscribe(res=>{
        this.dialogRef.close();
      })
    }else if (this.contaSelecionada == null){
      alert("Escolha a conta que vai receber o valor")
    
    }else {
      alert("Preencha o valor recebido e a data");
    }
  }

  setaValorPago() {
    this.valor = this.data.valor;
    this.date = this.data.dataPrevistaRecebimento

    if (this.recebeDefault == "1") {
      this.valor = this.data.valor;
      this.date = this.data.dataPrevistaRecebimento
    } else {
      this.valor = 0;
      this.date = ""
    }
  }

}

