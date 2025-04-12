import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access-token');
  const router = inject(Router);

  // Check if the route includes 'profile'
  if (token && router.url.toString().includes('/')) {
    router.navigate(['/profile']);
    return false;
  }
  return true;
};
