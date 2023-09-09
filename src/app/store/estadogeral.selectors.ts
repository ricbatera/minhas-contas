import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IListaDevedores } from "./estadogeral.state";
import { estadoGeralDevedoresFeatureKey } from "./estadogeral.reducer";
import { Devedor } from "../model/devedor";

const estadoTags = createFeatureSelector<IListaDevedores>(estadoGeralDevedoresFeatureKey);

export const getListaDevedores = createSelector(estadoTags, state =>{
    let lista: Devedor[] = [...state.data.filter(e=> e.status)]
    lista.unshift({id:0, nome: "Eu", status: true})
    return lista;
});
export const getListaDevedoresFull = createSelector(estadoTags, state =>state.data);
export const getListaDevedoresAtivos = createSelector(estadoTags, state =>state.data.filter(e=> e.status));
export const getListaDevedoresInativos = createSelector(estadoTags, state =>state.data.filter(e=> !e.status));
export const getListaDevedoresLoadingStatus = createSelector(estadoTags, state => state.loading);

/*
let lista: Devedor[] = [{id:0, nome: "Eu", status: true}];
    lista = [...state.data.filter(e=> e.status]
    }));

     [{id:0, nome: "Eu", status: true}];
*/