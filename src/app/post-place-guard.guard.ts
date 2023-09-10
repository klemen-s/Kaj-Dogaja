import { CanActivateFn, Router } from '@angular/router';
import { BackendService } from './backend.service';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';

export const postPlaceGuardGuard: CanActivateFn = (route, state) => {
  const backend = inject(BackendService);
  const router = inject(Router);

  const jwt = localStorage.getItem('jwt');

  if (!jwt) {
    router.navigate(['/']);
    return of(false);
  }

  return backend.isAuth().pipe(
    map((value: any) => {
      if (value.isAuth) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }),
    catchError((error) => {
      console.error(error);
      router.navigate(['/']);
      return of(false);
    })
  );
};
