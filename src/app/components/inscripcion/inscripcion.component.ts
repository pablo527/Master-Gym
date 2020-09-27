import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Cliente } from 'src/app/models/cliente';
import { Subs } from 'src/app/models/subs';
import { AngularFirestore } from 'angularfire2/firestore';
import { MensajesService } from 'src/app/services/mensajes.service';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  subSeleccionado: Subs = new Subs();
  subs: Subs[] = new Array<Subs>();
  idSub = 'null'
  constructor(private db:AngularFirestore, private msj: MensajesService) { }

  ngOnInit(): void {
    this.db.collection('subs').get().subscribe((datos)=>{
      for(let item of datos.docs)
      {
        let sub = item.data() as Subs;
        sub.id = item.id;
        sub.ref = item.ref;

        this.subs.push(sub)
      }
    })

  }
  asignarCliente(cliente:Cliente){
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente
  }
  eliminarCliente(){
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }
  guardar(){

    if(this.inscripcion.validar().esValido)
    {
      let inscripcionAgregar ={
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        sub: this.inscripcion.sub,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total
      }
    this.db.collection('inscripciones').add(inscripcionAgregar).then((resul)=>{
      this.inscripcion =new Inscripcion();
      this.subSeleccionado = new Subs();
      this.clienteSeleccionado = new Cliente();
      this.idSub = 'null'
      this.msj.mensajeSuccess('Completado', 'Se ha guradado con exito')
    })

    }
    else{
      this.msj.mensajeError('Error', this.inscripcion.validar().mensaje )
    }
  }
  selecioneSub(id:string){
    if( id != "null")
    {
      this.subSeleccionado = this.subs.find(x => x.id == id)
    this.inscripcion.sub = this.subSeleccionado.ref

    this.inscripcion.subTotal=  this.subSeleccionado.costo
    this.inscripcion.iva = this.inscripcion.subTotal * 0.19;
    this.inscripcion.total =  this.inscripcion.subTotal
    this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.subTotal * 0.19;
    this.inscripcion.fecha = new Date();

    if(this.subSeleccionado.tipoDuracion ==1)
    {
      let dias:number = this.subSeleccionado.duracion;
      let fechaFinal=
      new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal
    }
    if(this.subSeleccionado.tipoDuracion ==2)
    {
      let dias:number = this.subSeleccionado.duracion * 7;
      let fechaFinal=
      new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate()+ dias)
      this.inscripcion.fechaFinal = fechaFinal
    }
    if (this.subSeleccionado.tipoDuracion ==3)
    {
      let dias:number = this.subSeleccionado.duracion * 15;
      let fechaFinal=
      new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() +dias)
      this.inscripcion.fechaFinal = fechaFinal
    }
    if(this.subSeleccionado.tipoDuracion ==4)
    {let anio: number = this.inscripcion.fecha.getFullYear();
      let meses = this.subSeleccionado.duracion + this.inscripcion.fecha.getMonth()
      let dia: number = this.inscripcion.fecha.getDate();
      let fechaFinal =
      new Date (anio,meses,dia);
      this.inscripcion.fechaFinal = fechaFinal

    }
    if(this.subSeleccionado.tipoDuracion ==5)
    {let anio: number = this.inscripcion.fecha.getFullYear() + this.subSeleccionado.duracion;
      let meses =   this.inscripcion.fecha.getMonth()
      let dia: number = this.inscripcion.fecha.getDate();
      let fechaFinal =
      new Date (anio,meses,dia);
      this.inscripcion.fechaFinal = fechaFinal

    }

    }
    else{
      this.subSeleccionado = new Subs()
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.subTotal= 0
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0
      
      
    }
    

  }

}
