import { Component, Input } from '@angular/core';
import { BackendService } from '../backend.service';
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
  };

  constructor(
    private backend: BackendService,
    private router: Router,
    private util: UtilService
  ) {}

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
}
