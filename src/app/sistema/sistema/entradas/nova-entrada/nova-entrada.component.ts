import { mockDados } from 'src/app/MOCK/mock-dados';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseServiceService } from 'src/app/services/database-service.service';


@Component({
  selector: 'app-nova-entrada',
  templateUrl: './nova-entrada.component.html',
  styleUrls: ['./nova-entrada.component.css']
})
export class NovaEntradaComponent implements OnInit {

  colunasTabela = mockDados.getCartoes()
  isCartao = true;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: DatabaseServiceService
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      obs: [null, Validators.required],
      dataPrevistaRecebimento: [null, Validators.required],
      qtdeParcelas: [null, Validators.required],
      idConta: [null],
      valor: [null, Validators.required],
      recebido: [false, Validators.required]
    })
  }

  ngOnInit(): void {

  }

  salvar() {  
    if (this.form.valid) {
      this.db.novaEntradaRequest(this.form.value).subscribe(res=>{
        console.log(res);
      })
    }else{
      alert("Preencha todos os dados.")
    }
  }

  toogleComboCartoes() {
    console.log('foi')
    if (this.form.controls['meioPagto'].value != "cartao") {
      this.isCartao = true;
      this.form.controls['cartaoSelecionado'].reset();
    } else {
      this.isCartao = false
    }
  }

}
