import { createAction, createReducer, on, props } from '@ngrx/store';

export interface IAppState {
  indice: number;
  indiceEntradas: number;
  idEntrada: number;
}

export const estadoInicial: IAppState = {
  indice: 1,
  indiceEntradas: 1,
  idEntrada: 0,
};

export const indiceTab = createAction(
  '[App] Reset Contatodr',
  props<{ payload: number }>()
);
export const indiceTabEntrada = createAction(
  '[App] Indice tabela entrada',
  props<{ payload: number }>()
);
export const setaIdEntrada = createAction(
  '[App] Seta ID Saída',
  props<{ payload: number }>()
);

export const appReducer = createReducer(
  estadoInicial,
  on(indiceTab, (state, action) => {
    state = {
      ...state,
      indice: action.payload,
    };
    return state;
  }),
  on(setaIdEntrada, (state, action) => {
    state = {
      ...state,
      idEntrada: action.payload,
    };
    return state;
  }),
  on(indiceTabEntrada, (state, {payload}) => {
    state = {
      ...state,
      indiceEntradas: payload,
    };
    return state;
  })
);

/*         SAÍDAS              */

export interface ISaidasState {
  idSaida: number;
}

export const estadoInicialSaidas: ISaidasState = {
  idSaida: 0,
};

export const setaIdSaida = createAction(
  '[saidaReducer] Seta ID Saída',
  props<{ payload: number }>()
);
export const saidasReducer = createReducer(
  estadoInicialSaidas,
  on(setaIdSaida, (state, action) => {
    state = {
      ...state,
      idSaida: action.payload,
    };
    return state;
  })
);
