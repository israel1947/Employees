import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../services/empleado.service';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  
 
  empleados:any[]=[]

  constructor(  private empleadosServices:EmpleadoService,
                private toastr: ToastrService,
                private authService:AuthService,
                private router:Router) {}
  

  ngOnInit():void {
    this.getEmpleados();
  }

  //imprimir empleados en la tabla 
  getEmpleados(){

    this.empleadosServices.getempleados()
    .subscribe(data => {

        this.empleados=[];

        data.forEach((element:any) => {
          /*console.log(element.payload.doc.id)
          console.log(element.payload.doc.data())*/
          this.empleados.push({
            id:element.payload.doc.id,//me regresa el id de todos los empleados 
            ...element.payload.doc.data()//me genera una copia de los valores de cada empleado(nombre, apellido,etc)
          })
        });
        console.log(this.empleados);
      })
  }

  //eliminar empleados de la tabla
  elimanrEmpleado(id:string){

    this.empleadosServices.eliminarEmpleado(id).then(()=>{
      console.log('empleado eliminado con exito')
      this.toastr.error('Empleado eliminado exitosamente', 'Empleado Eliminado!',{
        positionClass:'toast-bottom-right'
      });

    }).catch(error=>{
      console.log(error)
    })
  }

}
