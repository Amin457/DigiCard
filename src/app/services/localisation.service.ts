import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localisation } from '../model/localisation';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  private baseURL = 'http://localhost:3000/api/localisations/';
  // eslint-disable-next-line @typescript-eslint/member-ordering
     constructor(private httpClient: HttpClient) { }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      getLocalisations(id_part: number): Observable<any>{
        return  this.httpClient.get<Localisation>(`${this.baseURL}`+id_part);}
}
