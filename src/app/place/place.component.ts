import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
})
export class PlaceComponent {
  @Input() place = {
    placeName: '',
    description: '',
    budget: 0,
    attractions: [],
  };

  getBudget(): string {
    switch (this.place.budget) {
      case 1:
        return '€';
      case 2:
        return '€€';
      case 3:
        return '€€€';
      default:
        return 'No budget';
    }
  }

  getAttractions(): string {
    let attractions = "";

    for (let attraction of this.place.attractions) {
      console.log(attraction)
      if (attractions.length > 0) {
        attractions += ", " + attraction;
      } else {
        attractions += attraction
      }
    }

    return attractions;
  }
}
