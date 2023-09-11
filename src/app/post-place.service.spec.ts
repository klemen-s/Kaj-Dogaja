import { TestBed } from '@angular/core/testing';

import { PostPlaceService } from './post-place.service';

describe('PostPlaceService', () => {
  let service: PostPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
