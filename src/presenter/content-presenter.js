import ContentView from '../view/content-view';
import LoadMoreButtonView from '../view/load-more-button-view';
import {render, RenderPosition} from '../utils';
import HeaderProfileView from '../view/header-profile-view';
import SortView from '../view/sort-view';
import NavigationView from '../view/navigation-view';
import FooterStatisticsView from '../view/footer-statistics-view';
import NoFilmsView from '../view/no-films-view';
import {remove} from '../utils/render';
import FilmCardExtraView from '../view/film-card-extra-view';
import FilmPresenter from './film-presenter';
import {SortType} from '../utils/const';
import {sortDateDown, sortRating} from '../utils/data.util';

const FILMS_COUNT = 12;
const FILMS_LOAD_STEP = 5;

export default class ContentPresenter {
  #contentContainer = null;

  #filmCardExtraComponent = new FilmCardExtraView();
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #headerProfileComponent = new HeaderProfileView();
  #noFilmsComponent = new NoFilmsView();
  #sortComponent = new SortView();
  #filmPresenter = new Map();

  #siteMainElement = document.querySelector('.main');
  #siteHeaderElement = document.querySelector('.header');
  #siteFooterElement = document.querySelector('.footer');
  #siteFooterStatisticsElement = this.#siteFooterElement.querySelector('.footer__statistics');

  #renderedFilmsCount = FILMS_LOAD_STEP;

  #films = [];
  #filters = [];
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];

  constructor(contentContainer) {
    this.#contentContainer = contentContainer;
  }

  init = (films, filters) => {
    this.#films = [...films];
    this.#filters = [...filters];
    this.#sourcedFilms = [...films];

    render(this.#siteHeaderElement, this.#headerProfileComponent, RenderPosition.BEFOREEND);
    this.#renderSort();
    this.#renderNavigation();
    this.#renderFooterStatistics();
    render(this.#siteMainElement, new ContentView(), RenderPosition.BEFOREEND);

    this.#renderContent();
  }

  #renderSort = () => {
    render(this.#siteMainElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortDateDown);
        break;
      case SortType.RATING:
        this.#films.sort(sortRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }
    this.#currentSortType = sortType;
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderFilmsList();
  }

  #renderNavigation = () => {
    const navigationComponent = new NavigationView(this.#filters);
    render(this.#siteMainElement, navigationComponent, RenderPosition.AFTERBEGIN);
  }

  #renderFooterStatistics = () => {
    const footerStatisticsComponent = new FooterStatisticsView(this.#films.length);
    render(this.#siteFooterStatisticsElement, footerStatisticsComponent, RenderPosition.BEFOREEND);
  }

  #renderFilm = (film) => {
    const filmsContainerElement = this.#siteMainElement.querySelector('.films-list__container');
    const filmPresenter = new FilmPresenter(filmsContainerElement, film);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderNoFilms = () => {
    render(this.#siteMainElement, this.#noFilmsComponent, RenderPosition.BEFOREEND);
  }

  #renderExtraFilms = () => {
    const filmsListElement = this.#siteMainElement.querySelector('.films-list');

    for (let i = 0; i < 2; i++) {
      render(filmsListElement, this.#filmCardExtraComponent, RenderPosition.AFTEREND);
    }
  }

  #renderLoadMoreButton = () => {
    const filmsListElement = this.#siteMainElement.querySelector('.films-list');
    render(filmsListElement, this.#loadMoreButtonComponent, RenderPosition.BEFOREEND);

    const onLoadMoreHandler = () => {
      this.#films
        .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_LOAD_STEP)
        .forEach((film) => this.#renderFilm(film));

      this.#renderedFilmsCount += FILMS_LOAD_STEP;

      if (this.#renderedFilmsCount >= this.#films.length) {
        remove(this.#loadMoreButtonComponent);
      }
    };

    this.#loadMoreButtonComponent.setLoadMoreClickHandler(onLoadMoreHandler);
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #renderFilmsList = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILMS_LOAD_STEP));

    if (this.#films.length > FILMS_LOAD_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_LOAD_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #renderContent = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
    } else {

      this.#renderFilmsList();
      this.#renderLoadMoreButton();
      this.#renderExtraFilms();
    }
  }

}
