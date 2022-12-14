import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntradasComponent } from './entradas/entradas.component';

//Angular material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ListaEntradasComponent } from './lista-entradas/lista-entradas.component';
import { NovaEntradaComponent } from './nova-entrada/nova-entrada.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';

import { BrowserModule } from '@angular/platform-browser';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { EntradaDetalheComponent } from './entrada-detalhe/entrada-detalhe.component';
import { DailogReceberEntradaComponent } from './dailog-receber-entrada/dailog-receber-entrada.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MenuMesesAnosComponent } from '../components/menu-meses-anos/menu-meses-anos.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    EntradasComponent,
    NovaEntradaComponent,
    ListaEntradasComponent,
    EntradaDetalheComponent,
    DailogReceberEntradaComponent,
    // MenuMesesAnosComponent,
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
    CurrencyMaskModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatExpansionModule,
    ComponentsModule
  ]
})
export class EntradasModule { }
