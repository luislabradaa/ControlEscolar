import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Grupo } from '../_model/grupo';
import { Response } from '../_model/response';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http:HttpClient){}

  consultarTodos():Observable<Response<Grupo>>{
      
    let url="http://localhost:8081/grupo/consultarTodos";
    return this.http.get<Response<Grupo>>(url,{headers: new HttpHeaders().append("Content-Type", "aplication/json")});

  }
}