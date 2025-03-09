import { itemState } from '../state/item-state';
import { Item } from '../types/item';
import { BaseComponent } from '../utils/base-component';
import { ButtonComponent } from './button';
import { ItemComponent } from './item';

let interval: number | null = null;

export class OptionsComponent extends BaseComponent<'div'> {
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

    const startGenerator = new ButtonComponent({
      onClick: () => {
        interval = setInterval(() => this.createItem(), 1000);
      },
      text: 'Start generator',
    });

    const stopGenerator = new ButtonComponent({
      onClick: () => {
        if (interval) {
          clearInterval(interval);
        }
      },
      text: 'Stop generator',
    });

    this.list = new BaseComponent({ tag: 'ul', className: ['list'] });

    buttons.append(add, clear, showValue, startGenerator, stopGenerator);
    this.append(buttons, this.list);

    this.renderItems(this.state.items.value);

    this.subs.push(
      this.state.items.subscribe((items) => {
        this.renderItems(items);
      }),
    );
  }

  private renderItems(items: Item[]): void {
    // console.log is added to demonstrate unsubscribe process
    console.log(items.length);
    this.list.destroyChildren();

    items.forEach((item) => {
      const itemComponent = new ItemComponent(item);
      this.list.append(itemComponent);

      this.subs.push(
        itemComponent.remove.subscribe((id) => {
          this.state.remove(id);
        }),
      );
    });
  }

  private createItem(): void {
    this.state.add({ text: '', wieght: 0 });
  }

  private clearItems(): void {
    this.state.clear();
  }

  public override destroy(): void {
    super.destroy();
    this.subs.forEach((sub) => sub());
  }
}
