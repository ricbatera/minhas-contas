import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { entrada, EntradaDetalhes } from 'src/app/model/entrada-detalhes';
import { itemListaEntrada } from 'src/app/model/item-lista-entrada';
import { contaBancaria } from 'src/app/model/model';
import { ContasBancariasComponent } from '../../cadastros/contas-bancarias/contas-bancarias.component';

@Component({
  selector: 'app-dailog-receber-entrada',
  templateUrl: './dailog-receber-entrada.component.html',
  styleUrls: ['./dailog-receber-entrada.component.css']
})
export class DailogReceberEntradaComponent implements OnInit {
  entrada?: entrada;


  listaContas =mockDados.getContas();
  isConta = true;
  selecioneConta!: contaBancaria;
  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DailogReceberEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: itemListaEntrada,

  ) {  }



  ngOnInit(): void {
  }

  Cacenlar(): void {
    this.dialogRef.close();
  }

  Receber(): void {
    alert("Valor Recebido...");
  }

  toogleComboContas(){
  
  }
 
  }

