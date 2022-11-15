import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

// MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import { MenuMesesAnosComponent } from '../components/menu-meses-anos/menu-meses-anos.component';
import { compileNgModule } from '@angular/compiler';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    DashboardComponent,
    // MenuMesesAnosComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ComponentsModule
  ]
})
export class DashboardModule { }
