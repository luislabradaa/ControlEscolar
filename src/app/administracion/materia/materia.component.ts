import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/_services/materia.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MateriaDialogComponent } from './materia-dialog/materia-dialog.component';
import { MateriaRequest } from 'src/app/_model/materiaRequest';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.sass']
})
export class MateriaComponent implements OnInit {

  dato:any;

  //Paginación variables
  pageSize = 5;
  i:number = 1;
  desde: number = 0;
  hasta: number = 5;

  busquedaDinamica:FormGroup;

  constructor(private materiaService:MateriaService, private dialog: MatDialog) { }

  ngOnInit(): void {

    console.info("Entro al componente Materia");
    this.consultarTodos();
  }

  consultarTodos(){

    this.materiaService.consultarTodos().subscribe(data=>{
      this.dato = data.list;
      console.info(data);
      
    })
  }

  //Nueva materia
  Nuevo(materia? :MateriaRequest,ciclo?:number){

    let mvacio = materia!=null ? materia : new MateriaRequest();
    mvacio.ciclo = ciclo;
    //console.log(cvacio);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "650px";
    dialogConfig.height="500px";
    dialogConfig.data= mvacio;
    const dialogRef =this.dialog.open(MateriaDialogComponent,{
      data: mvacio
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.consultarTodos();
    })

  
  }

  buscarMateria(){


  }

  

  //Eliminar Materia
  eliminarMateria(id:number){

    //Ventana de confirmación

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

        this.materiaService.eliminarMateria(id).subscribe(data =>{

          swalWithBootstrapButtons.fire(
            'Dato eliminado con éxito!'
          )
          this.consultarTodos();
    
        })
      } 
    })
  
    
  }

  //Paginación
  cambiarPagina(e:PageEvent){
    //console.log(e);

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
}
