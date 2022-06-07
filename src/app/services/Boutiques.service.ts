import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boutiques } from '../model/boutique';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private baseURL =environment.Api + 'api/boutique/';
     constructor(private httpClient: HttpClient) { }
      getBoutiques(id_part: number): Observable<any>{
        return  this.httpClient.get<Boutiques>(`${this.baseURL}`+id_part);}
}
