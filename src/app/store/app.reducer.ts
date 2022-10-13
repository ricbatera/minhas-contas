import { createAction, createReducer, on, props } from "@ngrx/store";

export interface IAppState {
    indice: number;
}

export const estadoInicial: IAppState = {
    indice: 0
};


export const indiceTab = createAction('[App] Reset Contatodr', props<{payload: number}>());

export const appReducer = createReducer(estadoInicial,
    on(indiceTab, (state, action) => {
        state = {
            ...state,
            indice: action.payload
        }
        return state;
    })
)