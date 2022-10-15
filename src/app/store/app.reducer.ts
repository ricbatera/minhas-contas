import { createAction, createReducer, on, props } from "@ngrx/store";

export interface IAppState {
    indice: number,
    idSaida: number,
}

export const estadoInicial: IAppState = {
    indice: 2,
    idSaida: 0,
};


export const indiceTab = createAction('[App] Reset Contatodr', props<{payload: number}>());
export const setaIdSaida = createAction('[App] Seta ID Saída', props<{payload: number}>());

export const appReducer = createReducer(estadoInicial,
    on(indiceTab, (state, action) => {
        state = {
            ...state,
            indice: action.payload
        }
        return state;
    }),
    on(setaIdSaida, (state, action) => {
        state = {
            ...state,
            idSaida: action.payload
        }
        return state;
    })
)