import { Action, createAction, props } from "@ngrx/store";
import { Classificacao } from "src/app/model/classificacao";

export const carregaTagsLoading = createAction('[Sistema] Carrega Tags Loading');
export const novaTagLoading = createAction('[Sistema] Nova Tags Loading', props<{tag: Classificacao}>());
export const carregaTagsSuccess = createAction('[Sistema] Carrega Tags Sucesso', props<{tags: Classificacao[]}>());
export const novaTagsSuccess = createAction('[Sistema] Nova Tags Sucesso', props<{tags: Classificacao[]}>());
export const carregaTagsErro = createAction('[Sistema] Carrega Tags Erro');
export const updateTagList = createAction('[Sistema] Atualiza Lista de Ids das Tags', props<{tagsSelecionadas: Classificacao[]}>());
export const addTagListaSelecionadas = createAction('[Sistema] Add Tag na lista de selecionadas', props<{tag: Classificacao}>());
export const removeTagListaSelecionadas = createAction('[Sistema] Remove item da lista de Tags selecionadas', props<{tag: Classificacao}>());
export const resetTagListaSelecionadas = createAction('[Sistema] Zera lista de Tags selecionadas');
export const getIdListaTagSelecionada = createAction('[Sistema] Get Ids da lista de Tags Selecionas')

// criando action de forma diferente
export enum MeusTiposAction {
    NovaTag = '[Sistema] Nova Tag Loading'
}

export class criaTag implements Action{
    readonly type: string = MeusTiposAction.NovaTag
    constructor(public tag: Classificacao){}
}