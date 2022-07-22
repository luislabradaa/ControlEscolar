import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Response } from '../_model/response';
import { Login } from '../_model/login';
import { LoginRequest } from '../_model/loginRequest';
import { LoginFiltroRequest } from '../_model/loginFiltroRequest';

@Injectable({
 providedIn: 'root'
})
export class LoginService{

    constructor(private http:HttpClient){}
    //Muestra todos los registros
    consultarTodos():Observable<Response<Login>>{
      
        let url="http://localhost:8081/login/consultarTodos";
        return this.http.get<Response<Login>>(url,{headers: new HttpHeaders().append("Content-Type", "aplication/json")});
    
      }

    //Busca un solo registro
    buscarRegistro(loginFiltroRequest:LoginFiltroRequest):Observable<Response<Login>>{

      let url="http://localhost:8081/login/buscaLoginDinamica";
      return this.http.post<Response<Login>>(url, loginFiltroRequest, {headers: new HttpHeaders().append("Content-Type", "application/json")});

    }
    //Guarda un nuevo registro
    nuevoRegistro(login:LoginRequest):Observable<Response<Login>>{

        let url="http://localhost:8081/login/guardarLogin";
        return this.http.post<Response<Login>>(url,login );
    }

    //Elimina un registro existente
    eliminarRegistro(id: number):Observable<Response<number>>{
        let url="http://localhost:8081/login/borrarLoginPorID/"+ id;
        return this.http.delete<Response<number>>(url,{headers: new HttpHeaders().append("Content-Type", "aplication/json")});
      }

    //Modifica un registro existente
    actualizarRegistro(login:LoginRequest):Observable<Response<number>>{

      let url = "http://localhost:8081/login/actualizarLogin";
      return this.http.put<Response<number>>(url,login);
  
    }
}

