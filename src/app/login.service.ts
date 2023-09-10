import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private errorHandler: ErrorService) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(
        'http://localhost:8080/admin/login',
        { username: username, password: password },
        { headers: this.headers }
      )
      .pipe(catchError(this.errorHandler.errorHandler));
  }
}
