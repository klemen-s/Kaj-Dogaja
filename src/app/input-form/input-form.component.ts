import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent {
  selectedTripType: string = '';
  selectedRegion: string = '';
  selectedBudget: number = 0;

  regionError: boolean = false;
  tripTypeError: boolean = false;

  regionErrorMessage: string = '';
  tripTypeErrorMessage: string = '';

  errorMsg?: string;
  infoMsg?: string;

  constructor(private backend: BackendService, private router: Router) {}

  getPlaces(tripType: string, budget: number, region: string) {
    if (tripType == '') {
      this.tripTypeErrorMessage = 'Prosim, če izbereš tip izleta.';
      this.tripTypeError = true;
      return;
    }
    this.tripTypeError = false;

    if (region == '') {
      this.regionErrorMessage = 'Prosim, če izbereš regijo izleta.';
      this.regionError = true;
      return;
    }

    this.regionError = false;

    return this.backend.getPlaces(tripType, budget, region).subscribe({
      next: (value: any) => {
        if (value.statusCode === 422) {
          this.errorMsg = value.message;
          this.infoMsg = undefined;
          return;
        }

        if (value.statusCode === 404) {
          this.infoMsg = value.message;
          this.errorMsg = undefined;
          return;
        }

        this.backend.setPlaces(value.places);
        this.router.navigate(['/places']);
      },
      error: (err) => console.log(err),
    });
  }

  postPlaces() {
    return this.backend.postPlace().subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => console.log(err),
    });
  }
}
