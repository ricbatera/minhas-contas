import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, merge, of as observableOf } from 'rxjs';
import { Devedor } from 'src/app/model/devedor';
import { Store } from '@ngrx/store';
import { getListaDevedoresAtivos, getListaDevedoresFull, getListaDevedoresInativos } from 'src/app/store/estadogeral.selectors';
import { inativaDevedor, novoDevedor } from 'src/app/store/estadoGeral.actions';

@Component({
  selector: 'app-devedor',
  templateUrl: './devedor.component.html',
  styleUrls: ['./devedor.component.css']
})
export class DevedorComponent implements OnInit {
  form: FormGroup;
  colunasTabela: string[] = ['ID', 'Nome', 'Ação'];
  lista: Devedor [] = [];
  selecaoLista = "2";
  listaDevedoresFull$:Observable<Devedor[]>;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      status: [true]
    });
    this.listaDevedoresFull$ = store.select(getListaDevedoresFull)
   }

  ngOnInit(): void {
    this.filtraLista()
  }

  salvar(){
    if(this.form.valid){
      let devedor: Devedor ={
        id: this.form.controls['id'].value,
        nome: this.form.controls['nome'].value,
        status: true
      }
      this.store.dispatch(novoDevedor({devedor}))
      
    }else{
      alert("Form inválido")
    }
  }

  filtraLista(){
    switch (this.selecaoLista) {
      case "0":
        this.store.select(getListaDevedoresAtivos).subscribe(res=>this.lista = res);
        break;
    
      case "1":
        this.store.select(getListaDevedoresInativos).subscribe(res=>this.lista = res);
        break;
    
      case "2":
        this.store.select(getListaDevedoresFull).subscribe(res=>this.lista = res);
        break;    
      default:
        break;
    }
  }

  inativaDevedor(idDevedor:number){
    this.store.dispatch(inativaDevedor({idDevedor}))
    alert("INATIVADO - aviso ao desenvolvedor, criar dialog aqui")
  }

}
