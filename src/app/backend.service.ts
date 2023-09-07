import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable, BehaviorSubject } from 'rxjs';
import { Place } from './place';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  headers = new HttpHeaders().set('content-type', 'application/json');

  private places = new BehaviorSubject<any>([]);
  private places$ = this.places.asObservable();

  // observable za place-detail
  private place = new BehaviorSubject<any>({});
  private place$ = this.place.asObservable();

  constructor(private http: HttpClient) {}

  // za dobivanje enega kraja
  showPlace() {
    return this.place$;
  }

  setPlace(value: any) {
    return this.place.next(value);
  }

  // za dobivanje vseh krajev z določenimi filtri
  showPlaces() {
    return this.places$;
  }

  setPlaces(value: any) {
    return this.places.next(value);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getPlaces(
    tripType: string,
    budget: number,
    region: string
  ): Observable<Place[]> {
    const params = new HttpParams()
      .set('region', region)
      .set('tripType', tripType)
      .set('budget', budget);

    return this.http
      .get<Place[]>('http://localhost:8080/get-places', { params: params })
      .pipe(catchError(this.errorHandler));
  }

  // postPlace() {
  //   return this.http
  //     .post('http://localhost:8080/post-places', {
  //       headers: this.headers,
  //     })
  //     .pipe(catchError(this.errorHandler));
  // }

  getPlace(placeId: string) {
    return this.http
      .get<any>('http://localhost:8080/places/' + placeId)
      .pipe(catchError(this.errorHandler));
  }

  getPlaceDetails(placeId: string) {
    this.getPlace(placeId).subscribe({
      next: ({place}) => {
        this.setPlace(place);
    } });
  }
}
