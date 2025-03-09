import { Route } from './route';

export type Paths<T extends readonly Route[]> = T[number]['path'];
