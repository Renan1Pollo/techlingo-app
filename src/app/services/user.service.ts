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

  private createHttpParams(paramsObject: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    Object.keys(paramsObject).forEach((key) => {
      params = params.set(key, paramsObject[key].toString());
    });
    return params;
  }

  updatePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const params = this.createHttpParams({ oldPassword, newPassword });
    return this.http.put<any>(`${this.apiUrl}/${userId}/password`, null, { params });
  }

  updateLives(userId: number, liveCount: number): Observable<any> {
    const params = this.createHttpParams({ liveCount });
    return this.http.put<any>(`${this.apiUrl}/${userId}/lives`, null, {
      params,
    });
  }

  increaseScore(userId: number, points: number): Observable<any> {
    const params = this.createHttpParams({ points });
    return this.http.put<any>(`${this.apiUrl}/${userId}/score`, null, {
      params,
    });
  }
}
