import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-post-place',
  templateUrl: './post-place.component.html',
  styleUrls: ['./post-place.component.css'],
})
export class PostPlaceComponent {
  budgetValues = [1, 2, 3];

  placeName: string = '';
  coordinates: string = ''; // oblika : "lat, lon"
  imageUrl: string = '';
  description: string = '';
  region = ['Gorenjska']; // regije še pridejo
  budget: number = 1;
  attraction: string = '';
  attractions: string[] = [];

  constructor(private backend: BackendService, private util: UtilService) {}

  setBudget(value: number): string {
    return this.util.setBudget(value);
  }

  addAttraction(): void {
    const attraction = this.attraction;
    this.attractions.push(attraction);
    this.attraction = '';
  }

  addPlace(): void {}

  onSubmit() {}
}
