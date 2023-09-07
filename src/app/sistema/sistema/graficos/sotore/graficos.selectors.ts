import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICategoriaPeriod, IGraficoMensal, Isaidas } from "./graficos.state";
import { graficoMensalFeatureKey, saidaFeatureKey } from "./graficos.reducer";
import { ItemListaSaidaApi } from "src/app/model/item-lista-saida-api";


const estadoTags = createFeatureSelector<ICategoriaPeriod>(saidaFeatureKey);

export const getCategoriasAndValues = createSelector(estadoTags, state=> state);


const mapCategoriaAnValue = (item: ItemListaSaidaApi): categoriasAndValues => {
    return {categoria: item.classificacaoNome, valor: item.valor}
}

interface categoriasAndValues {
    categoria: string,
    valor: number
}

// pegando dados do grafico mensal
const estadoGraficoMensal = createFeatureSelector<IGraficoMensal>(graficoMensalFeatureKey);
export const getGraficoMensal = createSelector(estadoGraficoMensal, state=> state);