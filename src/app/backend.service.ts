import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, BehaviorSubject } from 'rxjs';
import { Place } from './place';
import { QueryParamsService } from './query-params.service';
import { ErrorService } from './error.service';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  url = environment.serverUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private places = new BehaviorSubject<any>([]);
  private places$ = this.places.asObservable();

  // observable za place-detail
  private place = new BehaviorSubject<any>({});
  private place$ = this.place.asObservable();

  constructor(
    private http: HttpClient,
    private querySParamsService: QueryParamsService,
    private errorHandler: ErrorService
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
      .get<Place[]>(this.url + '/get-places', { params: params })
      .pipe(catchError(this.errorHandler.errorHandler));
  }

  postPlace(place: Place) {
    const jwt = localStorage.getItem('jwt');

    const postHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwt}`);

    return this.http
      .post(
        this.url + '/post-places',
        { place: { ...place } }, // placeholder za, pozneje, podatke o novem izletu
        {
          headers: postHeaders,
        }
      )
      .pipe(catchError(this.errorHandler.errorHandler));
  }

  // funckija za preverjanje če imamo pravice za post-place pot
  isAuth() {
    // to vedno deluje, ker v post-place-guard pogledamo če imamo jwt token v localStorage, če ne že prej redirectamo.
    const jwt = localStorage.getItem('jwt');

    const authHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwt}`);

    return this.http.get(this.url + '/is-auth', {
      headers: authHeaders,
    });
  }

  getPlace(placeId: string) {
    return this.http
      .get<any>(this.url + '/places/' + placeId)
      .pipe(catchError(this.errorHandler.errorHandler));
  }

  getPlaceDetails(placeId: string) {
    this.getPlace(placeId).subscribe({
      next: ({ place }) => {
        this.setPlace(place);
      },
    });
  }
}
