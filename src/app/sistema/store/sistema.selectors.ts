import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITagsState } from "./sistema.state";
import { filtroAnoMesFeatureKey, productsFeatureKey } from "./sistema.reducer";
import { ParamMesAno } from "src/app/model/filtroMesAno";

// aqui nós podemos criar os filtros dos itens que queremos selecionar nos componentes.

const estadoTags = createFeatureSelector<ITagsState>(productsFeatureKey);

export const getListaTags = createSelector(estadoTags, state=> state.tags);
export const getStatusLoadingTags = createSelector(estadoTags, state=> state.isLoading);
export const getListaTagsSaidas = createSelector(estadoTags, state=> state.tags.filter(tag=> tag.tipo == "Saída" && tag.status));
export const getListaTagsSelecionadas = createSelector(estadoTags, state=> state.tagsSelecionadas);
export const getListaIdTagSelecionada = createSelector(estadoTags, state => state.tagsSelecionadas.map(el=> el.id));

// pegando os filtros par pesquisar no banco
const estadoFiltrosAnoMes = createFeatureSelector<ParamMesAno>(filtroAnoMesFeatureKey);
export const getfiltrosAnoMes = createSelector(estadoFiltrosAnoMes, state=> state);