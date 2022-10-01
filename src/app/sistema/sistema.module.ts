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




@NgModule({
  declarations: [
    SistemaComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    CadastrosModule,
    SaidasModule,
    EntradasModule,
    DashboardModule,

    SistemaRoutingModule
  ],
  exports: [
    SistemaComponent
  ]
})
export class SistemaModule { }
