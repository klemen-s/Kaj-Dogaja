import { Component, ViewChild } from '@angular/core';
import { UtilService } from '../util.service';
import { PostPlaceService } from '../post-place.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-place',
  templateUrl: './post-place.component.html',
  styleUrls: ['./post-place.component.css'],
})
export class PostPlaceComponent {
  @ViewChild('postPlaceForm') postPlaceForm?: NgForm;

  submitted: boolean = false;

  budgetValues: number[] = [1, 2, 3];
  tripTypes: string[] = ['Nature', 'Culture', 'Sports'];
  regions: string[] = [
    'Gorenjska',
    'Dolenjska',
    'Primorska',
    'Štajerska',
    'Prekmurje',
  ];

  placeName: string = '';
  coordinates: string = ''; // oblika : "lat, lon"
  imageUrl: string = '';
  description: string = '';
  tripType: string = 'Nature';
  region: string = 'Gorenjska';
  budget: number = 1;
  attraction: string = '';
  attractions: string[] = [];

  placeNameInvalidBool: boolean = false;
  placeNameInvalidValue?: string;

  placeNameInvalidBackend: boolean = false;
  placeNameInvalidBackendValue?: string;

  descriptionError: boolean = false;
  imageUrlError: boolean = false;
  attractionsError: boolean = false;

  isSuccess: boolean = false;
  successMessage: string = '';

  constructor(
    private util: UtilService,
    private postPlaceService: PostPlaceService
  ) {}

  setBudget(value: number): string {
    return this.util.setBudget(value);
  }

  setTripType(value: string): string {
    return this.util.setTripType(value);
  }

  addAttraction(): void {
    const attraction = this.attraction;

    if (attraction.trim() === '') {
      return;
    }
    this.attractions.push(attraction);

    if (this.attractions.length > 1 && this.attractionsError) {
      this.attractionsError = false;
    }
    this.attraction = '';
  }

  placeNameInvalid() {
    return (
      (this.placeName.length < 2 &&
        this.postPlaceForm?.controls['placeName'].touched) ||
      (this.placeName.length < 2 && this.postPlaceForm?.submitted)
    );
  }

  coordinatesInvalid() {
    return (
      (this.coordinates.split(',').length < 2 &&
        this.postPlaceForm?.controls['coordinates'].touched) ||
      (this.coordinates.split(',').length < 2 && this.postPlaceForm?.submitted)
    );
  }

  invalidUrl() {
    return (
      (this.imageUrl.length < 20 &&
        this.postPlaceForm?.controls['imageUrl'].touched) ||
      (this.imageUrl.length < 20 && this.postPlaceForm?.submitted)
    );
  }

  invalidDescription() {
    return (
      (this.description.length < 200 &&
        this.postPlaceForm?.controls['description'].touched) ||
      (this.description.length < 200 && this.postPlaceForm?.submitted)
    );
  }

  onSubmit() {
    if (
      this.placeNameInvalid() ||
      this.coordinatesInvalid() ||
      this.invalidUrl() ||
      this.invalidDescription() ||
      this.attractions.length < 2
    ) {
      this.attractionsError = true;
      return;
    }

    this.postPlaceService.checkPlaceName(this.placeName.trim()).subscribe({
      next: (value: any) => {
        const { message } = value;
        const { isError } = value;

        this.placeNameInvalidBackend = isError;
        this.placeNameInvalidBackendValue = message;

        if (this.placeNameInvalidBackend) return;

        this.postPlaceService
          .addPlace({
            placeName: this.placeName,
            coordinates: this.coordinates,
            imageUrl: this.imageUrl,
            description: this.description,
            region: this.region,
            tripType: this.tripType,
            budget: this.budget,
            attractions: this.attractions,
          })
          .subscribe({
            next: (value) => {
              this.isSuccess = value.isSuccess;
            },
          });

        this.submitted = true;
      },
    });
  }
}
