import FilterView from './filter-view';
import {createElement} from '../utils/render';

const createNavigationTemplate = (filters) => {
  const filtersTemplate = filters.map((filter) => new FilterView(filter).template).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
       ${filtersTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class NavigationView {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNavigationTemplate(this.#filters);
  }

  remove() {
    this.#element = null;
  }
}
