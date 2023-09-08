import { createReducer, on } from "@ngrx/store";
import { IListaDevedores } from "./estadogeral.state";
import { successListaDevedores } from "./estadoGeral.actions";

//reducer  lista de devedores
export const estadoGeralDevedoresFeatureKey = 'estadoGeralDevedoresState';

export const estadoInicialDevedores: IListaDevedores = {
    loading: true,
    data: []
};
export const listaDevedoresReducer = createReducer(
    estadoInicialDevedores,
    on(successListaDevedores,(state, {devedores})=>({loading: false, data: devedores}))
)
