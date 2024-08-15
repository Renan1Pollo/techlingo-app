import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = env.userApiUrl;

  constructor(private http: HttpClient) {}

  updatePassword(userId: number, newPassword: string): Observable<any> {
    const params = new HttpParams().set('password', newPassword);
    return this.http.put<any>(`${this.apiUrl}/${userId}/password`, { params });
  }

  decreaseLives(userId: number, livesToLose: number): Observable<any> {
    const params = new HttpParams().set('lifesToLose', livesToLose.toString());
    return this.http.put<any>(`${this.apiUrl}/${userId}/lifes/decrease`, { params });
  }

  increaseScore(userId: number, points: number): Observable<any> {
    const params = new HttpParams().set('points', points.toString());
    return this.http.put<any>(`${this.apiUrl}/${userId}/score/increase`, { params });
  }
}
