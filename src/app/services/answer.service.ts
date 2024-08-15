import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Answer, AnswerResponseDTO } from './../types/Answer.type';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor(private http: HttpClient) { }

  createAnswer(data: Answer): Observable<any> {
    return this.http.post<any>(env.answerApiUrl, data);
  }

  updateAnswer(data: Answer): Observable<any> {
    return this.http.put<any>(`${env.answerApiUrl}/${data.id}`, data);
  }

  deleteAnswer(id: number): Observable<any> {
    return this.http.delete<any>(`${env.answerApiUrl}/${id}`);
  }

  getAllAnswers(): Observable<AnswerResponseDTO[]> {
    return this.http.get<AnswerResponseDTO[]>(env.answerApiUrl);
  }

  getAllAnswerDetails(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${env.answerApiUrl}/all`);
  }

}
