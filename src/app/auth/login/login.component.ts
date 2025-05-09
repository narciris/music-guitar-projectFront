import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorService } from '../../services/custom-validator.service';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../../interfaces/Auth.interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorsMessage: string = '';


  loginForm!: FormGroup;

  public constructor (private fb: FormBuilder,
    private validator: CustomValidatorService,
    private authService : AuthService,
    private router : Router
  ){}


  isValidField(field: string): boolean | null{
    return this.validator.isValiedField(this.loginForm, field)
  }

  getFieldErrors(field:string): string[]{
    return this.validator.getFieldErrors(this.loginForm,field);

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.pattern(this.validator.emailPattern)]],
      password: ['',[Validators.required]]
    });
  }

  onLogin():void{
    const userLogin: Auth = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    
    this.authService.loginUser(userLogin).subscribe(
     {
      next: (response) => {
        if(response.token){
          this.authService.saveToken(response.token)
          console.log("token guardado exitosamente",response.token);
          this.router.navigate(['/users/task'])

        }else{
          this.errorsMessage = 'No se recibio el token valido';
        }
      },
      error: (error) => {
        console.error('error al iniciar sesion', error);
        this.errorsMessage = 'usuario o contraseña incorrectas.';
      }
     }
    );

  }

}
