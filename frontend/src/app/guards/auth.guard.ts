import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  if (localStorage.getItem('currentUser')) {
    return true;
  }

  router.navigate(['/'], { queryParams: { returnUrl: state.url } });
  return false;
};
