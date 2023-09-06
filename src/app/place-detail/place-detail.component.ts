import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Place } from '../place';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
})
export class PlaceDetailComponent implements OnInit {
  place?: any;

  constructor(private backend: BackendService) {}

  getPlaceDetails() {
    this.backend.showPlace().subscribe((place) => {
      this.place = place;
      console.log(this.place);
    });
  }

  ngOnInit(): void {
    this.getPlaceDetails();
  }
}
