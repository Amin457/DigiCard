import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cadeau } from '../model/cadeau';
import { recompense } from '../model/recompense';

@Injectable({
  providedIn: 'root'
})
export class CadeauService {
  private baseURL = environment.Api + 'api/cadeau/';
  constructor(private httpClient: HttpClient) { }
   getCadeau(id_part: number): Observable<any>{
     return  this.httpClient.get<cadeau>(`${this.baseURL}`+id_part);}
   insertRecompense(cad: recompense): Observable<any>{
      return  this.httpClient.post<recompense>(`${this.baseURL}`,cad);}
   getRecompense(id: number,id_part:number): Observable<any>{
      return  this.httpClient.get<any>(`${this.baseURL}`+'getRecompense/'+id+'/'+id_part);}
   getEtatJeux(id_part:number): Observable<any>{
        return  this.httpClient.get<any>(`${this.baseURL}`+'etat/'+id_part);}
   getPermissionJeux(id : number , id_part:number): Observable<any>{
          return  this.httpClient.get<any>(`${this.baseURL}`+'getPermissionJeux/'+id+'/'+id_part);}
}