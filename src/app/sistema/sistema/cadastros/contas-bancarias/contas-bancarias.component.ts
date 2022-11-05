import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { ContaBancaria } from 'src/app/model/conta-bancaria';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { DialogDeletarComponent } from '../components/dialog-deletar/dialog-deletar.component';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface conta {
  id: any,
  conta: string,
  descricao: string
}

@Component({
  selector: 'app-contas-bancarias',
  templateUrl: './contas-bancarias.component.html',
  styleUrls: ['./contas-bancarias.component.css']
})
export class ContasBancariasComponent implements OnInit {

  form: FormGroup;
  colunasTabela: string[] = ["id", 'conta', 'descricao', 'acao'];
  fonteDados: ContaBancaria[] = [];
  fonteDadosFiltro: ContaBancaria[] = [];

  selecaoLista: any = "2";
  conta?: ContaBancaria;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private db: DatabaseServiceService
  ) {
    this.form = this.fb.group({
      id1: [null],
      nome: [null, Validators.required],
      obs: [null, Validators.required]
    })
  }

  ngAfterViewInit() {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.db.getContasFull()
          .pipe(catchError(() => observableOf(null)))
      }
      ),
      map(data => {
        if (data === null) {
          return [];
        }
        return data;
      })
    ).subscribe(data => this.fonteDados = data)
  }

  ngOnInit(): void {
    // console.log(this.fonteDados);
    this.filtraLista();
  }

  salvar() {
    if (this.form.valid) {
      this.db.novaConta(this.form.value).subscribe(res=>{
        console.log(`Retorno da API salvar Conta ${res}`)
        this.ngAfterViewInit();
      })
    } else {
      alert('há erros no formulário')
    }

  }

  filtraLista() {
    console.log(this.fonteDados);
    if (this.selecaoLista == "0") {
      let newList = this.fonteDados.filter(conta => conta.status);
      this.fonteDados = newList;
    } else if (this.selecaoLista == "1") {
      let newList = this.fonteDados.filter(conta => !conta.status);
      this.fonteDados = newList;
    } else {
      this.ngAfterViewInit(); // não é a melhor prática - preciso ver uma forma de fazer cache dessas informações
    }
  }

  deleta(id: number) {
    // this.fonteDados.forEach(element => {if(element.id == id) this.conta = element });
    // const dialogRef = this.dialog.open(DialogDeletarComponent, {
    //   width: '500px',
    //   data: this.conta,
    // });

    // dialogRef.afterClosed().subscribe((res: ContaBancaria) =>{
    //   this.conta = res;
    //   mockDados.inativarConta(res.id); // mock
    // })
  }

  edita(id: number) {

  }
}
