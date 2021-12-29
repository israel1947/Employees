import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

 //mostrar info de usuario en el navbar en tiempo real una vez se haga el Sing In
  public user$:Observable<any>= this.authService.angularFireAuth.user;

  constructor(private authService:AuthService,
              private router:Router) {}



//boton de cerrar sesión de usuario
  async logout(){
      try {
       await this.authService.logout();
        this.router.navigate(['./auth/login']);
      } catch (error) {
        console.log('error al cerrar sesión');
      }
    }
 }
