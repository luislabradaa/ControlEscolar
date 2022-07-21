import { Component, Inject, OnInit } from '@angular/core';
import { Ciclo } from 'src/app/_model/ciclo';
import { CicloService } from 'src/app/_services/ciclo.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {

  ciclo:Ciclo = new Ciclo();

  constructor(private cicloService:CicloService,
    private router:Router,
    private activateRouted : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)private data:Ciclo,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  dato : any;
  isClicked: boolean;

  ngOnInit(): void {

     //Obtiene los datos para el formulario
   this.ciclo = this.data;
   //console.log(this.ciclo);
   this.ciclo.fechaInicio= new Date(this.data.fechaInicio);
   this.ciclo.fechaFin= new Date(this.data.fechaFin);

  }
 
  nuevoCiclo(){

    if(this.ciclo!=null && this.ciclo.id! >0){
      
      this.cicloService.actualizarCiclo(this.ciclo).subscribe(data =>{
      //  console.log(data);
        Swal.fire('Ciclo actualizado', 'Ciclo actualizado con éxito', 'success');
        this.router.navigate(['/administracion/ciclo']);

        this.dialogRef.close();
        return data;
    })
    }else{

      this.cicloService.nuevoCiclo(this.ciclo).subscribe(data =>{
        //console.log(data);
        Swal.fire('Ciclo creado', 'Ciclo creado con éxito' , 'success');
        this.router.navigate(['/administracion/ciclo']);

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