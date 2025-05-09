import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  isValiedField(form:FormGroup, field: string): boolean | null{

    return form.controls[field].errors
     && form.controls[field].touched
  }

  getFieldErrors(form: FormGroup, field: string): string[] {
    const control = form.get(field);
    const messages: string[] = [];
  
    if (!control || !control.errors) return messages;
  
    const errors = control.errors;
  
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          messages.push('Este campo es requerido');
          break;
        case 'pattern':
          messages.push('Debe ser un correo válido');
          break;
        case 'minlength':
          messages.push(`Mínimo ${errors['minlength'].requiredLength} caracteres`);
          break;
        case 'maxlength':
          messages.push(`Máximo ${errors['maxlength'].requiredLength} caracteres`);
          break;
      }
    }
  
    return messages;
  }
  

}
