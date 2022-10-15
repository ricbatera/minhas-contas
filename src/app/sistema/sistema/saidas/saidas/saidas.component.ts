import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState, indiceTab } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.css']
})
export class SaidasComponent implements OnInit, OnChanges {

listaTabs = ['Nova Saída', "Lista de Saídas", "Detalhes"];
 selecionada = new FormControl(0);
 tab$ =  this.store.select('app').pipe(map(dado => dado.indice));
 constructor(
  private store:Store<{app: IAppState}>
){}
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.store.dispatch(indiceTab({payload: 1}))
    // }, 10000);
  }

  setaTab(ev: number){
    this.store.dispatch(indiceTab({payload: ev}));
  }
}
