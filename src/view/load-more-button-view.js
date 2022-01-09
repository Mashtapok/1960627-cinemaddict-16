import AbstractView from './abstract-view';

const createLoadMoreButtonTemplate = () => (
  '<div><button class="films-list__show-more">Show more</button></div>'
);

export default class LoadMoreButtonView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createLoadMoreButtonTemplate();
  }


  setLoadMoreClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#loadMoreClickHandler);
  }

  #loadMoreClickHandler = (event) => {
    event.preventDefault();
    this._callback.click();
  }
}
