import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from 'src/app/_model/login';
import { LoginService } from 'src/app/_services/login.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from './dialog/dialog.component';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})
export class RegistroComponent implements OnInit {
  //Datos de la tabla
  dato!: MatTableDataSource<Login>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  isClicked: boolean;
  statusBarra: boolean;
  busquedaDinamica: FormGroup;

  columnas = [
    "correo",
    "password",
    "rol",
    "editar",
    "eliminar"
  ];

  public login: Login = new Login()
  loginFiltroRequest: any;
  constructor(private loginService: LoginService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.statusBarra = false;
    this.busquedaDinamica = this.formBuilder.group({
      correo: null,
      rol: null
    });
  }


  //Mostrar todos los datos en la tabla
  consultarTodos() {
    this.statusBarra = true;
    this.loginService.consultarTodos().subscribe(data => {
      this.dato = new MatTableDataSource(data.list);
      this.dato.paginator = this.paginator;
      this.dato.sort = this.sort;
      this.statusBarra = false;
    });

  }

  //Muestra un solo registro en la tabla
  buscarRegistro() {
    this.loginFiltroRequest = this.busquedaDinamica.value;
    if (this.loginFiltroRequest.correo != null || this.loginFiltroRequest.rol != null) {
      this.statusBarra = true;
      this.loginService.buscarRegistro(this.loginFiltroRequest).subscribe(data => {
        if (data.list.length != 0) {
          console.log(data);
          Swal.fire(
            ' Busqueda Exitosa ',
            ' ',
            'success'
          );
          this.dato = new MatTableDataSource(data.list);
          if (data.list) {
            this.dato.paginator = this.paginator;
            this.dato.sort = this.sort;
          }

        }
        this.statusBarra = false;
      });

    } else {

      Swal.fire(
        'Dato no encontrado',
        ' ',
        'error'
      );

    }

    this.busquedaDinamica.reset();

  }

  //Nuevo registro
  nuevoRegistro(login?: Login) {

    let nVacio = login != null ? login : new Login();
    console.log(nVacio);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "650px";
    dialogConfig.height = "500px";
    dialogConfig.data = nVacio;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: nVacio
    });

    dialogRef.afterClosed().subscribe(result => {
      this.consultarTodos();
    });
  }

  actualizarRegistro() {

  }
  //Eliminar un dato de la tabla
  eliminarRegistro(id: number) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar este dato?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.statusBarra = true;
        this.loginService.eliminarRegistro(id).subscribe((data) => {
          if (data.status == "OK") {
            swalWithBootstrapButtons.fire('Dato eliminado')
          } else {
            Swal.fire({
              icon: 'error',
              title: data.message,
              showConfirmButton: false,
              timer: 2500
            })
          }
          this.consultarTodos();
          this.statusBarra = false;

        })
      }
    })

  }

}
