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

    SistemaRoutingModule
  ],
  exports: [
    SistemaComponent,
    // MenuMesesAnosComponent
  ]
})
export class SistemaModule { }
