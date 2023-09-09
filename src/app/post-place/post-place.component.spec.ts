import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPlaceComponent } from './post-place.component';

describe('PostPlaceComponent', () => {
  let component: PostPlaceComponent;
  let fixture: ComponentFixture<PostPlaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostPlaceComponent]
    });
    fixture = TestBed.createComponent(PostPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
