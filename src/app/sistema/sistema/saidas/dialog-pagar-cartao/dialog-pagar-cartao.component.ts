import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { FaturaApi } from 'src/app/model/fatura-api';
import { ItemListaSaidaApi } from 'src/app/model/item-lista-saida-api';
import { fatura, parcela } from 'src/app/model/model';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
@Component({
  selector: 'app-dialog-pagar-cartao',
  templateUrl: './dialog-pagar-cartao.component.html',
  styleUrls: ['./dialog-pagar-cartao.component.css']
})
export class DialogPagarCartaoComponent implements OnInit {
  fatura?: FaturaApi;
  // valorTotalFatura: number | undefined = 0;
  pagamentoIntegral = "1";
  usarDataVencimento = "3";
  gerarParcelaProximaFatura = false;
  v1 = null;
  v2 = null;

  constructor(
    public dialogRef: MatDialogRef<DialogPagarCartaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemListaSaidaApi,
    private db: DatabaseServiceService
  ) { }


  ngOnInit(): void {
    // this.fatura = mockDados.getFatura(this.data.idFatura);
    this.db.getFaturaApi(this.data.fatura?.id).subscribe(res=>{
      this.fatura = res;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  calculaValorTotalFatura(){
    // let parcelas: parcela[] | undefined;
    // parcelas = this.fatura?.itens
    // this.valorTotalFatura = parcelas?.reduce((a , b)=> a + b.valor, 0)

  }

  setaValorPago(){
    console.log(this.fatura)
    if(this.pagamentoIntegral == "1"){
      this.fatura!.valorPago = this.fatura!.valor;
      this.gerarParcelaProximaFatura = false;
    } else {
      this.fatura!.valorPago = null ;
      this.gerarParcelaProximaFatura = true;
    }
  }

  setaDataPagamento(){
    if(this.usarDataVencimento == "3"){
      this.fatura!.dataPagamento = this.fatura?.dataVencimento      
    } else {
      this.fatura!.dataPagamento = null      
    }
  }
  
  pagar(){
    console.log(this.fatura)
    let valor
    let dataPagto
    if(this.fatura?.valorPago == null){
       valor = this.fatura?.valor
    }
    if(this.fatura?.dataPagamento == null){
      dataPagto = this.fatura?.dataVencimento
    }
    let request = {
      idFatura: this.data.fatura?.id,
      dataPagamento: dataPagto,
      valor: valor,
      idConta: this.fatura?.conta?.id,
      gerarParcelaComDiferenca: this.gerarParcelaProximaFatura
    }

    console.log(request);
  }

}
