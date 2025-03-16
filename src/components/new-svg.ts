import { BaseComponent, Props } from '../utils/base-component';

const SVG_PATH = '/public';

export type NewSvgProps = Omit<Props<'div'>, 'tag'>;

export class FetchSvgComponent extends BaseComponent<'div'> {
  constructor(name: string, props: NewSvgProps = {}) {
    super({ tag: 'div', ...props });
    this.render(name);
  }

  private async render(name: string) {
    const svg = await fetch(`${SVG_PATH}/${name}.svg`);
    const svgText = await svg.text();
    this.element.innerHTML = svgText;
  }
}
