import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  submitted=false;
  loading=false;//variable para mandar a llamar el spiner cuando se de click en agregar
  id!:string|null;

  createEmpleado:FormGroup= this.formBuilder.group({
    nombre:['',Validators.required],
    apellido:['',Validators.required],
    documento:['',Validators.required],
    salario:['',Validators.required],
  })

  constructor( private formBuilder:FormBuilder,
               private empleados:EmpleadoService,
               private router:Router,
               private toastr: ToastrService,
               private aRoute:ActivatedRoute) {

  this.id= this.aRoute.snapshot.paramMap.get('id');
  console.log(this.id)

}


  ngOnInit(): void {
    this.editar();
  }
  agregarEditarEmpleado(){
    
    if(this.createEmpleado.invalid){
      return
    }if(this.id===null){
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado(){
    this.submitted=true;//cambia el valor de el formulario cuando es llenado correctamente

    if(this.createEmpleado.invalid){
      return;
    }
    const empleado:any={
      nombre:this.createEmpleado.value.nombre,
      apellido:this.createEmpleado.value.apellido,
      documento:this.createEmpleado.value.documento,
      salario:this.createEmpleado.value.salario,
      fechaCreacion:new Date(),//guarda en firebase el valor de la fecha en que se creo el empleados
      fectaActualizacion:new Date(),//guarda en firebase el valor de la fecha en que se actualizo el empleados
    }
    this.loading=true;

    //console.log(empleado)
    this.empleados.agregarEmpleado(empleado).then(()=>{
      this.toastr.success('Empleado registrado exitosamente👍', 'Empleado Registrado', {
        positionClass:'toast-bottom-right'//esta clase permite dar la posicion en la que quiero que aparezca l mensaje de alerta
      })//mostra alerta flotante cuando el empleado se registro exitosamente

      this.loading=false;
      this.router.navigate(['/list-empleados'])//en caso de llenar bien los campos, y hacer click en  agregar sera redirigido a la lista de empleados

    }).catch(error=>{//en caso de que algo no vaya bien, es decir un errror lo imprimira en consola
      console.log(error)
      this.loading=true;
    })
  }

  editar(){
  
    if(this.id !== null){
      this.loading=true;

      this.empleados.getEmpleado(this.id)
         .subscribe(data =>{
          this.loading=false;
           console.log(data.payload.data())
           this.createEmpleado.setValue({
             nombre: data.payload.data()['nombre'],
             apellido: data.payload.data()['apellido'],
             documento: data.payload.data()['documento'],
             salario: data.payload.data()['salario'],
           })
         })
    }
  }

  editarEmpleado(id:string){
    this.loading=true;
    const empleado:any={
      nombre:this.createEmpleado.value.nombre,
      apellido:this.createEmpleado.value.apellido,
      documento:this.createEmpleado.value.documento,
      salario:this.createEmpleado.value.salario,
      fectaActualizacion:new Date(),//guarda en firebase el valor de la fecha en que se actualizo el empleados
    }

    this.empleados.actualizarEmpleado(id, empleado).then(()=>{

      this.loading=false;
      this.toastr.info('Empleado fue actualizado exitosamente', 'Empleado Atualizado', {
        positionClass:'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados'])
    })
  }
}
