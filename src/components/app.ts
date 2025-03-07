import { itemState } from '../state/item-state';
import { Item } from '../types/item';
import { BaseComponent } from '../utils/base-component';
import { ButtonComponent } from './button';
import { ItemComponent } from './item';

export class App extends BaseComponent<'div'> {
  private readonly state = itemState;
  private readonly list: BaseComponent<'ul'>;

  private subs: ((...p: unknown[]) => void)[] = [];

  constructor() {
    super({
      className: ['app'],
    });

    const buttons = new BaseComponent({ tag: 'div', className: ['buttons'] });

    const add = new ButtonComponent({
      onClick: () => this.createItem(),
      text: 'Add',
    });

    const clear = new ButtonComponent({
      onClick: () => this.clearItems(),
      text: 'Clear',
    });

    const showValue = new ButtonComponent({
      onClick: () => {
        console.log(this.state.items.value);
      },
      text: 'Show value',
    });

    this.list = new BaseComponent({ tag: 'ul', className: ['list'] });

    buttons.append(add, clear, showValue);
    this.append(buttons, this.list);

    this.subs.push(
      this.state.items.subscribe((items) => {
        this.drawItems(items);
      }),
    );
  }

  public mount(root: HTMLElement): void {
    root.appendChild(this.element);
  }

  private drawItems(items: Item[]): void {
    this.list.destroyChildren();

    items.forEach((item) => {
      const itemComponent = new ItemComponent({ state: item });
      this.list.append(itemComponent);

      this.subs.push(
        itemComponent.remove.subscribe((id) => {
          this.state.removeItem(id);
        }),
      );
    });
  }

  private createItem(): void {
    this.state.addItem({ text: '', wieght: 0 });
  }

  private clearItems(): void {
    this.state.clearItems();
  }
}
