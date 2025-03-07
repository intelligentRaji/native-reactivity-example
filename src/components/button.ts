import { BaseComponent, Props } from '../utils/base-component';

export interface ButtonProps extends Omit<Props<'button'>, 'tag'> {
  onClick?: () => void;
}

export class ButtonComponent extends BaseComponent<'button'> {
  constructor(p: ButtonProps = {}) {
    super({
      tag: 'button',
      ...p,
    });

    if (p.onClick) {
      this.addListener('click', p.onClick);
    }
  }
}
