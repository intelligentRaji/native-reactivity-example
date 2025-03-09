import { BaseComponent } from '../../utils/base-component';

export interface Route<T extends BaseComponent = BaseComponent> {
  path: string;
  component: () => Promise<T>;
}
