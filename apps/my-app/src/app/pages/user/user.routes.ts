import { UserDetailPage } from './pages/user-detail-page/user-detail.page';
import { UserListPage } from './pages/user-list-page/user-list.page';

import { paramResolver } from '@/shared/resolvers/param.resolver';

import { Routes } from '@angular/router';

export default [
  {
    path: '',
    component: UserListPage,
    resolve: {
      ...paramResolver('pageNumber', 1),
      ...paramResolver('pageSize', 15),
    },
  },
  {
    path: ':id',
    component: UserDetailPage,
  },
] as Routes;
