import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import {Alumno} from '../_model/alumno';
import { Response } from '../_model/response';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient) {}

  consultarTodos():Observable<Response<Alumno>>{
      
    let url="http://localhost:8081/alumno/consultarTodos";

    return this.http.get<Response<Alumno>>(url,{headers: new HttpHeaders().append("Content-Type", "aplication/json")});

  }

}
