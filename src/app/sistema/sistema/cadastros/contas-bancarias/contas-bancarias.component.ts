import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { contaBancaria} from 'src/app/model/model'
import { DialogDeletarComponent } from '../components/dialog-deletar/dialog-deletar.component';
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
  mock = mockDados; // dados mockados para testes
  form: FormGroup;
  colunasTabela: string[] = ["id", 'conta', 'descricao', 'acao'];
  fonteDados = new MatTableDataSource<contaBancaria>(this.mock.getContas());
  selecaoLista: any = "2";
  conta?: contaBancaria;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      id1: [null],
      nome: [null, Validators.required],
      descricao: [null, Validators.required]
    })
  }

  ngAfterViewInit() {
    this.fonteDados.sort = this.sort;
  }

  ngOnInit(): void {
    console.log(this.fonteDados);
    this.filtraLista();
  }

  salvar() {
    if (this.form.valid) {
      alert("Salvando...")
    } else {
      alert('há erros no formulário')
    }
    // console.log(this.form.value)
    console.log(this.mock.getContas())

  }

  filtraLista() {
    if (this.selecaoLista == "0") {
      let newList = mockDados.getContas().filter(conta => conta.ativo);
      this.fonteDados.data = newList;
    } else if (this.selecaoLista == "1") {
      let newList = mockDados.getContas().filter(conta => !conta.ativo);
      this.fonteDados.data = newList;
    } else {
      this.fonteDados.data = mockDados.getContas();
    }
  }

  deleta(id: number){
    this.fonteDados.data.forEach(element => {if(element.id == id) this.conta = element });
    const dialogRef = this.dialog.open(DialogDeletarComponent, {
      width: '500px',
      data: this.conta,
    });

    dialogRef.afterClosed().subscribe((res: contaBancaria) =>{
      this.conta = res;
      mockDados.inativarConta(res.id); // mock
    })
  }

  edita(id: number){

  }
}
