import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Place } from '../place';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
})
export class PlaceDetailComponent implements OnInit {
  place: any;

  constructor(private backend: BackendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // parametri iz URL-ja
    this.route.paramMap.subscribe((params) => {
      const id = params.get('placeId');

      if (id) {
        this.backend.getPlaceDetails(id);
        this.backend.showPlace().subscribe({
          next: (place) => {
            this.place = place;
          },
          error: (err) => console.log(err),
        });
      }
    });
  }
}
