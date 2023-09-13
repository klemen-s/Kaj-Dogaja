import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  setBudget(budget: number): string {
    switch (budget) {
      case 1:
        return '€';
      case 2:
        return '€€';
      default:
        return '€€€';
    }
  }

  setTripType(tripType: string) {
    switch (tripType) {
      case 'Nature':
        return 'Narava';
      case 'Sports':
        return 'Šport';
      default:
        return 'Kultura';
    }
  }

  getAttractions(place: any): string {
    let attractions = '';

    if (!place) {
      return '';
    }

    for (let attraction of place.attractions) {
      if (attractions.length > 0) {
        attractions += ', ' + attraction;
      } else {
        attractions += attraction;
      }
    }

    return attractions;
  }
}
