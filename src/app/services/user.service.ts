import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from '../model/user';
import {data} from '../model/data';
import { environment } from 'src/environments/environment';
import { notif } from 'src/app/model/notif';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = environment.Api + 'api/users/';
  private soapurl = environment.Api + 'api/soap/createClient';

 constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<any>{
    return  this.httpClient.get<users>(`${this.baseURL}`+id);}

  login(user: users): Observable<any>{
    return  this.httpClient.post<users>(`${this.baseURL}`+'login',user);}

  register(user: users): Observable<any>{
    return  this.httpClient.post<users>(`${this.baseURL}`,user);}

    createClient(data: data): Observable<any>{
      return  this.httpClient.post<data>(`${this.soapurl}`,data);}

  updateUser(user: users): Observable<any>{
      return  this.httpClient.patch<users>(`${this.baseURL}`,user);}

  registerNotif(notif: notif): Observable<any>{
        return  this.httpClient.post<notif>(`${this.baseURL}`+'registerNotif',notif);}
}
