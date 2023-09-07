import { createReducer, on } from "@ngrx/store";
import { ITagsState } from "./sistema.state";
import { addTagListaSelecionadas, carregaTagsErro, carregaTagsLoading, carregaTagsSuccess, filtrosPesquisaMesAno, getIdListaTagSelecionada, removeTagListaSelecionadas, resetTagListaSelecionadas, updateTagList } from "./sistema.actions";
import { ParamMesAno } from "src/app/model/filtroMesAno";

export const estadoInical: ITagsState = {
    tags: [],
    isLoading: false,
    tagsSelecionadas: []
}

export const productsFeatureKey = 'tagsState';

export const sistemaReducer = createReducer(estadoInical,
    on(carregaTagsLoading, (state =>({
        ...state,
        isLoading: true
    }))),
    on(carregaTagsSuccess, (state, {tags})=>({
        ...state,
         tags,
        isLoading: false})),
    on(carregaTagsErro, state =>({
        ...state,
        isLoading: false
    })),
    on(updateTagList, (state, {tagsSelecionadas})=>({
        ...state,
        tagsSelecionadas
    })),
    on(addTagListaSelecionadas, (state, {tag})=>{
       const li = [...state.tagsSelecionadas, tag]
       return {...state, tagsSelecionadas: li}
    }),
    on(removeTagListaSelecionadas, (state, {tag})=>{
        const novoArray = state.tagsSelecionadas.filter(f=> f.id != tag.id)
        return{...state, tagsSelecionadas: novoArray}
    }),
    on(resetTagListaSelecionadas, state=> ({...state, tagsSelecionadas: []})),
    
)

// dados iniciais para pesquisa
export const filtroAnoMesFeatureKey = 'filtroMesAnoState';
export const estadoInicialFiltrosDePesquisa: ParamMesAno = {
    mesStart: 1,
    anoStart: 2023,
    mesEnd: 12,
    anoEnd: 2023,
    idDevedor: 0
}
export const FiltrosDePesquisaReducer = createReducer(
    estadoInicialFiltrosDePesquisa,
    on(filtrosPesquisaMesAno,(state, {payload})=>({...payload}))
)