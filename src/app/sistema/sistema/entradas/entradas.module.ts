import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntradasComponent } from './entradas/entradas.component';

//Angular material
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NovaEntradaComponent } from './nova-entrada/nova-entrada.component';
import { ListaEntradasComponent } from './lista-entradas/lista-entradas.component';

@NgModule({
  declarations: [
    EntradasComponent,
    NovaEntradaComponent,
    ListaEntradasComponent
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
    MatDividerModule,
    MatSelectModule,
  ]
})
export class EntradasModule { }
