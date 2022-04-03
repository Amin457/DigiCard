import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partenaire } from '../model/partenaire';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  private baseURL = 'http://localhost:3000/api/partenaires/';
  // eslint-disable-next-line @typescript-eslint/member-ordering
     constructor(private httpClient: HttpClient) { }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      getAllpartenaire(): Observable<any>{
        return  this.httpClient.get<Partenaire>(`${this.baseURL}`);}
      getPartImg(name: string): Observable<any>{
        return  this.httpClient.get<any>(`http://localhost:3000/api/files/get/${name}`);}
}
