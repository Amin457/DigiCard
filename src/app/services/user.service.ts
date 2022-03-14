import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: users= new users();
  private baseURL = 'http://localhost:3000/api/users/';
// eslint-disable-next-line @typescript-eslint/member-ordering
 constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<any>{
    return  this.httpClient.get<any>(`${this.baseURL}`+id);}  }
