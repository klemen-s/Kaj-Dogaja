import { Component, Input } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

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
    _id: '',
  };

  constructor(private backend: BackendService, private router: Router) {}

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
    let attractions = '';

    for (let attraction of this.place.attractions) {
      if (attractions.length > 0) {
        attractions += ', ' + attraction;
      } else {
        attractions += attraction;
      }
    }

    return attractions;
  }

  // v place-detail komponento dobimo podrobnosti tega "place-a"
  getPlace() {
    try {
      this.backend.getPlace(this.place._id).subscribe((value) => {
        // nastavimo našemu "place" spremenljivki vrednost "place-a", ki jo delimo preko nepovezanih komponentov
        // nato se pa naročimo place$ v place-detail komponenti
        this.backend.setPlace(value.place);
        this.router.navigate(['/places/' + this.place._id]);
      });
    } catch (error) {}
  }
}
