import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration } from 'chart.js';
import { loadGraficoMensal } from '../sotore/graficos.actions';
import { getCategoriasAndValues, getGraficoMensal } from '../sotore/graficos.selectors';
import { getfiltrosAnoMes } from 'src/app/sistema/store/sistema.selectors';
import { FiltrosService } from 'src/app/services/filtros.service';
import {configGrafico}  from '../utils.configs'

@Component({
  selector: 'app-graf-categorias',
  templateUrl: './graf-categorias.component.html',
  styleUrls: ['./graf-categorias.component.css']
})
export class GrafCategoriasComponent implements OnInit {
  nomesCategorias: string[] = [];
  valores: number[] = [];
  barChartLegend = false;
  barChartPlugins = [];

  constructor(private store: Store, private utils:FiltrosService) {}

  barChartData!: ChartConfiguration<'bar'>['data'];

  barChartOptions: ChartConfiguration<'bar'>['options'] = configGrafico;


  

  ngOnInit(): void {
    // this.store.select(getCategoriasAndValues).subscribe(res => {
    //   console.table(res);
    //   this.nomesCategorias = res.categorias;
    //   this.valores = res.valores;
    //   this.updateChartData();
    // })

    this.store.select(getfiltrosAnoMes).subscribe(payload=>{
      this.store.dispatch(loadGraficoMensal({payload}))
    });
    this.store.select(getGraficoMensal).subscribe(res=>{
      if(res.loading){
        res.data.forEach(e=>{
          e.meses.forEach(f=>{
            this.nomesCategorias.push(`${this.utils.capitalize(f.nomeMes)} ${e.ano}`)
            this.valores.push(f.valor)
          })
        })
        this.updateChartData();
      }
    })
  }

  updateChartData(): void {
    this.barChartData = {
      labels: this.nomesCategorias,
      datasets: [{ data: this.valores }]
    };
  }
}