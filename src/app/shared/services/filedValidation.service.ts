import {Injectable} from '@angular/core';

import { FormGroup } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})


export class FieldValidationService{

    public myForm!: FormGroup;

    isValidField(field: string): Boolean{
        return this.myForm.controls[field].errors!
                && this.myForm.controls[field].touched;
    }

}