export type Tags = keyof HTMLElementTagNameMap;

export type Props<T extends Tags> = {
  tag?: T;
  className?: string[];
  text?: string;
  parent?: BaseComponent<Tags>;
};

export class BaseComponent<
  T extends Tags = 'div',
  Node extends HTMLElementTagNameMap[T] = HTMLElementTagNameMap[T],
> {
  private readonly _element: Node;
  private readonly _children: BaseComponent<Tags>[] = [];

  constructor(p: Props<T> = {}) {
    this._element = document.createElement(p.tag ?? 'div') as Node;

    if (p.className) {
      p.className.forEach((name) => this._element.classList.add(name));
    }

    if (p.text) {
      this._element.textContent = p.text;
    }

    p.parent?._element.appendChild(this._element);
  }

  get element(): HTMLElementTagNameMap[T] {
    return this._element;
  }

  public addListener<K extends keyof HTMLElementEventMap>(
    event: K,
    callback: (event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ): void {
    this._element.addEventListener(event, callback as EventListener, options);
  }

  public removeEventListener<K extends keyof HTMLElementEventMap>(
    event: K,
    callback: (event: HTMLElementEventMap[K]) => void,
    options?: EventListenerOptions,
  ): void {
    this._element.removeEventListener(event, callback as EventListener, options);
  }

  public append(...children: BaseComponent<Tags>[]): void {
    children.forEach((child) => {
      this._element.appendChild(child.element);
      this._children.push(child);
    });
  }

  public destroy(): void {
    this._children.forEach((child) => child.destroy());
    this._element.remove();
  }

  public destroyChildren(): void {
    this._children.forEach((child) => child.destroy());
  }
}
