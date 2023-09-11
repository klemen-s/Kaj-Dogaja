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

  budgetValues = [1, 2, 3];

  placeName: any = '';
  coordinates: string = ''; // oblika : "lat, lon"
  imageUrl: string = '';
  description: string = '';
  region = ['Gorenjska']; // regije še pridejo
  budget: number = 1;
  attraction: string = '';
  attractions: string[] = [];

  constructor(
    private util: UtilService,
    private postPlaceService: PostPlaceService
  ) {}

  setBudget(value: number): string {
    return this.util.setBudget(value);
  }

  addAttraction(): void {
    const attraction = this.attraction;
    this.attractions.push(attraction);
    this.attraction = '';
  }

  placeNameInvalid() {
    return (
      this.placeName.length < 2 &&
      this.postPlaceForm?.controls['placeName'].touched
    );
  }

  onSubmit() {}
}
