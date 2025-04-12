import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access-token');
  const router = inject(Router);
  const allowedUrls = ['profile'];

  // Check if the route includes 'profile'
  if (!token && allowedUrls.includes(route.url.toString())) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
