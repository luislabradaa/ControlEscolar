import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/_services/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.sass']
})
export class GrupoComponent implements OnInit {
  
  constructor(private grupoService:GrupoService) { }

  ngOnInit(): void {

    console.info("Entro al componente Grupo");
    this.consultarTodos();
  }

  consultarTodos(){

    this.grupoService.consultarTodos().subscribe({next:function(data){

      console.info(data);
      alert(data.list[0].id);
      
    }})

  }





}
