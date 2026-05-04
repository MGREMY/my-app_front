import { authGuard, notAuthGuard } from '@/shared/guards/auth.guard';

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    canActivate: [notAuthGuard],
    loadChildren: () => import('./pages/landing/landing.routes'),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/pages.routes'),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.routes'),
  },
];
