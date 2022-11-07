import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasService {
  private d = new Date();
  private e = this.d.toDateString();
  private f = new Date(this.e);
  hoje = this.f.toISOString().substring(0,10);
  constructor() { }

  getMesAtual(): number{
    let today = new Date();
    return today.getMonth();
  }

  getData(mes:number = -1){
    const d = new Date();
    if(mes != -1 && mes < 12){
      d.setMonth(mes);
    }
    d.setDate(1);
    const e =  d.toDateString();
    const f = new Date(e);
    return f.toISOString().substring(0,10);

  }
}


