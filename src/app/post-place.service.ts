import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostPlaceService {
  constructor(private http: HttpClient) {}

  checkPlaceName(placeName: string): Observable<Boolean> {
    const jwt = localStorage['get']('jwt');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + jwt);

    // back-end validation
    // post http request
    return this.http.post<Boolean>(
      'http://localhost:8080/post-place/placeName',
      { placeName: placeName },
      { headers: headers }
    );
  }
}
