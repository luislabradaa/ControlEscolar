import { Page404Component } from "./../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AlumnoComponent } from "./alumno/alumno.component";
import { CicloComponent } from "./ciclo/ciclo.component";
import { GrupoComponent } from "./grupo/grupo.component";
import { MateriaComponent } from "./materia/materia.component";
import { DialogComponent } from "./ciclo/dialog/dialog.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
  },
  {
    path: "alumno",
    component: AlumnoComponent,
  },
  {
    path: "ciclo",
    component: CicloComponent,
  },
  {
    path: "grupo",
    component: GrupoComponent,
  },
  {
    path: "materia",
    component: MateriaComponent,
  },
  { path: "**", component: Page404Component },
  { path: "nuevoCiclo", component:CicloComponent},
  { path: "administracion/ciclo/dialog/:id", component:DialogComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
