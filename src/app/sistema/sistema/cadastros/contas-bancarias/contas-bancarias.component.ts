import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mockDados } from 'src/app/MOCK/mock-dados';

@Component({
  selector: 'app-contas-bancarias',
  templateUrl: './contas-bancarias.component.html',
  styleUrls: ['./contas-bancarias.component.css']
})
export class ContasBancariasComponent implements OnInit {
  mock = mockDados; // dados mockados para testes
  form: FormGroup;
  colunasTabela: string[] = ['conta', 'descricao', 'acao'];
  fonteDados = new MatTableDataSource(this.mock.getContas());

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer
  ) { 
    this.form = this.fb.group({
      id:[null],
      nome:[null, Validators.required],
      descricao:[null, Validators.required]
    })
  }

  ngAfterViewInit() {
    this.fonteDados.sort = this.sort;
  }

  ngOnInit(): void {
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

  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Ordenando ${sortState.direction}fim`);
    } else {
      this._liveAnnouncer.announce('Ordenação limpa');
    }
  }

}
