import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carte } from '../model/carte';
import { getCard } from '../model/getCard';
import { createCard } from '../model/createCard';
import { getPoint } from '../model/getPoint';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarteService {
      private url =environment.Api + 'api/soap/';
      private baseURL = environment.Api + 'api/cartes/';
     constructor(private httpClient: HttpClient) { }

      getAllCartes(id: number): Observable<any>{
        return  this.httpClient.get<any>(`${this.baseURL}`+id);}
      getCarteById(id_client: number,id_carte: number): Observable<any>{
          return  this.httpClient.get<Carte>(`${this.baseURL}`+id_client+'/'+id_carte);}
      GetLoyaltyCard(getCard : getCard): Observable<any>{
          return  this.httpClient.post<getCard>(`${this.url}`+`GetLoyaltyCard`,getCard);}
      createLoyaltyCard(createCard : createCard): Observable<any>{
          return  this.httpClient.post<getCard>(`${this.url}`+`createCard`,createCard);}
      getPoints(getPoint : getPoint): Observable<any>{
          return  this.httpClient.post<getPoint>(`${this.url}`+`getPoints`,getPoint);}
  }

