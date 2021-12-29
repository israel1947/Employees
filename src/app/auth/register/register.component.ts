import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../shared/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  miFormulario:FormGroup=this.formBuilder.group({
    
    nombre:['',[Validators.required, Validators.pattern(this.validatorsServices.nombre)]],
    email:['',[Validators.required, Validators.pattern(this.validatorsServices.emailPattern)]],
    password:['',[Validators.required, Validators.minLength(6)]]
  });

  constructor( private authsService:AuthService,
               private formBuilder:FormBuilder,
               private validatorsServices:ValidatorsService) { }

  ngOnInit(): void {
  }

  campoInvalido(campo:string){

    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched;
  }

  //mossrar errores a la hora de llenar el imput de nombre
  get nombreErrorMesg():string{
    const errors= this.miFormulario.get('nombre')?.errors
    if(errors?.required){
      return 'Por favor ingrese su nombre!';
    }else if(errors?.pattern){
      return 'ingrese formato nombre y apellido'
    }
    return ''; 
  }

 


  registrar(){

    const {email, password}=this.miFormulario.value
    this.authsService.register(email,password).then(resp=>{
      console.log('Registro exitoso... ',resp);
    })
    //console.log('form =>', this.miFormulario.value);
  }

}
