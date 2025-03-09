import { itemState } from '../state/item-state';
import { BaseComponent } from '../utils/base-component';

export class Kolesnik extends BaseComponent {
  private state = itemState;

  constructor() {
    super({ className: ['kolesnik'] });

    const count = new BaseComponent({
      tag: 'h1',
      className: ['count'],
      text: this.state.items.value.length.toString(),
      parent: this,
    });

    this.state.items.subscribe((items) => {
      count.element.textContent = items.length.toString();
    });
  }
}
