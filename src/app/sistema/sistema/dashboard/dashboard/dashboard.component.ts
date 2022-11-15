import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { DatasService } from 'src/app/services/datas.service';
import { anos } from 'src/assets/menudata/anos';
import { Meses } from 'src/assets/menudata/meses';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  indicadores: any = null;
  mesSelecionado = -1;
  anoSelecionado = -1;
  mesSelecionadoString = "Loading";
  menu = Meses;
  anos = anos;

  constructor(
    private db: DatabaseServiceService,
    private dataService: DatasService
  ) { }

  ngOnInit(): void {
    // this.setaMesAtual()
  }

  ngAfterViewInit() {
  }

  recebeEventMes(e: any) {
    this.mesSelecionado = e.id + 1;
    this.mesSelecionadoString = e.mes;
    this.carregaDadosDashboard();
  }

  recebeEventAno(e: any) {
    this.anoSelecionado = e.ano;
    setTimeout(() => {
      this.carregaDadosDashboard();
    }, 100);
  }

  carregaDadosDashboard() {
    this.db.getDashboardValues(this.mesSelecionado, this.anoSelecionado).subscribe(res => {
      this.indicadores = res;
      // console.log(res);
    })

  }
}
