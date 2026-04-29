import { authGuard, notAuthGuard } from '@/shared/guards/auth.guard';

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    canActivate: [notAuthGuard],
    loadChildren: () => import('./features/landing/landing.routes'),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadChildren: () => import('./features/features.routes'),
  },
  {
    path: '**',
    loadChildren: () => import('./features/not-found/not-found.routes'),
  },
];
