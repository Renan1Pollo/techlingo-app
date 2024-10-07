import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Question, QuestionResponseDTO } from '../types/Question.type';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  createQuestion(data: Question): Observable<Question> {
    return this.http.post<Question>(env.questionApiUrl, data);
  }

  updateQuestion(questionId: number, data: Question): Observable<any> {
    return this.http.put<any>(`${env.questionApiUrl}/${data.id}`, data);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete<any>(`${env.questionApiUrl}/${id}`);
  }

  findQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${env.questionApiUrl}/${id}`);
  }

  getAllQuestions(): Observable<QuestionResponseDTO[]> {
    return this.http.get<QuestionResponseDTO[]>(env.questionApiUrl);
  }

  getAllQuestionDetails(): Observable<Question[]> {
    return this.http.get<Question[]>(`${env.questionApiUrl}/all`);
  }

}
