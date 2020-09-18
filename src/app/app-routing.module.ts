import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { SuscripcionesComponent } from './components/suscripciones/suscripciones.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { ListadoInscripcionComponent } from './components/listado-inscripcion/listado-inscripcion.component';


const routes: Routes = [
  {
    path: "", redirectTo : 'inscripcion', pathMatch: "full"
  },
  {
    path: "inscripcion", component: InscripcionComponent
  },
  {
    path:"clientes", component: ListadoClientesComponent
  },
  {
    path: "agregar-clientes", component: AgregarClienteComponent 
  },
  {
  path: "agregar-clientes/:clienteID", component: AgregarClienteComponent
  },
  {
    path: "suscripciones", component : SuscripcionesComponent
  },
  {
    path: "listado-inscripciones", component : ListadoInscripcionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
