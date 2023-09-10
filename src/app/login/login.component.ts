import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  usernameError?: string;
  passwordError?: string;

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (value) => {
        if (value.usernameError) {
          this.usernameError = value.usernameError;
          return;
        }

        this.usernameError = undefined;

        if (value.passwordError) {
          this.passwordError = value.passwordError;
          return;
        }

        this.passwordError = undefined;

        const { jwt } = value;

        localStorage.setItem('jwt', jwt);
        this.router.navigate(['/']);
      },
      error: (err) => console.log(err),
    });
  }
}
