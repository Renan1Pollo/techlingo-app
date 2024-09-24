import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Enrollment, EnrollmentResponseDTO } from '../types/Enrollment.type';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(private http: HttpClient) { }

  registerForCourse(data: Enrollment): Observable<any> {
    return this.http.post<any>(env.enrollmentApiUrl, data);
  }

  getAllEnrollments(): Observable<EnrollmentResponseDTO[]> {
    return this.http.get<EnrollmentResponseDTO[]>(env.enrollmentApiUrl);
  }

  getAllEnrollmentDetails(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${env.enrollmentApiUrl}/details`);
  }

  getEnrollmentsByUserId(userId: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${env.enrollmentApiUrl}/byUser/${userId}`);
  }

}
