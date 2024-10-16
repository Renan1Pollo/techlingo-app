import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Course, CourseResponseDTO } from '../types/Course.type';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) { }

  createCourse(data: Course): Observable<any> {
    return this.http.post<any>(env.courseApiUrl, data);
  }

  updateCourse(data: Course): Observable<any> {
    return this.http.put<any>(`${env.courseApiUrl}/${data.id}`, data);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${env.courseApiUrl}/${id}`);
  }

  getAllCourses(): Observable<CourseResponseDTO[]> {
    return this.http.get<CourseResponseDTO[]>(env.courseApiUrl);
  }

  getAllCoursesDetails(): Observable<Course[]> {
    return this.http.get<Course[]>(`${env.courseApiUrl}/all`);
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${env.courseApiUrl}/${courseId}`);
  }

  findCourseByName(name: string): Observable<Course> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Course>(`${env.courseApiUrl}/search`, { params });
  }
}
