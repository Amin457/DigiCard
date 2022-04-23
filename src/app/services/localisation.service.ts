import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Localisation } from '../model/localisation';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  private baseURL =environment.Api + 'api/localisations/';
     constructor(private httpClient: HttpClient) { }
      getLocalisations(id_part: number): Observable<any>{
        return  this.httpClient.get<Localisation>(`${this.baseURL}`+id_part);}
}
