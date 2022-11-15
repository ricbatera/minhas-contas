import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatasService } from 'src/app/services/datas.service';
import { anos } from 'src/assets/menudata/anos';
import { Meses } from 'src/assets/menudata/meses';

@Component({
  selector: 'app-menu-meses-anos',
  templateUrl: './menu-meses-anos.component.html',
  styleUrls: ['./menu-meses-anos.component.css']
})
export class MenuMesesAnosComponent implements OnInit {

  mesSelecionado = -1;
  anoSelecionado = -1;
  mesSelecionadoString = "Loading"
  menu = Meses;
  anos = anos;
  teste: any;
  meses = document.getElementsByClassName("meses-do-ano");
  anosClass = document.getElementsByClassName("anos");

  @Output() enviaMes = new EventEmitter();
  @Output() enviaAno = new EventEmitter();

  constructor(
    private dataService: DatasService
  ) { }

  ngOnInit(): void {
    this.setaMesAno();
    this.teste = document.getElementsByClassName("meses-do-ano");
  }

  setaMesAno() {
    let anoAtual = this.dataService.getAnoAtual();
    let mesAtual = this.dataService.getMesAtual();
    this.mesSelecionado = mesAtual;

    setTimeout(() => {      
      this.escutaMenuMeses(mesAtual);
      this.anos.forEach(e => {
        if (e.ano == anoAtual) {
          this.anoSelecionado = e.ano
          this.escutaMenuAnos(e.id);          
        }
      });
    }, 300);
  }

  escutaMenuMeses(mes: number) {
      for (let i = 0; i < this.meses.length; i++) {
        this.meses[i].classList.remove("mes-selecionado-1");
      } 
      this.menu.forEach(e => { if (e.id == mes) {
        this.mesSelecionadoString = e.mes
        this.enviaMes.emit(e);
      } });
      this.meses[mes].classList.add("mes-selecionado-1");
      this.mesSelecionado = mes + 1;
  }

  escutaMenuAnos(ano: number) {      
      for (let i = 0; i < this.anosClass.length; i++) {
        this.anosClass[i].classList.remove("mes-selecionado-1");
      }
      this.anosClass[ano].classList.add("mes-selecionado-1");
      this.anoSelecionado = this.anos[ano].ano;
      this.enviaAno.emit(this.anos[ano]);
  }

}
