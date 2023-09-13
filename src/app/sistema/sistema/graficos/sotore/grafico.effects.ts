import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import * as actionGraficos from './graficos.actions';
import { map, switchMap } from 'rxjs';
import { ParamMesAno } from 'src/app/model/filtroMesAno';

@Injectable()
export class GraficosEffects {
  constructor(private db: DatabaseServiceService, private actions$: Actions) {}

  carregaDashboardData = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGraficos.loadDashboardData),
      switchMap(() =>
        this.db
          .getDashboardValues(6, 2023)
          .pipe(
            map((payload) => actionGraficos.successDashboardData({ payload }))
          )
      )
    )
  );

  carregaSaidasPeriodData = createEffect(() => this.actions$.pipe(
    ofType(actionGraficos.loadSaidasPeriodData),
    switchMap(()=> this.db.getCategoriasPeriod(7, 2023, 7, 2023).pipe(
        map((payload) => actionGraficos.successSaidasPeriodData({payload}))
    ))
  ));

  carregaGraficoMensal = createEffect(()=> this.actions$.pipe(
    ofType(actionGraficos.loadGraficoMensal),
    switchMap((p)=> this.db.getGraficoMensal(p.payload.mesStart, p.payload.anoStart, p.payload.mesEnd, p.payload.anoEnd, p.payload.idDevedor).pipe(
      map((res) => actionGraficos.successGraficoMensal({payload: {loading: false, data: res }}))
  ))
  ));

  carregaGraficoParceladas = createEffect(()=> this.actions$.pipe(
    ofType(actionGraficos.loadGraficoParcelada),
    switchMap((p)=> this.db.getGraficoParceladas(p.payload.mesStart, p.payload.anoStart, p.payload.mesEnd, p.payload.anoEnd, p.payload.idDevedor).pipe(
      map((res) => actionGraficos.successGraficoParcelas({payload: {loading: false, data: res }}))
  ))
  ));
}
