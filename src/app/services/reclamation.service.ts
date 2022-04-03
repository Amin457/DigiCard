import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../model/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseURL = 'http://localhost:3000/api/reclamation';
  // eslint-disable-next-line @typescript-eslint/member-ordering
     constructor(private httpClient: HttpClient) { }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      createRec(rec: Reclamation): Observable<any>{
        return  this.httpClient.post<Reclamation>(`${this.baseURL}`,rec);}
}
