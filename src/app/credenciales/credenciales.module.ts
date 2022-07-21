import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { SharedModule } from "./../shared/shared.module";
import { RegistroComponent } from "./registro/registro.component";
import { CredRoutingModule } from "./credenciales.routing.module";
import { DialogComponent } from './registro/dialog/dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";

@NgModule({
    declarations: [RegistroComponent, DialogComponent],
    imports: [
      CommonModule,
      PerfectScrollbarModule,
      SharedModule,
      CredRoutingModule,
      MatDialogModule,
      MatSelectModule,
      MatTableModule,
      MatPaginatorModule,
     
    ],
  })
export class CredencialesModule {}

