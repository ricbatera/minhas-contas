import { Component, OnInit, ViewChild } from '@angular/core';
import { mockDados } from './../../../../MOCK/mock-dados';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {
  mock = mockDados; // dados mockados para testes
    form: FormGroup;
    colunasTabela: string[] = ['conta', 'descricao', 'acao'];
    fonteCartoes = new MatTableDataSource(this.mock.getCartoes());

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
      this.fonteCartoes.sort = this.sort;
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
      console.log(this.mock.getCartoes())

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
