export interface GraficoMensal {
    ano:   number;
    meses: Mese[];
}

interface Mese {
    nomeMes:          string;
    nomeMesAbreviado: string;
    mesNumero:        number;
    valor:            number;
    nomeSaida: string;
}
