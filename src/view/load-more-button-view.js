import {createElement} from '../utils/render';

const createLoadMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class LoadMoreButtonView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createLoadMoreButtonTemplate();
  }

  remove() {
    this.#element = null;
  }
}
