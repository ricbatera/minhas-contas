export interface GrafParceladas{
    ano: number;
    nomesQtdes: nomesQtdes[]
}

interface nomesQtdes{
    nomeParcela: string;
    qtdeParcelas: number;
    valor:number;
    nomeMes: string;
    nomeMesAbreviado: string;
    mesNumero: string
}