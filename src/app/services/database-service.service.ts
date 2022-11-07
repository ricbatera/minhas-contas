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

  novaCategoria(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL+"cadastro/categoria", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  novaObra(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL+"cadastro/obra", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  novaSaida(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL+"saida/nova-saida", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  novaEntrada(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL+"entrada/nova-entrada", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  pagarParcela(payload: any, id:number): Observable<any> {
    return this.httpClient.put<any>(this.API_URL+"saida/pagar-parcela/"+id, JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  receberEntrada(payload: any, id:number): Observable<any> {
    return this.httpClient.put<any>(this.API_URL+"entrada/receber/"+id, JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  atualizarSaida(payload: any): Observable<any> {
    return this.httpClient.put<any>(this.API_URL+"saida/atualizarSaida", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  listarSaidasMensal(dataPesquisa: string): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.API_URL}saida/listarMensal?dataBase=${dataPesquisa}`);
  }
  listarEntradasMensal(dataPesquisa: string): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.API_URL}entrada/listarMensal?dataBase=${dataPesquisa}`);
  }

  getSaidaById(id:number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}saida/${id}`);
  }

// ***********************************************************************************************

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

  getitensSaida(): Observable<ItemListaSaidaApi[]> {
    return this.httpClient.get<ItemListaSaidaApi[]>(`${this.API_URL}saidas/listar-mensal?mes=9`);
  }

  getFaturaApi(id: number | undefined): Observable<FaturaApi> {
    return this.httpClient.get<FaturaApi>(`${this.API_URL}saidas/busca-fatura?idFatura=${id}`);
  }

  pagarFatura(payload: PagarFaturaRequest): Observable<PagarFaturaRequest> {
    return this.httpClient.post<PagarFaturaRequest>(this.API_URL+"saidas/pagar-fatura", JSON.stringify(payload), this.httpOptions)
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
