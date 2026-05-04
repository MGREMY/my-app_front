import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { Routes } from '@angular/router';

export default [
  {
    path: '**',
    component: NotFoundPageComponent,
  },
] as Routes;
