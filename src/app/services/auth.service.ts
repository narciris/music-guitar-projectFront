import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment-dev';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Auth, TokenResponse } from '../../interfaces/Auth.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient,
              private router: Router

  ) { }

  loginUser (login:Auth) : Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.BASE_URL}/login`,login)
  }

  saveToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken():string | null{
    return localStorage.getItem('token') || '';

  }

  logout (): void{
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login'])
  }
  handleAuthError(): void {
    this.logout();
  }
}
