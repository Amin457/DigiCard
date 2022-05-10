import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
      private baseURL =environment.Api + 'api/notification/';
     constructor(private httpClient: HttpClient) { }

     nbrNotif(id_client : number): Observable<any>{
        return  this.httpClient.get<any>(`${this.baseURL}`+`nbrNotif/${id_client}`);}
     getAllNotif(id_client : number): Observable<any>{
        return  this.httpClient.get<any>(`${this.baseURL}`+`getAllNotif/${id_client}`);}
  }