import { BaseComponent } from '../utils/base-component';
import { Route } from './types/route';

export class Router {
  constructor(
    private readonly routes: Route[],
    private outlet: BaseComponent,
  ) {
    window.addEventListener('popstate', () => {
      this.render(window.location.pathname);
    });

    const { pathname } = window.location;

    this.render(pathname);
  }

  public navigate(url: string): void {
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
