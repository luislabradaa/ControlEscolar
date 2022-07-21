import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ciclo } from 'src/app/_model/ciclo';
import { Grupo } from 'src/app/_model/grupo';
import { CicloService } from 'src/app/_services/ciclo.service';
import { DialogComponent } from './dialog/dialog.component';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.sass']
})
export class CicloComponent implements OnInit {

  public grupo:Grupo;
  dato : any;
  fechaInicio = [];
  
  //Paginación variables
  pageSize = 5;
  i:number = 1;
  desde: number = 0;
  hasta: number = 5;

  busquedaDinamica:FormGroup;


  public ciclo: Ciclo = new Ciclo()
  cicloFiltroRequest: any;
  
  constructor(private cicloService:CicloService, private router:Router,private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    //console.info("Entro al componente ciclo");
    this.consultarTodos();
    this.busquedaDinamica =this.formBuilder.group({
      clave:null,
      nombre:null,
      year:null

  });
    
  }
  //Muestreo de datos en la tabla 
  consultarTodos(){

    this.cicloService.consultarTodos().subscribe(data =>{ // => cuando se utiliza este simbolo es una función anonima
      //console.info(data);
      //console.log(data);
      this.dato = data.list;
      
      data.list.forEach((fechaCombo) => {

        let fechaInicio = new Date(fechaCombo.fechaInicio).toLocaleDateString('ko-KR');
        fechaInicio = fechaInicio.substring(0,4);
        this.fechaInicio.push(fechaInicio);

      });

      let fechas = this.fechaInicio.filter((item,index)=>{
        return this.fechaInicio.indexOf(item) === index;
      });
      fechas.sort();
      if(fechas[0]==1969){
        fechas.shift();
      }
      this.fechaInicio = fechas;

    })

  } 

  buscarCiclo(){

    this.cicloFiltroRequest=this.busquedaDinamica.value;

   if(this.cicloFiltroRequest !=null ){
        this.cicloService.buscarCiclo(this.cicloFiltroRequest).subscribe(data=>{

          if(data.list.length != 0){

            console.log(data);
            Swal.fire(
              ' Busqueda Exitosa ',
              ' ',
              'success'
            )
            this.dato= data.list;
      
          }else{
            Swal.fire(
              ' Dato no encontrado ',
              ' ',
              'question'
            )
          }
        })


    }
    this.busquedaDinamica.reset();
    
  }
  //Nuevo Ciclo
  guardar(ciclo? :Ciclo){
    let cvacio = ciclo!=null ? ciclo : new Ciclo();
    //console.log(cvacio);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "650px";
    dialogConfig.height="500px";
    dialogConfig.data= cvacio;
    const dialogRef =this.dialog.open(DialogComponent ,{
      data: cvacio
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.consultarTodos();
    })

  
  }

  //Eliminar Ciclo
  eliminarCiclo(id:number){

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

        this.cicloService.eliminarCiclo(id).subscribe(data =>{

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


