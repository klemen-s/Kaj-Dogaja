import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent implements OnInit {
  public innerWidth: any;
  isDesktop: boolean = false;
  places: any[] = [];

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth >= 1200) {
      this.isDesktop = true;
    } else {
      this.isDesktop = false;
    }

    this.backend.showPlaces().subscribe((places) => {
      this.places = places;
    });
  }
}
