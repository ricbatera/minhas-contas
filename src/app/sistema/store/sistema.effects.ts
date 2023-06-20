import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import {
  carregaTagsLoading,
  carregaTagsSuccess,
  novaTagLoading,
  criaTag,
  addTagListaSelecionadas,
} from './sistema.actions';
import { switchMap, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { getListaTagsSaidas } from './sistema.selectors';

@Injectable()
export class SistemaEffects {
  constructor(private db: DatabaseServiceService, private actions$: Actions) {}

  carregaTodasTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carregaTagsLoading),
      switchMap((action) =>
        this.db
          .getClassificacoesFull()
          .pipe(map((tags) => carregaTagsSuccess({ tags })))
      )
    )
  );

  novaTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType<criaTag>('[Sistema] Nova Tag Loading'),
      switchMap((action) =>
        this.db.novaClassificacao(action.tag).pipe(
            mergeMap((tag)=> [
              addTagListaSelecionadas({ tag }),
              carregaTagsLoading()
            ])
          )
      )
    )
  );
}
