import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrosComponent } from './sistema/cadastros/cadastros/cadastros.component';
import { DashboardComponent } from './sistema/dashboard/dashboard/dashboard.component';
import { EntradasComponent } from './sistema/entradas/entradas/entradas.component';
import { SaidasComponent } from './sistema/saidas/saidas/saidas.component';
import { SistemaComponent } from './sistema/sistema.component';

const routes: Routes = [
  {path:'', component: SistemaComponent, children:[ 
    {path:'cadastros', component: CadastrosComponent},
    {path:'dashboard', component: DashboardComponent},
    {path:'saidas', component: SaidasComponent},
    {path:'entradas', component: EntradasComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
