import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

// MATERIAL
import {MatCardModule} from '@angular/material/card'; 


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class DashboardModule { }
