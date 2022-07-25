import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/_model/login';
import { LoginService } from 'src/app/_services/login.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginRequest } from 'src/app/_model/loginRequest';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {

  login: LoginRequest = new LoginRequest();


  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data: LoginRequest,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  dato: any;
  isClicked: boolean;

  ngOnInit(): void {
    this.login = this.data;
    this.login.correo = this.data.correo;
    this.login.password = this.data.password;

    console.log(this.login);
  }

  aceptar() {
    console.log(this.login);
    if (this.login != null && this.login.id! > 0) {
      console.log(this.login.correo);
      console.log(this.login.rol);
      this.loginService.actualizarRegistro(this.login).subscribe(data => {

        Swal.fire('Usuario actualizado', '', 'success');
        this.dialogRef.close(data);
      })

    } else {
      console.log('Crea Nuevo usuario');
      this.loginService.nuevoRegistro(this.login).subscribe(data => {

        Swal.fire('Usuario creado', '', 'success');
        this.dialogRef.close(true);
      })

    }

    this.isClicked = true;
  }



  cerrar() {
    this.dialogRef.close();
  }

}
