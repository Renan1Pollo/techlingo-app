import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { LoginRequest } from '../types/Login.type';
import { RegisterRequest } from '../types/Register.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post<any>(env.registerApiUrl, data);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post<LoginRequest>(env.loginApiUrl, data);
  }
}
