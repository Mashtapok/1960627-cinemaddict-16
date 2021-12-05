import {render, RenderPosition, generateFilters} from './utils';
import {generateFilm} from './mock/film';
import HeaderProfileView from './view/header-profile-view';
import NavigationView from './view/navigation-view';
import SortView from './view/sort-view';
import ContentView from './view/content-view';
import FooterStatisticsView from './view/footer-statistics-view';
import FilmCardView from './view/film-card-view';
import LoadMoreButtonView from './view/load-more-button-view';
import FilmCardExtraView from './view/film-card-extra-view';
import PopupView from './view/popup-view';
import NoFilmsView from './view/no-films-view';

const FILMS_COUNT = 12;
const FILMS_LOAD_STEP = 5;

const films = Array.from({length: FILMS_COUNT}, generateFilm);
const filters = generateFilters(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const bodyElement = document.querySelector('body');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const renderLayout = () => {
  render(siteHeaderElement, new HeaderProfileView().element, RenderPosition.BEFOREEND);
  render(siteMainElement, new SortView().element, RenderPosition.AFTERBEGIN);
  render(siteMainElement, new NavigationView(filters).element, RenderPosition.AFTERBEGIN);
  render(siteFooterStatisticsElement, new FooterStatisticsView(films.length).element, RenderPosition.BEFOREEND);
};

const renderBoard = () => {
  if(films.length === 0) {
    render(siteMainElement, new NoFilmsView().element, RenderPosition.BEFOREEND);
  } else {
    render(siteMainElement, new ContentView().element, RenderPosition.BEFOREEND);

    const filmsContainerElement = siteMainElement.querySelector('.films-list__container');
    const filmsListElement = siteMainElement.querySelector('.films-list');

    const renderPopup = (film) => {
      const popupComponent = new PopupView(film);
      const closePopupBtnElement = popupComponent.element.querySelector('.film-details__close-btn');

      render(bodyElement, popupComponent.element, RenderPosition.BEFOREEND);

      const onClosePopup = () => {
        closePopupBtnElement.removeEventListener('click', onClosePopup);
        bodyElement.classList.remove('hide-overflow');
        popupComponent.element.remove();
        popupComponent.remove();
      };

      const onEscKeyDown = (event) => {
        if (event.key === 'Esc' || event.key === 'Escape') {
          event.preventDefault();
          onClosePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      closePopupBtnElement.addEventListener('click', onClosePopup);
      document.addEventListener('keydown', onEscKeyDown);
    };

    const renderFilm = (containerElement, film) => {
      const filmComponent = new FilmCardView(film);
      const filmLinkElement = filmComponent.element.querySelector('.film-card__link');
      render(containerElement, filmComponent.element, RenderPosition.BEFOREEND);

      const onOpenPopup = () => {
        bodyElement.classList.add('hide-overflow');
        renderPopup(film);
      };

      filmLinkElement.addEventListener('click', onOpenPopup);
    };

    for (let i = 0; i < Math.min(films.length, FILMS_LOAD_STEP); i++) {
      renderFilm(filmsContainerElement, films[i]);
    }

    if (films.length > FILMS_LOAD_STEP) {
      let renderedFilmsCount = FILMS_LOAD_STEP;

      const loadMoreButtonComponent = new LoadMoreButtonView();

      render(filmsListElement, loadMoreButtonComponent.element, RenderPosition.BEFOREEND);

      loadMoreButtonComponent.element.addEventListener('click', () => {
        films
          .slice(renderedFilmsCount, renderedFilmsCount + FILMS_LOAD_STEP)
          .forEach((film) => renderFilm(filmsContainerElement, film));

        renderedFilmsCount += FILMS_LOAD_STEP;

        if (renderedFilmsCount >= films.length) {
          loadMoreButtonComponent.element.remove();
          loadMoreButtonComponent.remove();
        }
      });
    }

    for (let i = 0; i < 2; i++) {
      render(filmsListElement, new FilmCardExtraView().element, RenderPosition.AFTEREND);
    }
  }
};

renderLayout();
renderBoard();
