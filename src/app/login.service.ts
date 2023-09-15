import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environment.serverUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private http: HttpClient, private errorHandler: ErrorService) {}

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(
        this.url + '/admin/login',
        { username: username, password: password },
        { headers: this.headers }
      )
      .pipe(catchError(this.errorHandler.errorHandler));
  }
}
