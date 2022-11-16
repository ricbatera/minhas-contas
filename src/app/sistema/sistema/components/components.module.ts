import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuMesesAnosComponent } from './menu-meses-anos/menu-meses-anos.component';
import { LoadingComponent } from './loading/loading.component';

//Material
import {MatProgressBarModule} from '@angular/material/progress-bar'; 



@NgModule({
  declarations: [
    MenuMesesAnosComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ], exports: [
    MenuMesesAnosComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
