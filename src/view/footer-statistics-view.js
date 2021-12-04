import {createElement} from '../utils/render';

const createFooterStatisticsTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class FooterStatisticsView {
  #element = null;
  #filmsCount = null;

  constructor(filmsCount) {
    this.#filmsCount = filmsCount;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#filmsCount);
  }

  remove() {
    this.#element = null;
  }
}
