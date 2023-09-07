import { createAction, props } from "@ngrx/store";
import { ICategoriaPeriod, IGraficoMensal, IdashboardState, Isaidas } from "./graficos.state";
import { ItemListaSaidaApi } from "src/app/model/item-lista-saida-api";
import { ParamMesAno } from "src/app/model/filtroMesAno";

enum graficosAction{
    loadDashboardData = '[Graficos] Carrega dados da dashboard',
    successDashboardData = '[Graficos] Sucesso dados carregados - Dashboard',
    loadSaidasPeriod = '[Graficos] Carrega dados saidas por periodo',
    successSaidasData = '[Graficos] Sucesso dados carregados - Saidas',
    loadGraficoMensal = '[Graficos] Carrega dados do grafico mensal',
    successGraficoMensal = '[Grafico] Sucesso grafico mensal carregado',
    filtroPesquisaMesAnoDevedor = '[Filtro] Filtro de pesquisa mes e ano inicial e final'
}

export const loadDashboardData = createAction(graficosAction.loadDashboardData);
export const successDashboardData = createAction(graficosAction.successDashboardData, props<{payload: IdashboardState}>());
export const loadSaidasPeriodData = createAction(graficosAction.loadSaidasPeriod);
export const successSaidasPeriodData = createAction(graficosAction.successSaidasData, props<{payload: ICategoriaPeriod}>());
export const loadGraficoMensal = createAction(graficosAction.loadGraficoMensal, props<{payload:ParamMesAno}>());
export const successGraficoMensal = createAction(graficosAction.successGraficoMensal, props<{payload: IGraficoMensal}>());
