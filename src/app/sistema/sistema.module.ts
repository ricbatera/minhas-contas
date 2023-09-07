import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema/sistema.component';

//angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { CadastrosModule } from './sistema/cadastros/cadastros.module';
import { SaidasModule } from './sistema/saidas/saidas.module';
import { EntradasModule } from './sistema/entradas/entradas.module';
import { DashboardModule } from './sistema/dashboard/dashboard.module';
import { SistemaRoutingModule } from './sistema-routing.module';
import { GraficosModule } from './sistema/graficos/graficos.module';
import * as sistemaReducer from './store/sistema.reducer'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SistemaEffects } from './store/sistema.effects';
// import { MenuMesesAnosComponent } from './sistema/components/menu-meses-anos/menu-meses-anos.component';




@NgModule({
  declarations: [
    SistemaComponent,
    // MenuMesesAnosComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    CadastrosModule,
    SaidasModule,
    EntradasModule,
    DashboardModule,
    GraficosModule,
    SistemaRoutingModule,
    StoreModule.forFeature(sistemaReducer.filtroAnoMesFeatureKey, sistemaReducer.FiltrosDePesquisaReducer),
    EffectsModule.forFeature([SistemaEffects])
  ],
  exports: [
    SistemaComponent,
    // MenuMesesAnosComponent
  ]
})
export class SistemaModule { }
