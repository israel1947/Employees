

import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
    providedIn:'root'
})

export class ValidatorsService{

    public nombre:string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    constructor(){}
}