import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';

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
    imageUrl: '',
  };

  @Input() isDesktop?: boolean;

  constructor(private router: Router, private util: UtilService) {}

  getBudget(): string {
    return this.util.setBudget(this.place.budget);
  }

  getPlace() {
    try {
      this.router.navigate(['/places/' + this.place._id]);
    } catch (error) {}
  }

  getQuickSummary(): string {
    return this.place.description.substring(0, 99) + '...';
  }

  getQuickSummaryDesktop(): string {
    return this.place.description.substring(0, 250) + '...';
  }
}
