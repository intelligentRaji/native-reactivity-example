import { APP_ROUTES } from '../constants/routes';
import { Router } from '../router/router';
import { BaseComponent } from '../utils/base-component';

export class App extends BaseComponent<'div'> {
  private readonly outlet = new BaseComponent({ tag: 'div', className: ['outlet'] });
  private readonly router = new Router(APP_ROUTES, this.outlet);

  constructor() {
    super({ className: ['app'] });

    const nav = new BaseComponent({ tag: 'nav', parent: this });
    const navButtons = new BaseComponent({ tag: 'ul', parent: nav });

    APP_ROUTES.forEach((route) => {
      const li = new BaseComponent({ tag: 'li', parent: navButtons });
      const link = new BaseComponent({ tag: 'a', parent: li, text: `${route.path.slice(1)}` });
      link.addListener('click', () => this.router.navigate(route.path));
    });

    this.append(this.outlet);
  }
}
