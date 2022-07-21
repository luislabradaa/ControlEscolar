import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import {Ciclo} from '../_model/ciclo';
import { Response } from '../_model/response';
import { CicloFiltroRequest } from '../_model/cicloFiltroRequest';


@Injectable({
  providedIn: 'root'
})
export class CicloService {

  constructor(private http:HttpClient) {}

  consultarTodos():Observable<Response<Ciclo>>{
      
    let url="http://localhost:8081/ciclo/consultarTodos";

    return this.http.get<Response<Ciclo>>(url,{headers: new HttpHeaders().append("Content-Type", "aplication/json")});

  }

  buscarCiclo(cicloFiltroRequest:CicloFiltroRequest):Observable<Response<Ciclo>>{

    let url="http://localhost:8081/ciclo/busquedaCiclo";

    return this.http.post<Response<Ciclo>>(url, cicloFiltroRequest);

  }

  nuevoCiclo(ciclo:Ciclo):Observable<Response<Ciclo>>{

    let url="http://localhost:8081/ciclo/guardarCiclo";
    return this.http.post<Response<Ciclo>>(url,ciclo );
  }

  getCiclo(id):Observable<Ciclo>{

    let url="http://localhost:8081/ciclo/consultarCicloPorID";
    return this.http.get<Ciclo>(`${url}/${id}`,{headers: new HttpHeaders().append("Content-Type", "aplication/json")})

  }

  actualizarCiclo(ciclo:Ciclo):Observable<Response<number>>{

    let url = "http://localhost:8081/ciclo/actualizarCiclo/";
    return this.http.put<Response<number>>(url,ciclo);

  }

  eliminarCiclo(id: number):Observable<Response<number>>{
    let url="http://localhost:8081/ciclo/borrarCicloPorID/"+ id;
    return this.http.delete<Response<number>>(url,{headers: new HttpHeaders().append("Content-Type", "aplication/json")});
  }



}