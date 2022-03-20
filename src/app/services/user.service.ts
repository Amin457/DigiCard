import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:3000/api/users/';
// eslint-disable-next-line @typescript-eslint/member-ordering
 constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<any>{
    return  this.httpClient.get<users>(`${this.baseURL}`+id);}

  login(user: users): Observable<any>{
    return  this.httpClient.post<users>(`${this.baseURL}`+'login',user);}

  register(user: users): Observable<any>{
    return  this.httpClient.post<users>(`${this.baseURL}`,user);}

  updateUser(user: users): Observable<any>{
      return  this.httpClient.patch<users>(`${this.baseURL}`,user);}
}
