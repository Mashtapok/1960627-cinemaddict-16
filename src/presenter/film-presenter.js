import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';
import {render, RenderPosition} from '../utils';
import {remove} from '../utils/render';


export default class FilmPresenter {
  #bodyElement = document.querySelector('body');

  #filmListContainer = null;
  #filmComponent = null;
  #popupComponent = null;

  #film = null;

  constructor(filmListContainer, film) {
    this.#filmListContainer = filmListContainer;
    this.#popupComponent = new PopupView(film);
  }

  init = (film) => {
    this.#film = film;

    this.#filmComponent = new FilmCardView(film);

    render(this.#filmListContainer, this.#filmComponent, RenderPosition.BEFOREEND);

    this.#filmComponent.setOpenPopupClickHandler(this.#handleOpenPopup);
  }

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  }

  #renderPopup = () => {
    render(this.#bodyElement, this.#popupComponent, RenderPosition.BEFOREEND);

    const onClosePopup = () => {
      this.#bodyElement.classList.remove('hide-overflow');
      remove(this.#popupComponent);
    };

    const onEscKeyDown = (event) => {
      if (event.key === 'Esc' || event.key === 'Escape') {
        event.preventDefault();
        onClosePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#popupComponent.setClosePopupClickHandler(onClosePopup);
    document.addEventListener('keydown', onEscKeyDown);
  };

  #handleOpenPopup = () => {
    this.#bodyElement.classList.add('hide-overflow');
    this.#renderPopup();
  };
}
