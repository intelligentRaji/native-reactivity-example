import { BaseComponent, Props } from '../utils/base-component';

const SVG_PATH = '/public/vite.sprite.svg';

export type SvgComponentProps = Omit<Props<'div'>, 'tag'>;

export class SvgComponent extends BaseComponent {
  constructor(svgId: string, props: SvgComponentProps = {}) {
    super({ tag: 'div', ...props });

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${SVG_PATH}#${svgId}`);

    svg.append(use);
    this.element.append(svg);
  }
}
