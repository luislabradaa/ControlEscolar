import { Page404Component } from "./../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistroComponent } from "./registro/registro.component";


const routes: Routes = [
   
    {
        path: "",
        redirectTo: "main",
        pathMatch: "full",
    },
    {
        path: "registro",
        component: RegistroComponent
    },
    { 
        path: "**", 
        component: Page404Component 
    },


];




@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

export class CredRoutingModule {}