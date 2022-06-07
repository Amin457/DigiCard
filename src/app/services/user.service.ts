import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from '../model/user';
import { environment } from 'src/environments/environment';
import { notif } from 'src/app/model/notif';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = environment.Api + 'api/users/';
  __url = environment.Api+'api/files/upload';

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get<users>(`${this.baseURL}` + id);
  }

  login(user: users): Observable<any> {
    return this.httpClient.post<users>(`${this.baseURL}` + 'login', user);
  }

  register(user: users): Observable<any> {
    return this.httpClient.post<users>(`${this.baseURL}`, user);
  }

  updateUser(user: users): Observable<any> {
    return this.httpClient.patch<users>(`${this.baseURL}`, user);
  }

  registerNotif(notif: notif): Observable<any> {
    return this.httpClient.post<notif>(`${this.baseURL}` + 'registerNotif', notif);
  }

  postFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file' , file); 
    return this.httpClient.post(this.__url,formData);
  }

  deleteToken(id:number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}` + 'deleteToken/'+id);
  }

}
