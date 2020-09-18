import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'masterGym';
  usuario:User;
  cargando:boolean = true;

  constructor(private afAuth: AngularFireAuth,
    ) {
    this.afAuth.user.subscribe((usurio)=>{

        this.usuario = usurio;
        this.cargando = false;
    })
  }
}
