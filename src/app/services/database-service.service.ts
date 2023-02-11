import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { catchError, Observable, retry, throwError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CartaoCredito } from '../model/cartao-credito';
import { ContaBancaria } from '../model/conta-bancaria';
import { contaBancaria } from '../model/model';
import { NovaSaidaRequest } from '../model/nova-saida-request';
import { ItemListaSaida } from '../model/item-lista-saidas';
import { ItemListaSaidaApi } from '../model/item-lista-saida-api';
import { FaturaApi } from '../model/fatura-api';
import { PagarFaturaRequest } from '../model/pagar-fatura-request';
import { NovaEntradaRequest } from '../model/nova-entrada-request';
import { ItemEntradaApi } from '../model/item-entrada-api';
import { ReceberEntradaRequest } from '../model/receber-entrada-request';
import { PagarParcelaRequest } from '../model/pagar-parcela-request';
import { Devedor } from '../model/devedor';
import { Classificacao } from '../model/classificacao';
import { EditaConta } from '../model/edita-conta';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  API_URL = environment.URLSERVIDOR;

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getCartoesFull(): Observable<CartaoCredito[]> {
    return this.httpClient.get<CartaoCredito[]>(`${this.API_URL}cadastros/cartao-credito/listar-cartoes`);
  }

  getCartoesAtivos(): Observable<CartaoCredito[]> {
    return this.httpClient.get<CartaoCredito[]>(`${this.API_URL}cadastros/cartao-credito/listar-cartoes-ativos`);
  }

  novoCartao(payload: CartaoCredito): Observable<CartaoCredito> {
    return this.httpClient.post<CartaoCredito>(this.API_URL+"cadastros/cartao-credito/novoCartaoCredito", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  getContasFull(): Observable<ContaBancaria[]> {
    return this.httpClient.get<ContaBancaria[]>(`${this.API_URL}cadastros/conta-bancaria/listar-contas-bancarias`);
  }

  getContasAtivas(): Observable<ContaBancaria[]> {
    return this.httpClient.get<ContaBancaria[]>(`${this.API_URL}cadastros/conta-bancaria/listar-contas-bancarias-ativas`);
  }

  novaConta(payload: CartaoCredito): Observable<ContaBancaria> {
    return this.httpClient.post<ContaBancaria>(this.API_URL+"cadastros/conta-bancaria/nova-conta-bancaria", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  novaSaidaRequest(payload: NovaSaidaRequest): Observable<NovaSaidaRequest> {
    return this.httpClient.post<NovaSaidaRequest>(this.API_URL+"saidas/nova-saida", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  novaEntradaRequest(payload: NovaEntradaRequest): Observable<NovaEntradaRequest> {
    return this.httpClient.post<NovaEntradaRequest>(this.API_URL+"entradas/nova-entrada", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  getitensSaida(mes: number, ano: number): Observable<ItemListaSaidaApi[]> {
    return this.httpClient.get<ItemListaSaidaApi[]>(`${this.API_URL}saidas/listar-mensal?mes=${mes}&ano=${ano}`);
  }

  getDashboardValues(mes: number, ano: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}dashboard/indicadores?mes=${mes}&ano=${ano}`);
  }


  getitensEntrada(mes: number, ano: number): Observable<ItemEntradaApi[]> {
    return this.httpClient.get<ItemEntradaApi[]>(`${this.API_URL}entradas/listar-mensal?mes=${mes}&ano=${ano}`);
  }

  getFaturaApi(id: number | undefined): Observable<FaturaApi> {
    return this.httpClient.get<FaturaApi>(`${this.API_URL}saidas/busca-fatura?idFatura=${id}`);
  }

  getSaidaById(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}saidas/busca-saida-id?idSaida=${id}`);
  }

  pagarFatura(payload: PagarFaturaRequest): Observable<PagarFaturaRequest> {
    return this.httpClient.post<PagarFaturaRequest>(this.API_URL+"saidas/pagar-fatura", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  pagarParcela(payload: PagarParcelaRequest): Observable<PagarParcelaRequest> {
    return this.httpClient.post<PagarParcelaRequest>(this.API_URL+"saidas/pagar-parcela", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  receberEntreda(payload: ReceberEntradaRequest): Observable<ReceberEntradaRequest> {
    return this.httpClient.post<ReceberEntradaRequest>(this.API_URL+"entradas/receber-parcela", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  getDevedoresFull(): Observable<Devedor[]> {
    return this.httpClient.get<Devedor[]>(`${this.API_URL}cadastros/devedor/listar-devedores`);
  }

  getClassificacoesFull(): Observable<Classificacao[]> {
    return this.httpClient.get<Classificacao[]>(`${this.API_URL}cadastros/classificacao/listar-classificacoes`);
  }

  novaClassificacao(payload: Classificacao): Observable<Classificacao> {
    return this.httpClient.post<Classificacao>(this.API_URL+"cadastros/classificacao/nova-classificacao", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  novoDevedor(payload: Devedor): Observable<Devedor> {
    return this.httpClient.post<Devedor>(this.API_URL+"cadastros/devedor/novo-devedor", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  editaConta(payload: EditaConta): Observable<EditaConta>{
    return this.httpClient.put<EditaConta>(this.API_URL+'saidas/edita-saida', JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
