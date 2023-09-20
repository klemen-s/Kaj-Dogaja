import { Component, Input } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent {
  regions: string[] = [
    'Gorenjska',
    'Primorska',
    'Prekmurje',
    'Štajerska',
    'Dolenjska',
  ];

  submitted: boolean = false;

  selectedTripType: string = '';
  selectedRegion: string = '';
  selectedBudget: number = 0;

  regionError: boolean = false;
  tripTypeError: boolean = false;

  regionErrorMessage: string = 'Prosim, če izbereš regijo izleta.';
  tripTypeErrorMessage: string = 'Prosim, če izbereš tip izleta';

  errorMsg?: string;
  infoMsg?: string;

  isAuth: boolean = false;

  constructor(private backend: BackendService, private router: Router) {}

  isTripTypeInvalid() {
    if (this.selectedTripType.trim() === '') {
      this.tripTypeError = true;
    } else {
      this.tripTypeError = false;
    }
    return this.tripTypeError;
  }

  updateSelectedTripType(value: string) {
    this.selectedTripType = value;
    this.tripTypeError = false;
  }

  isRegionInvalid() {
    if (this.selectedRegion.trim() === '') {
      this.regionError = true;
    } else {
      this.regionError = false;
    }
    return this.regionError;
  }

  updateSelectedRegion(value: string) {
    this.selectedRegion = value;
    this.regionError = false;
  }

  getPlaces(tripType: string, budget: number, region: string) {
    if (tripType.trim() === '') {
      this.tripTypeError = true;
      return;
    }
    this.tripTypeError = false;

    if (region.trim() === '') {
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
}
