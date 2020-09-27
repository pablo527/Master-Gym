import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateEventsArray, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';



@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioClientes: FormGroup;
  porcentajeSubida: number = 0;
  imagenUrl: string = ''
  id: string;
  esEditar: boolean = false;
  constructor(private fb:FormBuilder, private storage: AngularFireStorage,
    private db: AngularFirestore, public activeRoute : ActivatedRoute,
    private msj : MensajesService) { }

  ngOnInit(): void {
    
    this.formularioClientes = this.fb.group({
      nombre: ['', Validators.required],
      apellido : ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      imgUrl: ['' , Validators.required]

    });

    // obtener id de la ruta, para editar
    this.id = this.activeRoute.snapshot.params.clienteID ;

    if(this.id != undefined)
    {
      
      this.esEditar = true
      
      this.db.doc<any>('clientes' + '/' + this.id).valueChanges().subscribe((cliente)=>{
    
        this.formularioClientes.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          fechaNacimiento: new Date (cliente.fechaNacimiento.seconds *1000).toISOString().substr(0,10),
          telefono : cliente.telefono,
          cedula: cliente.cedula,
          imgUrl: ['']
        })
        console.log(new Date (cliente.fechaNacimiento.seconds *1000).toISOString ().substr(0,10))
        this.imagenUrl = cliente.imgUrl;
      }) 
    }
    
    
  }
  agregar(){
    console.log(this.formularioClientes.value)
    //para guardar url
    this.formularioClientes.value.imgUrl = this.imagenUrl;
    // para cambiar fecha de strin a date
    this.formularioClientes.value.fechaNacimiento = new Date (this.formularioClientes.value.fechaNacimiento)
    this.db.collection('clientes').add(this.formularioClientes.value).then((termino)=>{
      this.msj.mensajeSuccess('Completado', 'usuario agregado con exito')
      this.formularioClientes.reset()
    })

  }
  editar(){
    this.formularioClientes.value.imgUrl = this.imagenUrl;
    this.formularioClientes.value.fechaNacimiento = new Date (this.formularioClientes.value.fechaNacimiento)

    this.db.doc('clientes/' + this.id).update(this.formularioClientes.value).then((resultado)=>{
      this.msj.mensajeSuccess('Completado', 'usuario editado correctamente')
    }).catch(()=>{
      this.msj.mensajeError('Error', 'ha ocurrido un error')
    })

  }
  /* Para subir la imagen: 
  1.) ver documentacion de angularfire2, seccion de file,
  2.) importar e inyectar donde harenos uso del servicio
  3.) al input del fil agregarma el evento (change) con un event
  4.) Seguimos los pasos de la documentacion */
  subirImagen(event){
    if( event.target.files.length > 0){
      //creamos variable nombre, donde sera igual al momento excato en subirse la imagen
    // es6a para que cada imagen se llame diferente y no se sobre escriban
    let nombre = new Date().getTime().toString()
    // 
    let file = event.target.files[0]
    //la extension, con estas funciones para corta el nombre de imagen hasta el punto
    let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))

    let ruta = 'clientes/' + nombre + extension;
    const ref = this.storage.ref(ruta);
    const task = ref.put(file)

    task.then((objeto)=>{
      console.log('imagen subida')

      // esto para hcer funcionar el de carga
      ref.getDownloadURL().subscribe((url)=>{
        //par poder guradarla en bd
        this.imagenUrl = url
      })
    })
    task.percentageChanges().subscribe((porcentaje)=>{
      this.porcentajeSubida = parseInt( porcentaje.toString());
    })

  }


    }
    


}
