import { Component, OnInit, ViewChild } from '@angular/core';
import { mockDados } from 'src/app/MOCK/mock-dados';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})


export class ListaEntradasComponent implements OnInit {
announceSortChange($event: Event) {
throw new Error('Method not implemented.');
}
  mock = mockDados; // dados mockados para testes
  form: FormGroup;
  colunasTabela: string[] = ['id', 'valor', 'descricao', 'parcela','prvisaoPagto', 'observacao', ''];
  fonteListaEntradas = new MatTableDataSource(this.mock.getListaEntrada());

  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private fb: FormBuilder,
      private _liveAnnouncer: LiveAnnouncer
  ) {
    this.form = this.fb.group({
      id:[null],
      valor:[null, Validators.required],
      descricao:[null, Validators.required],
      parcela:[null, Validators.required],
      prvisaoPagto:[null, Validators.required],
      observacao:[null, Validators.required]
    })
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.fonteListaEntradas.sort = this.sort;
  }

}
