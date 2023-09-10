import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  // pretvarjanje števila cen v nize
  getBudget(budget: number): string {
    switch (budget) {
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
