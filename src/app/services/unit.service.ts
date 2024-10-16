import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Unit, UnitResponseDTO } from '../types/Unit.type';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private http: HttpClient) { }

  createUnit(data: Unit): Observable<any> {
    return this.http.post<any>(env.unitApiUrl, data);
  }

  updateUnit(data: Unit): Observable<any> {
    return this.http.put<any>(`${env.unitApiUrl}/${data.id}`, data);
  }

  deleteUnit(id: number): Observable<any> {
    return this.http.delete<any>(`${env.unitApiUrl}/${id}`);
  }

  getAllUnits(): Observable<UnitResponseDTO[]> {
    return this.http.get<UnitResponseDTO[]>(env.unitApiUrl);
  }

  getAllUnitDetails(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${env.unitApiUrl}/all`);
  }

  findUnitById(unitId: number): Observable<Unit> {
    return this.http.get<Unit>(`${env.unitApiUrl}/${unitId}`);
  }

  findUnitByTitle(title: string): Observable<Unit> {
    const params = new HttpParams().set('title', title);
    return this.http.get<Unit>(`${env.unitApiUrl}/search`, { params });
  }
}
