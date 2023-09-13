import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getGraficoParceladas } from '../sotore/graficos.selectors';
import { loadGraficoParcelada } from '../sotore/graficos.actions';
import { getfiltrosAnoMes } from 'src/app/sistema/store/sistema.selectors';
import { UtilsService } from 'src/app/services/utils.service';
import { ChartConfiguration } from 'chart.js';
import { configGraficoParceldas } from '../utils.configs';
import { FiltrosService } from 'src/app/services/filtros.service';
import { UtilsChartjs } from 'src/app/services/utils-chartjs.service';

@Component({
  selector: 'app-graf-parceladas',
  templateUrl: './graf-parceladas.component.html',
  styleUrls: ['./graf-parceladas.component.css'],
})
export class GrafParceladasComponent implements OnInit {
  loading = true;
  nomesCategorias: string[] = [];
  valores: any[] = [];
  mesinicial = 1;
  labels: string[] = [];
  dados: dados[] = []

  constructor(
    private store: Store,
    private util: UtilsService,
    private utils: FiltrosService,
    private utilChartjs: UtilsChartjs
  ) {}

  barChartData!: ChartConfiguration<'bar'>['data'];
  barChartOptions: ChartConfiguration<'bar'>['options'] =
    configGraficoParceldas;
  barChartLegend = false;
  barChartPlugins = [];

  ngOnInit(): void {
    this.store.select(getfiltrosAnoMes).subscribe((res) => {
      this.mesinicial = res.mesStart;
    });

    this.store.select(getGraficoParceladas).subscribe((res) => {
      if (!res.loading) {
        this.loading = res.loading;
        let data = [...res.data];
        data.forEach((e) => {
          e.nomesQtdes.forEach((f) => {
            this.labels.push(`${this.utils.capitalize(f.nomeMes)} ${e.ano}`);
          });
        });
        data.forEach((e) => {
          e.nomesQtdes.forEach((f, i) => {
            this.dados.push({label: f.nomeParcela, data: f.valor, backgroundColor: this.utilChartjs.color(i++)});
          });
        });
        //this.updateChartData();
      }
    });
  }

  // updateChartData(): void {
  //   this.barChartData = {
  //     labels: this.labels,
  //     datasets: [...this.dados],
  //   };
  // }
}

interface dados {
  label: string;
  data: number;
  backgroundColor: string;
}
