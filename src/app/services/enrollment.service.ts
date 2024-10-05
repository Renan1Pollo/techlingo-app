import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Enrollment, EnrollmentResponseDTO } from '../types/Enrollment.type';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(private http: HttpClient) {}

  private createHttpParams(paramsObject: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    Object.keys(paramsObject).forEach((key) => {
      params = params.set(key, paramsObject[key].toString());
    });
    return params;
  }

  registerForCourse(data: Enrollment): Observable<EnrollmentResponseDTO> {
    return this.http.post<EnrollmentResponseDTO>(env.enrollmentApiUrl, data);
  }

  generateReport(unitId: number): Observable<Blob> {
    return this.http.get(`${env.enrollmentApiUrl}/generate-report`, { responseType: 'blob' });
  }

  getAllEnrollments(): Observable<EnrollmentResponseDTO[]> {
    return this.http.get<EnrollmentResponseDTO[]>(env.enrollmentApiUrl);
  }

  getAllEnrollmentDetails(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${env.enrollmentApiUrl}/details`);
  }

  getEnrollmentsByUserId(userId: number): Observable<EnrollmentResponseDTO[]> {
    return this.http.get<EnrollmentResponseDTO[]>(`${env.enrollmentApiUrl}/byUser/${userId}`);
  }

  getEnrollmentByUserAndCourse(userId: number, courseId: number): Observable<EnrollmentResponseDTO> {
    const params = this.createHttpParams({ userId, courseId });
    return this.http.get<EnrollmentResponseDTO>(`${env.enrollmentApiUrl}/byUserAndCourse`, { params });
  }

}
