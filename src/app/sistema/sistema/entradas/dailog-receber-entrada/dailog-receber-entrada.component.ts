import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selecioneConta!: contaBancaria;
  recebeDefault = "1";
  habilita = false;


  constructor(

    private db: DatabaseServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DailogReceberEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemEntradaApi,

  ) { }



  ngOnInit(): void {
    this.db.getContasAtivas().subscribe(res => {
      this.listaContas = res;
    })
  }

  Cacenlar(): void {
    this.dialogRef.close();
  }

  Receber(): void {
    alert("Valor Recebido...");
  }

  setaValorPago(){

  }

}

