import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { DatabaseServiceService } from '../services/database-service.service';
import { inativaDevedor, loadingListarDevedores, novoDevedor, successListaDevedores } from './estadoGeral.actions';

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
    //salva novo devedor
    novoDevedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(novoDevedor),
      switchMap((devedor) =>
        this.db
          .novoDevedor(devedor.devedor)
          .pipe(map(() => loadingListarDevedores()))
      )
    )
  );
    //inativa novo devedor
    inativaDevedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inativaDevedor),
      switchMap((devedor) =>
        this.db
          .inativaDevedor(devedor.idDevedor)
          .pipe(map(() => loadingListarDevedores()))
      )
    )
  );


}