import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Promo } from '../model/promo';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private baseURL = environment.Api + 'api/promotions';
  // eslint-disable-next-line @typescript-eslint/member-ordering
     constructor(private httpClient: HttpClient) { }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      getAllPromo(): Observable<any>{
        return  this.httpClient.get<Promo>(`${this.baseURL}`);}
      // eslint-disable-next-line @typescript-eslint/naming-convention
      getPromoByPart(id_part: number): Observable<any>{
        return  this.httpClient.get<Promo>(`${this.baseURL}`+`/`+`${id_part}`);}
}

