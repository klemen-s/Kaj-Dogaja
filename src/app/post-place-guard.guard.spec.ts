import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { postPlaceGuardGuard } from './post-place-guard.guard';

describe('postPlaceGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => postPlaceGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
