import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Answer, AnswerResponseDTO } from './../types/Answer.type';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor(private http: HttpClient) { }

  private createHttpParams(paramsObject: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    Object.keys(paramsObject).forEach((key) => {
      params = params.set(key, paramsObject[key].toString());
    });
    return params;
  }

  createAnswer(data: Answer): Observable<any> {
    return this.http.post<any>(env.answerApiUrl, data);
  }

  updateAnswer(id: number, data: Answer): Observable<any> {
    return this.http.put<any>(`${env.answerApiUrl}/${id}`, data);
  }

  deleteAnswer(id: number): Observable<any> {
    return this.http.delete<any>(`${env.answerApiUrl}/${id}`);
  }

  findAnswerByQuestionId(questionId: number): Observable<Answer[]> {
    const params = this.createHttpParams({ questionId });
    return this.http.get<Answer[]>(`${env.answerApiUrl}/questions`, { params });
  }

  getAllAnswers(): Observable<AnswerResponseDTO[]> {
    return this.http.get<AnswerResponseDTO[]>(env.answerApiUrl);
  }

  getAllAnswerDetails(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${env.answerApiUrl}/all`);
  }

}
