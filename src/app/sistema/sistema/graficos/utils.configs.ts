import { Chart, ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);
export const configGrafico: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  locale: 'pt-BR',
  plugins: {
    datalabels: {
      labels:{},
      anchor: 'end',
      align: 'top',
      formatter: (value) => {
        let str: number = Number(value);
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(str);
      },
    },
    title: {
      display: true,
      text: 'Evolução mensal dos gastos',
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || '';

          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => {
          let str: number = Number(value);
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(str);
        },
      },
    },
  },
};
