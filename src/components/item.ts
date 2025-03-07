import { Item } from '../types/item';
import { BaseComponent, Props } from '../utils/base-component';
import { EventEmitter } from '../utils/event-emitter';
import { ButtonComponent } from './button';

export interface ItemProps extends Omit<Props<'div'>, 'tag'> {
  state: Item;
}

export class ItemComponent extends BaseComponent<'li'> {
  private readonly name: BaseComponent<'input'>;
  private readonly weight: BaseComponent<'input'>;
  private readonly state: Item;

  public readonly remove = new EventEmitter<number>();

  constructor(p: ItemProps) {
    super({
      tag: 'li',
      className: ['item'],
      ...p,
    });

    this.state = p.state;

    const id = new BaseComponent({ tag: 'span', text: `#${p.state.id}` });

    this.name = new BaseComponent({ tag: 'input' });
    this.name.element.value = p.state.text;
    this.name.addListener('change', () => (this.state.text = this.name.element.value));

    this.weight = new BaseComponent({ tag: 'input' });
    this.weight.element.value = String(p.state.wieght);
    this.weight.addListener(
      'change',
      () => (this.state.wieght = Number(this.weight.element.value)),
    );

    const remove = new ButtonComponent({
      text: 'Delete',
      onClick: () => this.remove.emit(p.state.id),
    });

    this.append(id, this.name, this.weight, remove);
  }
}
