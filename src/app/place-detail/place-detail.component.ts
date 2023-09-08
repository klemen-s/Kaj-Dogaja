import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
})
export class PlaceDetailComponent implements OnInit {
  place: any;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private util: UtilService
  ) {}

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

  getBudget(): string {
    if (!this.place) {
      return '';
    }

    return this.util.getBudget(this.place.budget);
  }

  getAttractions(): string {
    if (!this.place) {
      return '';
    }

    return this.util.getAttractions(this.place);
  }
}
