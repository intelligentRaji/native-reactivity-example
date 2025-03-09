import { BaseComponent } from '../utils/base-component';
import { Route } from './types/route';
import { Paths } from './types/router-helpers';

export class Router<Routes extends readonly Route[]> {
  constructor(
    private readonly routes: Routes,
    private outlet: BaseComponent,
  ) {
    window.addEventListener('popstate', () => {
      this.render(window.location.pathname);
    });

    const { pathname } = window.location;

    this.render(pathname);
  }

  public navigate(url: Paths<Routes>): void {
    history.pushState(null, '', url);

    this.render(url);
  }

  private render(url: string): void {
    const route = this.routes.find((route) => route.path === url);

    if (route) {
      this.outlet.destroyChildren();

      route.component().then((component) => this.outlet.append(component));
    }
  }
}
