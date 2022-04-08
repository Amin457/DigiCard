import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carte } from '../model/carte';
import { getCard } from '../model/getCard';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
      private url ='http://localhost:3000/api/soap/GetLoyaltyCard';
      private baseURL = 'http://localhost:3000/api/cartes/';
     constructor(private httpClient: HttpClient) { }

      getAllCartes(id: number): Observable<any>{
        return  this.httpClient.get<any>(`${this.baseURL}`+id);}
      getCarteById(id_client: number,id_carte: number): Observable<any>{
          return  this.httpClient.get<Carte>(`${this.baseURL}`+id_client+'/'+id_carte);}
       GetLoyaltyCard(getCard : getCard): Observable<any>{
          return  this.httpClient.post<getCard>(`http://localhost:3000/api/soap/GetLoyaltyCard`,getCard);}
  }

