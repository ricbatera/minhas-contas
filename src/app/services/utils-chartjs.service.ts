import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsChartjs {
  constructor() {}

  private COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba',
  ];

  color(index:number) {
    return this.COLORS[index % this.COLORS.length];
  }
  public CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  }
  private NAMED_COLORS = [
    this.CHART_COLORS.red,
    this.CHART_COLORS.orange,
    this.CHART_COLORS.yellow,
    this.CHART_COLORS.green,
    this.CHART_COLORS.blue,
    this.CHART_COLORS.purple,
    this.CHART_COLORS.grey,
  ];
  private namedColor(index:number) {
    return this.NAMED_COLORS[index % this.NAMED_COLORS.length];
  }
}
