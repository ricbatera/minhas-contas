import { createReducer, on } from "@ngrx/store";
import { ICategoriaPeriod, IGraficoMensal, IdashboardState, Isaidas } from "./graficos.state";
import { successDashboardData, successGraficoMensal, successSaidasPeriodData } from "./graficos.actions";
import { ItemListaSaidaApi } from "src/app/model/item-lista-saida-api";

export const estadoInical: IdashboardState = {
    cartoes: [],
    debitoBoleto: [],
    devedores: [],
    contas: [],
    totalSaidasDoMes: 0,
    totalEntradasDoMes: 0,
    totalPagoDoMes: 0,
    totalRecebidoDoMes: 0,
    totalEmBoletos: 0,
    minhasSaidas: 0,
    minhasEntradas: 0,
    saldo: {
        totalSaidas: 0,
        totalEntradas: 0,
        saldo: 0
    },
    saldoAcumulado: 0
}

export const productsFeatureKey = 'graficosState';
export const saidaFeatureKey = 'saidaState';

export const graficosReducer = createReducer(estadoInical,
    on(successDashboardData, (state, {payload})=>({...payload}))        
);

// saídas
export const estadoInicialSaidasGrafico:ICategoriaPeriod ={
    categorias: [],
    valores: []
} 

export const graficoSaidasReducer = createReducer(
    estadoInicialSaidasGrafico,
    on(successSaidasPeriodData, (state, {payload})=>({...payload}))
)

// grafico mensal
export const graficoMensalFeatureKey = 'graficoMensalState'; // associar essse item no modulo para mostar no redux 
export const estadoInicialGraficoMensal:IGraficoMensal =  {
    loading: true,
    data: []
}

export const graficoMensalReducer = createReducer(
    estadoInicialGraficoMensal,
    on(successGraficoMensal, (state, {payload})=>({...payload}))
)


