import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SistemaModule } from './sistema/sistema.module';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer, saidasReducer } from './store/app.reducer';
import { sistemaReducer } from './sistema/store/sistema.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SistemaEffects } from './sistema/store/sistema.effects';
import * as fromSistemaReducer from './sistema/store/sistema.reducer';
import * as estadoGeralRedecuer from './store/estadogeral.reducer'
import { EstadoGeralEffects } from './store/estadogeral.effects';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
    ,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SistemaModule,
    StoreModule.forRoot({app: appReducer, saidaReducer: saidasReducer }, {}),
    StoreModule.forFeature(fromSistemaReducer.productsFeatureKey, fromSistemaReducer.sistemaReducer),
    StoreModule.forFeature(estadoGeralRedecuer.estadoGeralDevedoresFeatureKey, estadoGeralRedecuer.listaDevedoresReducer),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    EffectsModule.forRoot([SistemaEffects]),
    EffectsModule.forFeature([EstadoGeralEffects])

  ],
  providers: [
    {provide: LOCALE_ID, useValue:'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
