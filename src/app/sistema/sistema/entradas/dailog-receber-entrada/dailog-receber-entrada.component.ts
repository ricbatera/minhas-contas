import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { Entrada, EntradaDetalhes } from 'src/app/model/entrada-detalhes';
import { itemListaEntrada } from 'src/app/model/item-lista-entrada';
import { ContasBancariasComponent } from '../../cadastros/contas-bancarias/contas-bancarias.component';

@Component({
  selector: 'app-dailog-receber-entrada',
  templateUrl: './dailog-receber-entrada.component.html',
  styleUrls: ['./dailog-receber-entrada.component.css']
})
export class DailogReceberEntradaComponent implements OnInit {
  entrada?: Entrada;
  form: FormGroup;

  isConta = true;
  listaContas = mockDados.getContas();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DailogReceberEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntradaDetalhes,

  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      obs: [null, Validators.required],
      dataRecebimento: [null, Validators.required],
      qtdeParcelas: [null, Validators.required],
      valor: [null, Validators.required]
    })
  }


  ngOnInit(): void {
  }

  Cacenlar(): void {
    this.dialogRef.close();
  }
  Receber(): void {
    console.log("Valor Recebido...");
  }

  toogleComboCartoes(){
      this.isConta = true;
      this.form.controls['contaSelecionado'].setValue(null);
    }
  }

