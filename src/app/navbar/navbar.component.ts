import { Component } from '@angular/core';
import { QueryParamsService } from '../query-params.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private querySParamsService: QueryParamsService,
    private backend: BackendService,
    private activatedRoute: ActivatedRoute
  ) {}

  goBack() {
    const queryParams = this.querySParamsService.getQueryParams();
    const tripType = queryParams.tripType;
    const region = queryParams.region;
    const budget = queryParams.budget;

    return this.backend.getPlaces(tripType, budget, region).subscribe({
      next: (value: any) => {
        this.backend.setPlaces(value.places);
        this.router.navigate(['/places']);
      },
      error: (err) => console.log(err),
    });
  }

  isPlaceDetail(): boolean {
    return this.router.url.length === 32;
  }
}
