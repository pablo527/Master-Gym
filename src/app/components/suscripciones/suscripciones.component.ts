import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { viewClassName } from '@angular/compiler';
import { AngularFirestore } from 'angularfire2/firestore';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Subs } from 'src/app/models/subs';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {
  formularioSubs: FormGroup;
  subs: Subs[] = new Array<Subs>();
  id: string;
  esEditar :boolean = false;
  constructor(private fb: FormBuilder,private db: AngularFirestore,
    private msj: MensajesService) { }

  ngOnInit(): void {
    this.formularioSubs = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion : ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })


    this.db.collection<Subs>('subs').get().subscribe((datos)=>{
      for(let item of datos.docs){
        let sub = item.data() as Subs;
        sub.id = item.id;
        sub.ref = item.ref
        this.subs.push(sub)
      }
    })
    this.mostrarSubs();
  }

  agregar(){
    console.log(this.formularioSubs.value)
    this.db.collection('subs').add(this.formularioSubs.value).then((datos)=>{
      this.msj.mensajeSuccess('completado', 'Agregado sastifactoriamente')
    }).catch(()=>{
      this.msj.mensajeError('Error', 'ocurrio algun error')
    })
    this.mostrarSubs()
  }

  set(sub:Subs){
    this.esEditar = true;
    this.formularioSubs.setValue({
      nombre : sub.nombre,
      costo : sub.costo,
      duracion : sub.duracion,
      tipoDuracion: sub.tipoDuracion
    })
    this.id = sub.id

  }
  Editar(){0
    this.db.doc('subs/'+ this.id).update(this.formularioSubs.value).then((resultado)=>{
      this.msj.mensajeSuccess('Completado', 'Se ha editado correctamente')
    }).catch(()=>{
      this.msj.mensajeError('Error', 'ha ocurrido un error')
    })
    this.mostrarSubs();
   }
   mostrarSubs(){
     this.db.collection<Subs>('subs').get().subscribe((datos) =>{
       this.subs.length = 0;
       for(let i of datos.docs){
         let subscripcion = i.data() as Subs;
         subscripcion.id = i.id;
         subscripcion.ref = i.ref;
         this.subs.push(subscripcion)
       }
     })
   }

}
