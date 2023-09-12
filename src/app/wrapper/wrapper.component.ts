import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent {
  isNavbarVisible: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe({
      next: (val) => {
        if (val instanceof NavigationEnd) {
          if (val.url === '/') {
            this.isNavbarVisible = false;
          } else {
            this.isNavbarVisible = true;
          }
        }
      },
    });
  }
}
