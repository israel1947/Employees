import { Injectable } from '@angular/core';
import firebase from '@firebase/app-compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;

  constructor( public angularFireAuth:AngularFireAuth) { }

  //registrar usuario
  async register(email:string, password:string){
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(email,password);
    } catch (error) {
      console.log('error en login',error);
      return ;
    }
    
  }
  
 //hacer login con correo y password registrado
  async login(email:string, password:string){
    
    //guardar la info del usuario en el localStorage
    this.angularFireAuth.authState
        .subscribe((Usuario)=>{
          if(Usuario){
            this.userData=Usuario;
            localStorage.setItem('Usuario', JSON.stringify(this.userData));
          }
        })

    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(email,password);
    } catch (error) {
      console.log('error en login',error);
      return ;
    }
  }

  //login con credenciales de Google
  async loginWithGoogle(email:string, password:string){

    try {
      return await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log('error al utilizar el login de Google',error);
      return;
    }
    
  }

  //recuperar el usuario que se encuentra logueado
  getUserLogged(){
    return this.angularFireAuth.authState.pipe(first()).toPromise()
  }

  //metodo que permite al usuario deslogarse
  async logout(){
    try {
      await this.angularFireAuth.signOut();
    } catch (error) {
      console.log('error al intentar deslogarse',error);
    }
  }

}
