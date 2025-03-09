import { Route } from '../router/types/route';

export const APP_ROUTES: Route[] = [
  {
    path: '/options',
    component: () => import('../components/options').then((m) => new m.OptionsComponent()),
  },
  {
    path: '/kolesnik',
    component: () => import('../components/kolesnik').then((m) => new m.Kolesnik()),
  },
];
