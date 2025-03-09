import { Route } from '../router/types/route';

export const APP_ROUTES = [
  {
    path: '/options',
    component: () => import('../components/options').then((m) => new m.OptionsComponent()),
  },
  {
    path: '/kolesnik',
    component: () => import('../components/kolesnik').then((m) => new m.Kolesnik()),
  },
] as const satisfies Route[];

//! For students
//  `as const` is used to say typecsript what that value will never be reasigned.
// read https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions

// ``satisfies`` is used to indicate to TypeScript that this value will be of type Route,
// but does not actually change the type of the value.
// read https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator

// If you are creating routes inside Router constructor parameters
// this assertion is not needed.
