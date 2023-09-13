import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafCategoriasComponent } from './graf-categorias/graf-categorias.component';
import { StoreModule } from '@ngrx/store';
import * as graficosReducer from './sotore/graficos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GraficosEffects } from './sotore/grafico.effects';
import { NgChartsModule } from 'ng2-charts';
import { FiltrosComponent } from './filtros/filtros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GrafParceladasComponent } from './graf-parceladas/graf-parceladas.component';

@NgModule({
  declarations: [
    GrafCategoriasComponent,
    FiltrosComponent,
    GrafParceladasComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      graficosReducer.productsFeatureKey,
      graficosReducer.graficosReducer
    ),
    StoreModule.forFeature(
      graficosReducer.saidaFeatureKey,
      graficosReducer.graficoSaidasReducer
    ),
    StoreModule.forFeature(
      graficosReducer.graficoMensalFeatureKey,
      graficosReducer.graficoMensalReducer
    ),
    StoreModule.forFeature(
      graficosReducer.graficoParceladasFeatureKey,
      graficosReducer.graficoMParceladaReducer
    ),
    EffectsModule.forFeature([GraficosEffects]),
    NgChartsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  exports: [
    GrafCategoriasComponent,
    FiltrosComponent, 
    GrafParceladasComponent
  ],
})
export class GraficosModule {}
