import { Action, createAction, props } from "@ngrx/store";
import { Devedor } from "../model/devedor";

enum tiposAction {
    loadingListarDevedores = '[Estado Geral] Carregando lista de Devedores',
    successListaDevedores = '[Estado Geral] Lista de Devedores carregados com sucesso'
}

export const loadingListarDevedores = createAction(tiposAction.loadingListarDevedores);
export const successListaDevedores = createAction(tiposAction.successListaDevedores, props<{devedores: Devedor[]}>());