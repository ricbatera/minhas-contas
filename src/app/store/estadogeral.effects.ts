import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { DatabaseServiceService } from '../services/database-service.service';
import { loadingListarDevedores, successListaDevedores } from './estadoGeral.actions';

@Injectable()
export class EstadoGeralEffects {
    constructor(private db: DatabaseServiceService, private actions$: Actions) {}

    //carrega lista dos devedores
    carregaTodasTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadingListarDevedores),
      switchMap((action) =>
        this.db
          .getDevedoresFull()
          .pipe(map((devedores) => successListaDevedores({ devedores })))
      )
    )
  );
}