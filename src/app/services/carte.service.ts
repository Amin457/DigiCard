import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carte } from '../model/carte';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
      private baseURL = 'http://localhost:3000/api/cartes/';
  // eslint-disable-next-line @typescript-eslint/member-ordering
     constructor(private httpClient: HttpClient) { }

      getAllCartes(id: number): Observable<any>{
        return  this.httpClient.get<any>(`${this.baseURL}`+id);}

      // eslint-disable-next-line @typescript-eslint/naming-convention
      getCarteById(id_client: number,id_carte: number): Observable<any>{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          return  this.httpClient.get<Carte>(`${this.baseURL}`+id_client+'/'+id_carte);}
  }

