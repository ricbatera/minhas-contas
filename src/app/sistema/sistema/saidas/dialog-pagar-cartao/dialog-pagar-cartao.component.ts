import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { ItemListaSaida } from 'src/app/model/item-lista-saidas';
import { fatura, parcela } from 'src/app/model/model';
@Component({
  selector: 'app-dialog-pagar-cartao',
  templateUrl: './dialog-pagar-cartao.component.html',
  styleUrls: ['./dialog-pagar-cartao.component.css']
})
export class DialogPagarCartaoComponent implements OnInit {
  fatura?: fatura;
  valorTotalFatura: number | undefined = 0;
  pagamentoIntegral = "1";
  gerarParcelaProximaFatura = false;

  constructor(
    public dialogRef: MatDialogRef<DialogPagarCartaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemListaSaida,
  ) { }

  ngOnInit(): void {
    this.fatura = mockDados.getFatura(this.data.idFatura);
    this.fatura!.valorPago = this.fatura!.valor;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  calculaValorTotalFatura(){
    let parcelas: parcela[] | undefined;
    parcelas = this.fatura?.itens
    this.valorTotalFatura = parcelas?.reduce((a , b)=> a + b.valor, 0)
  }

  setaValorPago(){
    if(this.pagamentoIntegral == "1"){
      this.fatura!.valorPago = this.fatura!.valor;
      this.gerarParcelaProximaFatura = false;
    } else {
      this.fatura!.valorPago = 0;
      this.gerarParcelaProximaFatura = true;
    }
  }
  
  pagar(){
    console.log(this.fatura);
  }

}
