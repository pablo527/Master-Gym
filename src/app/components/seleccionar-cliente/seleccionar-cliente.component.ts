import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.css']
})
export class SeleccionarClienteComponent implements OnInit {

  constructor(private bd: AngularFirestore) { }
  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre:string;
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter
  @Output('canceloCliente') canceloCliente = new EventEmitter;
  ngOnInit(): void {

    this.bd.collection<any>('clientes').get().subscribe((datos)=>{
      this.clientes.length = 0;
      for(let item of datos.docs)
      {
       
        let cliente:any = item.data() 
        cliente.id = item.id;
        cliente.ref = item.ref
        cliente.visible = false
        this.clientes.push(cliente)
      } 
    })

  }
  buscar(nombre:string){
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLocaleLowerCase().includes(nombre.toLocaleLowerCase())){
        cliente.visible = true
      }
      else{
        cliente.visible = false
      }
    
    })
    

  }
  seleccionar(cliente:Cliente){
    this.nombre = cliente.nombre + " " + cliente.apellido;
    this.clientes.forEach((cliente)=>{
      cliente.visible = false
    })
    this.seleccionoCliente.emit(cliente);


  }
  cancelar(){

    this.nombre = undefined
    this.canceloCliente.emit()
  }

}

