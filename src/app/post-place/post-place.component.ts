import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-post-place',
  templateUrl: './post-place.component.html',
  styleUrls: ['./post-place.component.css'],
})
export class PostPlaceComponent {
  placeName?: string;
  coordinates?: string; // oblika : "lat, lon"
  imageUrl?: string;
  description?: string;
  region = ['Gorenjska']; // regije še pridejo
  budget = [0, 1, 2, 3];
  attractions = [];

  constructor(private backend: BackendService) {}
}
