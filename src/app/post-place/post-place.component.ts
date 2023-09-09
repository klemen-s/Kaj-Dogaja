import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-post-place',
  templateUrl: './post-place.component.html',
  styleUrls: ['./post-place.component.css'],
})
export class PostPlaceComponent implements OnInit {
  constructor(private backend: BackendService) {}

  postPlace() {
    this.backend.postPlace().subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {
    this.postPlace();
  }
}
