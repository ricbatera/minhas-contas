import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Classificacao } from 'src/app/model/classificacao';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent implements OnInit {

  form: FormGroup;
  colunasTabela: string[] = ['ID', 'Item de Classificação', 'Tipo', 'Ação'];
  lista: Classificacao []= [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private db: DatabaseServiceService
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      tipo: ["Saída", Validators.required],     
      status: [true]
    });
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.db.getClassificacoesFull()
          .pipe(catchError(() => observableOf(null)))
      }
      ),
      map(data => {
        if (data === null) {
          return [];
        }
        return data;
      })
    ).subscribe(data => this.lista = data)
  }

  salvar(){
    if(this.form.valid){
      this.db.novaClassificacao(this.form.value).subscribe(res=>{
        console.log("Cadastro efetuado com suceso: " + res.nome);
        this.ngAfterViewInit();
      })
    }else{
      alert("Form inválido")
    }
  }

}
