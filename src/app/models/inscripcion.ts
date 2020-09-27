import { DocumentReference } from 'angularfire2/firestore';


export class Inscripcion{
    fecha: Date;
    fechaFinal: Date;
    cliente: DocumentReference;
    sub: DocumentReference;
    subTotal: number;
    iva: number;
    total: number;
    constructor()
    {
        this.fecha = null
        this.fechaFinal = null
        this.cliente = this.cliente
        this.sub = this.sub
        this.subTotal = this.subTotal
        this.iva = this.iva
        this.total = this.total
    }
    validar(): any{
        let respuesta = {
            esValido:false,
            mensaje: ''
        }
        if(this.cliente == null || this.cliente == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = "erro por favor seleccione un cliente"
            return respuesta
        }
        if(this.sub == null || this.sub == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = "error por favor seleccione una subscripcion"
            return respuesta
        }
        respuesta.esValido = true
        return respuesta
    }

}