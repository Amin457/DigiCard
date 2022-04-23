import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partenaire } from '../model/partenaire';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
  private baseURL =environment.Api + 'api/partenaires/';
 private fileUrl = environment.Api + 'api/files/get/';
  constructor(private httpClient: HttpClient) { }
      getAllpartenaire(): Observable<any>{
        return  this.httpClient.get<Partenaire>(`${this.baseURL}`);}
      getPartImg(name: string): Observable<any>{
        return  this.httpClient.get<any>(`${this.fileUrl}`+`${name}`);}
      getConfig(id_part: number): Observable<any>{
        return  this.httpClient.get<Config>(`${this.baseURL}`+`getConfig/${id_part}`);}
}
