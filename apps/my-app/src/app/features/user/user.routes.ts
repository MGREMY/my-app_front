import { paramResolver } from '../../shared/resolvers/param.resolver';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';

import { Routes } from '@angular/router';

export default [
  {
    path: '',
    component: UserListPageComponent,
    resolve: {
      ...paramResolver('pageNumber', 1),
      ...paramResolver('pageSize', 15),
    },
  },
] as Routes;
