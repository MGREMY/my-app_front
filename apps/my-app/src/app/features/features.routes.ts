import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes'),
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.routes'),
  },
] as Routes;
