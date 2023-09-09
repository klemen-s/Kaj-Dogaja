import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private backend: BackendService) {}

  register(username: string, password: string) {}
}
