import { Alumno } from "./alumno";
import { Profesor } from "./profesor";
import { Rol } from "./rol";

export class Login {

    id:number;
    correo:string;
    password:string;
    rol: Rol;
    profesor:Profesor;
    alumno:Alumno;

}
	