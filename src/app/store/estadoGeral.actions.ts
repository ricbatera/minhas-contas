import { Action, createAction, props } from "@ngrx/store";
import { Devedor } from "../model/devedor";

enum tiposAction {
    loadingListarDevedores = '[Estado Geral] Carregando lista de Devedores',
    successListaDevedores = '[Estado Geral] Lista de Devedores carregados com sucesso',
    novoDevedor = '[Estado Geral] Cria novo devedor',
    inativaDevedor = '[Estado Geral] Inativa um devedor',
}

export const loadingListarDevedores = createAction(tiposAction.loadingListarDevedores);
export const successListaDevedores = createAction(tiposAction.successListaDevedores, props<{devedores: Devedor[]}>());
export const novoDevedor = createAction(tiposAction.novoDevedor, props<{devedor: Devedor}>());
export const inativaDevedor = createAction(tiposAction.inativaDevedor, props<{idDevedor: number}>());