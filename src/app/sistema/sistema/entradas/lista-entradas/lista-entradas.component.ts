import { mockDados } from 'src/app/MOCK/mock-dados';
import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListaEntradasComponent {
  mock = mockDados;
  form: FormGroup;
  columnsToDisplay: string[] = ['id', 'descricao', 'valor', 'parcela', 'observacao', ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: null | undefined;
  fonteListaEntradas = new MatTableDataSource(this.mock.getListaEntrada());

  listaEntrada = mockDados.getListaEntrada();
  isEntrada = true;

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

  toogleComboEntrada() { }
}
