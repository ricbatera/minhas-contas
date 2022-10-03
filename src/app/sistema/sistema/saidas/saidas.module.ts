import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaidasComponent } from './saidas/saidas.component';


//Angular material
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { NovaSaidaComponent } from './nova-saida/nova-saida.component';
import { ListaSaidasComponent } from './lista-saidas/lista-saidas.component';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    SaidasComponent,
    NovaSaidaComponent,
    ListaSaidasComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule
  ]
})
export class SaidasModule { }
