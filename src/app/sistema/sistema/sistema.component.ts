import { style, trigger, animate, transition, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { menu } from 'src/assets/menudata/menu';
import { carregaTagsLoading } from '../store/sistema.actions';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css'],
  animations:[
    trigger('rotate',[
      transition(':enter',[        
        animate('1000ms', keyframes([
          style({transform: 'rotate(0deg)', offset:'0'}),
          style({transform: 'rotate(2turn)', offset:'1'})
        ]))
      ])
    ])
  ]
})
export class SistemaComponent implements OnInit {

  menu = menu
  menuCollapsed = false;
  //nesse componente vamos carregar todas os dados globais da aplicação
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.store.dispatch(carregaTagsLoading());
  }

  toogleNav(): void{
    this.menuCollapsed = !this.menuCollapsed;
  }
  closeNav(): void{
    this.menuCollapsed = false;
  }

}
