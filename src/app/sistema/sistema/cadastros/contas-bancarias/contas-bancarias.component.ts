import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mockDados } from 'src/app/MOCK/mock-dados';

export interface conta{
  id:any,
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
  colunasTabela: string[] = ["id",'conta', 'descricao', 'acao'];
  fonteDados = new MatTableDataSource<conta>(this.mock.getContas());
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
  ) {    
    this.form = this.fb.group({
      id1:[null],
      nome:[null, Validators.required],
      descricao:[null, Validators.required]
    })
  }

  ngAfterViewInit() {
    this.fonteDados.sort = this.sort;
  }
  
  ngOnInit(): void {
    console.log(this.fonteDados);
  }

  salvar(){
    if(this.form.valid){
      alert ("Salvando...")
    }else{
      alert('há erros no formulário')
    }
    // console.log(this.form.value)
    console.log(this.mock.getContas())
  
  }
  

}
