import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { parcela } from 'src/app/model/model';
import { SaidaDetalhes } from 'src/app/model/saida-detalhes';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { IAppState } from 'src/app/store/app.reducer';
import { CartaoCredito } from 'src/app/model/cartao-credito';

@Component({
  selector: 'app-detalhes-saida',
  templateUrl: './detalhes-saida.component.html',
  styleUrls: ['./detalhes-saida.component.css']
})
export class DetalhesSaidaComponent implements OnInit {

  idSaida$ = this.store.select('app').pipe(map(dado => {
    dado.idSaida
    this.carregaSaida();
  }));
  form: FormGroup;
  listaCartoes: CartaoCredito[] = []
  saidaDetalhe: SaidaDetalhes = mockDados.getSaidaDetalhes();
  listaParcelas = new MatTableDataSource<parcela>(this.saidaDetalhe.parcela);
  colunasTabela = ['Valor', 'Vencimento', 'Valor Pago', 'Pago em', 'Situação', 'Ação']
  saidaApi: any = null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<{ app: IAppState }>,
    private fb: FormBuilder,
    private db: DatabaseServiceService
  ) {
    this.form = this.fb.group({
      id: [this.idSaida$],
      nome: [null, Validators.required],
      obs: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      qtdeParcelas: [null, Validators.required],
      valor: [null, Validators.required],
      meioPagto: [null],
      cartaoSelecionado: [null],
    })
  }

  ngOnInit(): void {
    this.db.getCartoesAtivos().subscribe(res => {
      this.listaCartoes = res;
    })
    
  }

  carregaSaida(){
    this.db.getSaidaById(this.idSaida$).subscribe(res => {
      this.saidaApi = res;
      this.form.controls['nome'].setValue(this.saidaApi?.nome);
      this.form.controls['obs'].setValue(this.saidaApi.obs);
      this.form.controls['meioPagto'].setValue(this.saidaApi.meioPagto);
      this.form.controls['cartaoSelecionado'].setValue(this.saidaApi?.cartao?.id);
    })
  }

  ngAfterViewInit() {
    this.listaParcelas.sort = this.sort;
  }

  salvar() {

  }

}
