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
import {remove} from './utils/render';

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
  render(siteHeaderElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
  render(siteMainElement, new SortView(), RenderPosition.AFTERBEGIN);
  render(siteMainElement, new NavigationView(filters), RenderPosition.AFTERBEGIN);
  render(siteFooterStatisticsElement, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);
};

const renderBoard = () => {
  if(films.length === 0) {
    render(siteMainElement, new NoFilmsView(), RenderPosition.BEFOREEND);
  } else {
    render(siteMainElement, new ContentView(), RenderPosition.BEFOREEND);

    const filmsContainerElement = siteMainElement.querySelector('.films-list__container');
    const filmsListElement = siteMainElement.querySelector('.films-list');

    const renderPopup = (film) => {
      const popupComponent = new PopupView(film);

      render(bodyElement, popupComponent, RenderPosition.BEFOREEND);

      const onClosePopup = () => {
        bodyElement.classList.remove('hide-overflow');
        remove(popupComponent);
      };

      const onEscKeyDown = (event) => {
        if (event.key === 'Esc' || event.key === 'Escape') {
          event.preventDefault();
          onClosePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      popupComponent.setClosePopupClickHandler(onClosePopup);
      document.addEventListener('keydown', onEscKeyDown);
    };

    const renderFilm = (containerElement, film) => {
      const filmComponent = new FilmCardView(film);
      render(containerElement, filmComponent, RenderPosition.BEFOREEND);

      const onOpenPopup = () => {
        bodyElement.classList.add('hide-overflow');
        renderPopup(film);
      };

      filmComponent.setOpenPopupClickHandler(onOpenPopup);
    };

    for (let i = 0; i < Math.min(films.length, FILMS_LOAD_STEP); i++) {
      renderFilm(filmsContainerElement, films[i]);
    }

    if (films.length > FILMS_LOAD_STEP) {
      let renderedFilmsCount = FILMS_LOAD_STEP;

      const loadMoreButtonComponent = new LoadMoreButtonView();

      render(filmsListElement, loadMoreButtonComponent, RenderPosition.BEFOREEND);

      const onLoadMore = () => {
        films
          .slice(renderedFilmsCount, renderedFilmsCount + FILMS_LOAD_STEP)
          .forEach((film) => renderFilm(filmsContainerElement, film));

        renderedFilmsCount += FILMS_LOAD_STEP;

        if (renderedFilmsCount >= films.length) {
          remove(loadMoreButtonComponent);
        }
      };

      loadMoreButtonComponent.setLoadMoreClickHandler(onLoadMore);
    }

    for (let i = 0; i < 2; i++) {
      render(filmsListElement, new FilmCardExtraView(), RenderPosition.AFTEREND);
    }
  }
};

renderLayout();
renderBoard();
