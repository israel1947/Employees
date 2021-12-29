import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore:AngularFirestore) { }

  agregarEmpleado(empleado:any):Promise<any>{

    return this.firestore.collection('empleados').add(empleado); //enviar los datos a firebase
  }

  getempleados():Observable<any>{
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }
  
  eliminarEmpleado(id:string):Promise<any>{

    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id:string):Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id:string,data:any):Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(data);
  }


}


//.snapshotChanges() lo que hace es crear un metodo de estring sincronizados. Es decir, que cada vez que se inserte un datos los cambios se van ver en tiempo real

//ref => ref.orderBy('fechaCreacion','asc') lo qe hace es que me guarda los registro segun los parametros que yo le diga, en este caso dige quiero que me los guarde por la fecha de creacion, y como segundo paramtro le dije que me lo guarde en forma ascendente