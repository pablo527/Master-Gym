import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  FormularioLogin : FormGroup
  datosCorrectos : boolean = true;
  textError : string =""

  constructor(private afAuth: AngularFireAuth, public fb:FormBuilder,
    public spinner: NgxSpinnerService) { 
    
  }


  ngOnInit(): void {
    this.FormularioLogin = this.fb.group({

      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]

    });
  }
  ingresar(){
    if(this.FormularioLogin.valid){
      this.spinner.show();
      this.datosCorrectos = true
      this.afAuth.auth.signInWithEmailAndPassword(this.FormularioLogin.value.email, this.FormularioLogin.value.password)
      .then((usuario) =>{
        this.spinner.hide();
        console.log(usuario)
      }).catch((err) =>{
        this.spinner.hide();
        this.datosCorrectos = false;
        this.textError = err.message
      })

    }
    else{
      this.datosCorrectos = false;
      this.textError = "Error, por favor sevisar los datos "
    }
   
  }

}
