import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosComponent } from './cadastros/cadastros.component';

//Componentes
import { ContasBancariasComponent } from './contas-bancarias/contas-bancarias.component';
import { CartoesCreditoComponent } from './cartoes-credito/cartoes-credito.component';

//Angular material
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import { DialogDeletarComponent } from './components/dialog-deletar/dialog-deletar.component';
import { DialogEditarComponent } from './components/dialog-editar/dialog-editar.component';
import {MatDialogModule} from '@angular/material/dialog'; 



@NgModule({
  declarations: [
    CadastrosComponent,
    ContasBancariasComponent,
    CartoesCreditoComponent,
    DialogDeletarComponent,
    DialogEditarComponent
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
    MatSortModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule
  ]
})
export class CadastrosModule { }
