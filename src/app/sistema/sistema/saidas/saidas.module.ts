import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaidasComponent } from './saidas/saidas.component';


//Angular material
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { NovaSaidaComponent } from './nova-saida/nova-saida.component';
import { DialogPagaSaida, ListaSaidasComponent } from './lista-saidas/lista-saidas.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatExpansionModule} from '@angular/material/expansion';

// outras libs
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DetalhesSaidaComponent } from './detalhes-saida/detalhes-saida.component';
import { DialogPagarCartaoComponent } from './dialog-pagar-cartao/dialog-pagar-cartao.component';



@NgModule({
  declarations: [
    SaidasComponent,
    NovaSaidaComponent,
    ListaSaidasComponent,
    DetalhesSaidaComponent,
    DialogPagaSaida,
    DialogPagarCartaoComponent,
  ],
  imports: [
    FormsModule,
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
    CurrencyMaskModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatExpansionModule
  ]
})
export class SaidasModule { }
