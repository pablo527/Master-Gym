import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { initializeApp } from 'firebase';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {
  clientes : Array<any> = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
 /*    this.db.collection('clientes').valueChanges().subscribe((datos)=>
    this.clientes = datos
    ); */
    this.db.collection('clientes').get().subscribe((datos) =>{

      for(let i of datos.docs){

        let cliente = i.data();
        cliente.id = i.id;
        cliente.ref = i.ref;
        this.clientes.push(cliente)
      }

    })

  }

}
