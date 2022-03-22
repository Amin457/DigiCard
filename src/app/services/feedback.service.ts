import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseURL = 'http://localhost:3000/api/feedback';
  // eslint-disable-next-line @typescript-eslint/member-ordering
     constructor(private httpClient: HttpClient) { }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      createFeed(feed: Feedback): Observable<any>{
        return  this.httpClient.put<Feedback>(`${this.baseURL}`,feed);}
}
