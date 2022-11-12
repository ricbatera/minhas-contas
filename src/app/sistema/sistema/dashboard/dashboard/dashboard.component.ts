import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { DatasService } from 'src/app/services/datas.service';
import { Meses } from 'src/assets/menudata/meses';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  indicadores: any = null;
  mesSelecionado = -1;
  mesSelecionadoString = "Loading"
  meses = document.getElementsByClassName("meses");
  menu = Meses;

  constructor(
    private db: DatabaseServiceService,
    private dataService: DatasService
  ) { }

  ngOnInit(): void {
   // this.setaMesAtual()
  }

  ngAfterViewInit() {
    this.setaMesAtual();
  }

  setaMesAtual() {
    setTimeout(() => {
      let mesAtual = this.dataService.getMesAtual();
      this.escutaMenuMeses(mesAtual);
    }, 300);
  }
  
  escutaMenuMeses(mes: number) {
    for (let i = 0; i < this.meses.length; i++) {
      this.meses[i].classList.remove("mes-selecionado");
    }
    this.menu.forEach(e => { if(e.id == mes) this.mesSelecionadoString = e.mes});
    this.meses[mes].classList.add("mes-selecionado");
    this. carregaDadosDashboard(mes + 1);
    this.mesSelecionado = mes + 1;
  }

  carregaDadosDashboard(mes: number) {
    this.db.getDashboardValues(mes).subscribe(res => {
      this.indicadores = res;
      console.log(res);
    })

  }
}
