import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeSuccess(title:String, text:string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Cool'
    })

  }
  mensajeWarning(title:String, text:string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonText: 'Cool'
    })

  }
  mensajeError(title:String, text:string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Cool'
    })

  }
}
