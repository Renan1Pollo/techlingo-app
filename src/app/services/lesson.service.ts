import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Lesson, LessonResponseDTO } from '../types/Lesson.type';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) { }

  createLesson(data: Lesson): Observable<any> {
    return this.http.post<any>(env.lessonApiUrl, data);
  }

  updateLesson(data: Lesson): Observable<any> {
    return this.http.put<any>(`${env.lessonApiUrl}/${data.id}`, data);
  }

  deleteLesson(id: number): Observable<any> {
    return this.http.delete<any>(`${env.lessonApiUrl}/${id}`);
  }

  getAllLessons(): Observable<LessonResponseDTO[]> {
    return this.http.get<LessonResponseDTO[]>(env.lessonApiUrl);
  }

  getAllLessonDetails(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${env.lessonApiUrl}/all`);
  }
}
