import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Devedor } from 'src/app/model/devedor';
import { ParamMesAno } from 'src/app/model/filtroMesAno';
import { getfiltrosAnoMes } from 'src/app/sistema/store/sistema.selectors';
import {
  getListaDevedores,
  getListaDevedoresLoadingStatus,
} from 'src/app/store/estadogeral.selectors';
import { loadGraficoMensal } from '../sotore/graficos.actions';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent implements OnInit {
  loading$: Observable<boolean>;
  listaDevedores$: Observable<Devedor[]>;
  devedorSelecionadoControl = new FormControl();
  paramFiltros!: ParamMesAno;

  constructor(private store: Store, private fb: FormBuilder) {
    this.loading$ = store.select(getListaDevedoresLoadingStatus);
    this.listaDevedores$ = store.select(getListaDevedores);
    store.select(getfiltrosAnoMes).subscribe(res=>{
      let a = {... res}
      this.paramFiltros = a;
    })
  }

  ngOnInit(): void {
    this.listaDevedores$.subscribe(() => {
      this.selecionarPrimeiroItem();
    });
    
  }

  ngAfterViewInit():void{
    this.devedorSelecionadoControl.valueChanges.subscribe(id =>{
      let pay = {...this.paramFiltros}
      pay.idDevedor = id.valueOf(id);
      this.filtrar(pay);
    })
  }

  selecionarPrimeiroItem() {
    this.listaDevedores$.pipe(take(1)).subscribe((devedores) => {
        if (devedores.length > 0) {        
          this.devedorSelecionadoControl.setValue(`${devedores[0].id}`);
        }
    });
  }

  filtrar(pay: ParamMesAno){
    this.store.dispatch(loadGraficoMensal({payload: pay}))
  }

}
