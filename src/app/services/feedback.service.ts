import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseURL =environment.Api + 'api/feedback';
     constructor(private httpClient: HttpClient) { }
      createFeed(feed: Feedback): Observable<any>{
        return  this.httpClient.put<Feedback>(`${this.baseURL}`,feed);}
      getAllQuestion(id_part: number): Observable<any>{
         return  this.httpClient.get<Feedback>(`${this.baseURL}`+`/question/`+id_part);}
}
