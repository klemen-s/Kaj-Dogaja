import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostPlaceService {
  jwt = localStorage.getItem('jwt');
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.jwt);

  constructor(private http: HttpClient) {}

  checkPlaceName(placeName: string): Observable<Boolean> {
    return this.http.post<Boolean>(
      'http://localhost:8080/post-place/placeName',
      { placeName: placeName },
      { headers: this.headers }
    );
  }

  addPlace(place: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/post-place',
      { place: place },
      { headers: this.headers }
    );
  }
}
