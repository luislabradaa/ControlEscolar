import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import {Materia} from '../_model/materia';
import { Response } from '../_model/response';
import { MateriaFiltroRequest } from '../_model/materiaFiltroRequest';
import { MateriaRequest } from '../_model/materiaRequest';


@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http:HttpClient) {}

  consultarTodos():Observable<Response<Materia>>{
      
    let url="http://localhost:8081/materia/consultarTodos";
    return this.http.get<Response<Materia>>(url,{headers: new HttpHeaders().append("Content-Type", "aplication/json")});

  }

  buscarMateria(materiaFiltroRequest:MateriaFiltroRequest):Observable<Response<Materia>>{
    
    let url="http://localhost:8081/materia/busquedaMateria";
    return this.http.post<Response<Materia>>(url, materiaFiltroRequest);

  }

  nuevoMateria(materia:MateriaRequest):Observable<Response<Materia>>{

    let url="http://localhost:8081/materia/guardarMateria";
    return this.http.post<Response<Materia>>(url,materia);

  }

  actualizarMateria(materia:MateriaRequest):Observable<Response<number>>{

    let url = "http://localhost:8081/materia/actualizarMateria/";
    return this.http.put<Response<number>>(url,materia);

  }

  eliminarMateria(id: number):Observable<Response<number>>{

    let url="http://localhost:8081/materia/borrarMateriaPorID/"+ id;
    return this.http.delete<Response<number>>(url,{headers: new HttpHeaders().append("Content-Type", "aplication/json")});

  }

}