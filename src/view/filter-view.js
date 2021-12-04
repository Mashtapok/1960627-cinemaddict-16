import {createElement} from '../utils/render';

const createFilterTemplate = (filter) => {
  const { name, info } = filter;
  const counterTemplate = name !== 'all' ? `<span class="main-navigation__item-count">${info.count}</span>` : '';

  return `<a href="#${name}" class="main-navigation__item">${info.label} ${counterTemplate}</a>`;
};

export default class FilterView {
  #element = null;
  #filter = null;

  constructor(filter) {
    this.#filter = filter;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }

  remove() {
    this.#element = null;
  }
}
