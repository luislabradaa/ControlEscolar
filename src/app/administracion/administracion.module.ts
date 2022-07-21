import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { SharedModule } from "./../shared/shared.module";

import { AlumnoComponent } from "./alumno/alumno.component";
import { CicloComponent } from "./ciclo/ciclo.component";
import { GrupoComponent } from "./grupo/grupo.component";
import { MateriaComponent } from "./materia/materia.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AdministracionRoutingModule } from "./administracion.routing.module";
import { DialogComponent } from "./ciclo/dialog/dialog.component";
import { MateriaDialogComponent } from "./materia/materia-dialog/materia-dialog.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [ AlumnoComponent, CicloComponent,GrupoComponent, MateriaComponent, DialogComponent,MateriaDialogComponent],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    SharedModule,
    AdministracionRoutingModule,
    MatDialogModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule
  ],
})
export class AdministracionModule {}