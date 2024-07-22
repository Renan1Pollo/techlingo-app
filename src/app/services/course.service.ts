import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Course } from '../types/Course.type';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  createCourse(data: Course): Observable<any> {
    return this.http.post<any>(env.courseApiUrl, data);
  }

  updateCourse(data: Course): Observable<any> {
    return this.http.put<any>(`${env.courseApiUrl}/${data.id}`, data);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${env.courseApiUrl}/${id}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(env.courseApiUrl);
  }
}
