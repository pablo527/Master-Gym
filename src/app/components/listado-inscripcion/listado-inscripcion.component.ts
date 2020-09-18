import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-listado-inscripcion',
  templateUrl: './listado-inscripcion.component.html',
  styleUrls: ['./listado-inscripcion.component.css']
})
export class ListadoInscripcionComponent implements OnInit {
  inscripciones: any[] = []
  clienteObtenido : Cliente[] = []

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.inscripciones.length = 0;
    this.db.collection('inscripciones').get().subscribe((datos)=>{
      
      datos.forEach((inscripcion)=>{

        let inscripcionObtenida = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;

        this.db.doc(inscripcion.data().cliente.path).get().subscribe((cliente)=>{

          inscripcionObtenida.clienteObtenido = cliente.data();
          inscripcionObtenida.fecha = new Date( inscripcionObtenida.fecha.seconds * 1000)
          inscripcionObtenida.fechaFinal = new Date( inscripcionObtenida.fechaFinal.seconds * 1000)
          this.inscripciones.push(inscripcionObtenida)

        })




      })
    })
  }

}
