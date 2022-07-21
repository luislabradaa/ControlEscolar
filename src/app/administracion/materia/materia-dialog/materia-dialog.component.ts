import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Materia } from 'src/app/_model/materia';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MateriaService } from 'src/app/_services/materia.service';
import { CicloService } from 'src/app/_services/ciclo.service';
import { MateriaRequest } from 'src/app/_model/materiaRequest';


@Component({
  selector: 'app-materia-dialog',
  templateUrl: './materia-dialog.component.html',
  styleUrls: ['./materia-dialog.component.sass']
})
export class MateriaDialogComponent implements OnInit {

  materia:MateriaRequest;

  ciclo = [];

  constructor(
    private materiaService:MateriaService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA)private data:MateriaRequest,
    private dialogRef:MatDialogRef<MateriaDialogComponent>,
    private cicloService:CicloService) { }

  dato : any;
  isClicked: boolean;

  ngOnInit(): void {
    this.materia = new MateriaRequest();
    this.materia.nombre = this.data.nombre;
    this.materia.estatus = this.data.estatus;
    this.materia.clave = this.data.clave;
    this.materia.ciclo = this.data.ciclo;
    this.materia.id = this.data.id;
    this.consultarCiclo();
    console.log(this.materia);
  }

  consultarCiclo(){
    
    this.cicloService.consultarTodos().subscribe(element => {

      this.ciclo = element.list;
      this.ciclo.sort();
    });
  }

  nuevoMateria(){
    console.log(this.materia)
    if(this.materia!=null && this.materia.id! >0){
      
      this.materiaService.actualizarMateria(this.materia).subscribe(data =>{
      //  console.log(data);
        Swal.fire('Materia actualizada', 'Materia actualizada con éxito', 'success');
        this.router.navigate(['/administracion/materia']);

        this.dialogRef.close();
        return data;
    })
    }else{

      this.materiaService.nuevoMateria(this.materia).subscribe(data =>{
        //console.log(data);
        Swal.fire('Materia creada', 'Materia creada con éxito' , 'success');
        this.router.navigate(['/administracion/materia']);

        this.dialogRef.close();
        return data;
      })
    
   
  }
 this.isClicked = true;
}

  cerrar(){
    this.dialogRef.close();
  }
}
