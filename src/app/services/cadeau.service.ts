import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cadeau } from '../model/cadeau';
import { recompense } from '../model/recompense';

@Injectable({
  providedIn: 'root'
})
export class CadeauService {
  private baseURL = 'http://localhost:3000/api/cadeau/';
  constructor(private httpClient: HttpClient) { }
   getCadeau(id_part: number): Observable<any>{
     return  this.httpClient.get<cadeau>(`${this.baseURL}`+id_part);}
   insertRecompense(cad: recompense): Observable<any>{
      return  this.httpClient.post<recompense>(`${this.baseURL}`,cad);}
}
