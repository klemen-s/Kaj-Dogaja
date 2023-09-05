import { Component } from '@angular/core';
import { PlaceComponent } from '../place/place.component';
import { BackendService } from '../backend.service';
import { OnInit } from '@angular/core';
import { Place } from '../place';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent implements OnInit {
  places: any[] = [];
  
  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.backend.showPlaces().subscribe((places) => {
      this.places = places;
    });
  }
}
