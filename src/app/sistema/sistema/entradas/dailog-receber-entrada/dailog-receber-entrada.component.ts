import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { entrada, EntradaDetalhes } from 'src/app/model/entrada-detalhes';
import { itemListaEntrada } from 'src/app/model/item-lista-entrada';

@Component({
  selector: 'app-dailog-receber-entrada',
  templateUrl: './dailog-receber-entrada.component.html',
  styleUrls: ['./dailog-receber-entrada.component.css']
})
export class DailogReceberEntradaComponent implements OnInit {
  entrada?: entrada;
  valorTotalEntrada: number | undefined = 0;
  pagamentoIntegral = "1";
  
  form!: FormGroup;


  // form: FormGroup;
  isConta = true;
  listaContas = mockDados.getContas();
  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DailogReceberEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: itemListaEntrada,

  ) {  }

  ValorPago(){
    if(this.pagamentoIntegral == "1"){
      this.data.parcela.valorRecebido = this.data.parcela.valoReceber;
    } else {
      this.data.parcela.valorRecebido = 0;
    }
  }

  ngOnInit(): void {
  }

  Cacenlar(): void {
    this.dialogRef.close();
  }
  Receber(): void {
    alert("Valor Recebido...");
  }

 
  }

