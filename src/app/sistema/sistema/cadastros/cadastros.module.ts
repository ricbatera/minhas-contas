import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosComponent } from './cadastros/cadastros.component';

//Componentes
import { ContasBancariasComponent } from './contas-bancarias/contas-bancarias.component';
import { CartoesCreditoComponent } from './cartoes-credito/cartoes-credito.component';

//Angular material
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    CadastrosComponent,
    ContasBancariasComponent,
    CartoesCreditoComponent
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
    MatSortModule
  ]
})
export class CadastrosModule { }
