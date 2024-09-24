import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content, ContentResponseDTO } from '../types/Content.type';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) { }

  createContent(data: Content): Observable<any> {
    return this.http.post<any>(env.contentApiUrl, data);
  }

  updateContent(data: Content): Observable<any> {
    return this.http.put<any>(`${env.contentApiUrl}/${data.id}`, data);
  }

  deleteContent(id: number): Observable<any> {
    return this.http.delete<any>(`${env.contentApiUrl}/${id}`);
  }

  findContentById(id: number): Observable<Content> {
    return this.http.get<any>(`${env.contentApiUrl}/${id}`);
  }

  getAllContents(): Observable<ContentResponseDTO[]> {
    return this.http.get<ContentResponseDTO[]>(env.contentApiUrl);
  }

  getAllContentDetails(): Observable<Content[]> {
    return this.http.get<Content[]>(`${env.contentApiUrl}/all`);
  }

}
