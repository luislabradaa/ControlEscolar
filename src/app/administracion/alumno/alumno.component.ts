import { Component, OnInit } from '@angular/core';

import { AlumnoService } from 'src/app/_services/alumno.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.sass']
})
export class AlumnoComponent implements OnInit {

  constructor(private alumnoService:AlumnoService) { }

  ngOnInit(): void {

    console.info("Entro al componente Alumno");
    this.consultarTodos();
  }

  consultarTodos(){


    this.alumnoService.consultarTodos().subscribe({next:function(data){

      console.info(data);
      alert(data.list[0].nombre);
    }})


  }

}
