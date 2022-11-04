import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { catchError, Observable, retry, throwError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { categoria } from '../model/categoria';
import { EmpresasJavaGas } from '../model/empresas-javagas';
import { Obra } from '../model/Obra';

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

  listarCategorias(): Observable<categoria[]> {
    return this.httpClient.get<categoria[]>(this.API_URL + "cadastro/categoria/listar");
  }

  listarEmpresasJavaGas(): Observable<EmpresasJavaGas[]> {
    return this.httpClient.get<EmpresasJavaGas[]>(this.API_URL + "cadastro/empresas-java/listar");
  }

  listarTodasObrasAtivas(): Observable<Obra[]>{
    return this.httpClient.get<Obra[]>(this.API_URL + "cadastro/obra/listar");
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
