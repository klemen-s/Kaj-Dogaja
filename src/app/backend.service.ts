import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable, BehaviorSubject } from 'rxjs';
import { Place } from './place';
import { QueryParamsService } from './query-params.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private places = new BehaviorSubject<any>([]);
  private places$ = this.places.asObservable();

  // observable za place-detail
  private place = new BehaviorSubject<any>({});
  private place$ = this.place.asObservable();

  constructor(
    private http: HttpClient,
    private querySParamsService: QueryParamsService
  ) {}

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

    // nastavimo parametre za queryParamsService
    this.querySParamsService.setQueryParams({
      tripType: tripType,
      region: region,
      budget: budget,
    });

    return this.http
      .get<Place[]>('http://localhost:8080/get-places', { params: params })
      .pipe(catchError(this.errorHandler));
  }

  postPlace() {
    const jwt = localStorage.getItem('jwt')

    const postHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwt}`);

    return this.http
      .post(
        'http://localhost:8080/post-places',
        { message: 'Arrived' }, // placeholder za, pozneje, podatke o novem izletu 
        {
          headers: postHeaders,
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  getPlace(placeId: string) {
    return this.http
      .get<any>('http://localhost:8080/places/' + placeId)
      .pipe(catchError(this.errorHandler));
  }

  getPlaceDetails(placeId: string) {
    this.getPlace(placeId).subscribe({
      next: ({ place }) => {
        this.setPlace(place);
      },
    });
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(
        'http://localhost:8080/admin/login',
        { username: username, password: password },
        { headers: this.headers }
      )
      .pipe(catchError(this.errorHandler));
  }
}
