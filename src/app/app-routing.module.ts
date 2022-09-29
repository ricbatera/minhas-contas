import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaComponent } from './sistema/sistema/sistema.component';

const routes: Routes = [
  {path:'', component: SistemaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
