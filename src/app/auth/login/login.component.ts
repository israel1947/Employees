import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ValidatorsService } from 'src/app/shared/validators/validators';
import { AuthService } from '../services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';


const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any> | undefined;
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
  public loading = false;

  miFormulario:FormGroup=this.formBuilder.group({
    email:['',[Validators.required, Validators.pattern(this.validatorsServices.emailPattern)]],
    password:['',[Validators.required, Validators.minLength(6)]]
  });

constructor( private authServices:AuthService,
             private formBuilder:FormBuilder,
             private router:Router,
             private validatorsServices:ValidatorsService,
             public dialog: MatDialog,
             private toastr: ToastrService,) { }

ngOnInit(): void {}
  
//ingreso de sesión  con correo electronico y contraseña
  async ingresar(){
    this.loading = true;
    const {email, password }=this.miFormulario.value;
    try {
      const user = await this.authServices.login(email,password);

        if(user){
         //redireccionar en caso de que el usuario exista
        this.router.navigate(['./list-empleados']);
        this.ingresoExitoso();

      } else{
          this.loading = false;
          const dialog = this.dialog.open(DialogComponent,{
            width:'250px'
          })
       }

      } catch (error) {
        console.log('error en inicio de sesión');
        this.loading = false;
    }
  }

  //ingreso con credenciales de Google
  async ingresarConGoogle(){

    const{ email,password }=this.miFormulario.value;

    try {
      const userGoogle =  await this.authServices.loginWithGoogle(email, password); 

        if(userGoogle){
         //si el sing in es correcto, entonces sera redirigido a la pagina de empleados
        this.router.navigate(['./list-empleados']);
        this. ingresoExitoso();
        console.log('Sesión iniciada con exitoso');

        }else{
          this.loading = false;
          console.log('error en la iniciada de Google');
        }
        

    } catch (error) {
       console.log('error en inicio de sesión con Google');
    }
  }

  //notificacion que indica que todo fue bien a la hora de iniciar sesión 
  ingresoExitoso(){
    this.loading = false;
        this.toastr.info('En hora buena ha ido todo bien', 'Woohoo! Ingreso Exitoso',{
          positionClass:'toast-top-right', timeOut:3000
        })
  }

}
