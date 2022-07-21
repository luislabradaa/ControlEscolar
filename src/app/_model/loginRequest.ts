import { Alumno } from "./alumno";
import { Profesor } from "./profesor";
import { Rol } from "./rol";

export class LoginRequest{

    id:number;
    correo:string;
    password:string;

    rol: number;
    profesor:number;
    alumno:number;
}
	