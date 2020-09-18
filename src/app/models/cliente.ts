import { DocumentReference } from 'angularfire2/firestore';

export class Cliente{
    id: string;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: Date;
    imgUrl: string;
    telefono: number;
    correo: string;
    ref: DocumentReference;
    visible: boolean = false;
    constructor(){
        
    }
    

}