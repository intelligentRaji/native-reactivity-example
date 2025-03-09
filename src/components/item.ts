import { Item } from '../types/item';
import { BaseComponent } from '../utils/base-component';
import { EventEmitter } from '../utils/event-emitter';
import { ButtonComponent } from './button';

export class ItemComponent extends BaseComponent<'li'> {
  public readonly remove = new EventEmitter<number>();

  constructor(private readonly state: Item) {
    super({
      tag: 'li',
      className: ['item'],
    });

    const id = new BaseComponent({ tag: 'span', text: `#${state.id}` });

    const name = new BaseComponent({ tag: 'input' });
    name.element.value = state.text;
    name.addListener('change', () => (this.state.text = name.element.value));

    const weight = new BaseComponent({ tag: 'input' });
    weight.element.value = String(state.wieght);
    weight.addListener('change', () => (this.state.wieght = Number(weight.element.value)));

    const remove = new ButtonComponent({
      text: 'Delete',
      onClick: () => this.remove.emit(state.id),
    });

    this.append(id, name, weight, remove);
  }
}
