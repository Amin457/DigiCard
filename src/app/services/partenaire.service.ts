import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { Observable } from 'rxjs';
import { Partenaire } from '../model/partenaire';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
  private baseURL = 'http://localhost:3000/api/partenaires/';

  constructor(private httpClient: HttpClient) { }
      getAllpartenaire(): Observable<any>{
        return  this.httpClient.get<Partenaire>(`${this.baseURL}`);}
      getPartImg(name: string): Observable<any>{
        return  this.httpClient.get<any>(`http://localhost:3000/api/files/get/${name}`);}
      getConfig(id_part: number): Observable<any>{
        return  this.httpClient.get<Config>(`http://localhost:3000/api/partenaires/getConfig/${id_part}`);}
}
