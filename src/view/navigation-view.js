import {createFilterTemplate} from './filter-view';

export const createNavigationTemplate = (filters) => {
  const filtersTemplate = filters.map((filter) => createFilterTemplate(filter)).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
       ${filtersTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
