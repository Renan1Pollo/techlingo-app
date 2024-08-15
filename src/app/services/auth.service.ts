import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { LoginRequest } from '../types/Login.type';
import { RegisterRequest } from '../types/Register.type';
import { User } from '../types/User.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>(env.registerApiUrl, data);
  }

  login(data: LoginRequest): Observable<User> {
    return this.http.post<User>(env.loginApiUrl, data);
  }
}
