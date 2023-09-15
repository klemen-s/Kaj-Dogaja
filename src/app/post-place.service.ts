import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostPlaceService {
  url = environment.serverUrl;

  jwt = localStorage.getItem('jwt');
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.jwt);

  constructor(private http: HttpClient) {}

  checkPlaceName(placeName: string): Observable<Boolean> {
    return this.http.post<Boolean>(
      this.url + '/post-place/placeName',
      { placeName: placeName },
      { headers: this.headers }
    );
  }

  addPlace(place: any): Observable<any> {
    return this.http.post(
      this.url + '/post-place',
      { place: place },
      { headers: this.headers }
    );
  }
}
