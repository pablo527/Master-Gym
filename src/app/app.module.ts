import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderComponent } from './components/header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MensajesService } from './services/mensajes.service';
import { SuscripcionesComponent } from './components/suscripciones/suscripciones.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { SeleccionarClienteComponent } from './components/seleccionar-cliente/seleccionar-cliente.component';
import { ListadoInscripcionComponent } from './components/listado-inscripcion/listado-inscripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    SuscripcionesComponent,
    InscripcionComponent,
    SeleccionarClienteComponent,
    ListadoInscripcionComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ProgressbarModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
