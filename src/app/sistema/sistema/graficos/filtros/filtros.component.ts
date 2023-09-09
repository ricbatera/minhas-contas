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
import { UtilsService } from 'src/app/services/utils.service';
import { meses } from 'src/app/model/meses';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent implements OnInit {
  loading$: Observable<boolean>;
  listaDevedores$: Observable<Devedor[]>;
  devedorSelecionadoControl = new FormControl();
  mesInicial = new FormControl();
  mesFinal = new FormControl();
  anoInicial = new FormControl();
  anoFinal = new FormControl();
  paramFiltros!: ParamMesAno;
  meses$:Observable<meses[]>;
  anos$:Observable<number[]>;

  constructor(private store: Store, private fb: FormBuilder, private util: UtilsService) {
    this.loading$ = store.select(getListaDevedoresLoadingStatus);
    this.listaDevedores$ = store.select(getListaDevedores);
    store.select(getfiltrosAnoMes).subscribe(res=>{
      let a = {... res}
      this.paramFiltros = a;
      this.setaMesAnoDefault();       
    })
    this.meses$ = util.getMeses;
    this.anos$ = util.getAnos;
  }

  ngOnInit(): void {
    this.listaDevedores$.subscribe(() => {
      this.selecionarPrimeiroItem();
    });
    
  }

  ngAfterViewInit():void{

    this.mesInicial.valueChanges.subscribe(valor =>{
      let pay = {...this.paramFiltros}
      pay.mesStart = valor.valueOf(valor);
      this.filtrar(pay);
    });
    this.devedorSelecionadoControl.valueChanges.subscribe(id =>{
      let pay = {...this.paramFiltros}
      pay.idDevedor = id.valueOf(id);
      this.filtrar(pay);      
    });  
    this.mesFinal.valueChanges.subscribe(valor =>{
      let pay = {...this.paramFiltros}
      pay.mesEnd = valor.valueOf(valor);
      this.filtrar(pay);
    });
    this.anoInicial.valueChanges.subscribe(valor =>{
      let pay = {...this.paramFiltros}
      pay.anoStart = valor.valueOf(valor);
      this.filtrar(pay);
    });
    this.anoFinal.valueChanges.subscribe(valor =>{
      let pay = {...this.paramFiltros}
      pay.anoEnd = valor.valueOf(valor);
      this.filtrar(pay);
    });
  }

  setaMesAnoDefault(){
    this.mesInicial.setValue(`${this.paramFiltros.mesStart}`);
    this.mesFinal.setValue(`${this.paramFiltros.mesEnd}`);
    this.anoInicial.setValue(`${this.paramFiltros.anoStart}`);
    this.anoFinal.setValue(`${this.paramFiltros.anoEnd}`);
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
