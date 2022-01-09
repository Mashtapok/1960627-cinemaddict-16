import FilterView from './filter-view';
import AbstractView from './abstract-view';

const createNavigationTemplate = (filters) => {
  const filtersTemplate = filters.map((filter) => new FilterView(filter).template).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
       ${filtersTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class NavigationView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createNavigationTemplate(this.#filters);
  }
}
