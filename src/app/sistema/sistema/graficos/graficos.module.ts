import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafCategoriasComponent } from './graf-categorias/graf-categorias.component';
import { StoreModule } from '@ngrx/store';
import * as graficosReducer from './sotore/graficos.reducer'
import { EffectsModule } from '@ngrx/effects';
import { GraficosEffects } from './sotore/grafico.effects';
import { NgChartsModule } from 'ng2-charts';
import { FiltrosComponent } from './filtros/filtros.component';



@NgModule({
  declarations: [
    GrafCategoriasComponent,
    FiltrosComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(graficosReducer.productsFeatureKey, graficosReducer.graficosReducer),
    StoreModule.forFeature(graficosReducer.saidaFeatureKey, graficosReducer.graficoSaidasReducer),
    StoreModule.forFeature(graficosReducer.graficoMensalFeatureKey, graficosReducer.graficoMensalReducer),
    EffectsModule.forFeature([GraficosEffects]),
    NgChartsModule
  ],
  exports:[
    GrafCategoriasComponent,
  FiltrosComponent
  ]
})
export class GraficosModule { }
