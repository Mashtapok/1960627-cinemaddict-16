import FilmCardView from '../view/film-card-view';
import ContentView from '../view/content-view';
import LoadMoreButtonView from '../view/load-more-button-view';
import {render, RenderPosition} from '../utils';
import HeaderProfileView from '../view/header-profile-view';
import SortView from '../view/sort-view';
import NavigationView from '../view/navigation-view';
import FooterStatisticsView from '../view/footer-statistics-view';
import NoFilmsView from '../view/no-films-view';
import PopupView from '../view/popup-view';
import {remove} from '../utils/render';
import FilmCardExtraView from '../view/film-card-extra-view';

const FILMS_COUNT = 12;
const FILMS_LOAD_STEP = 5;

export default class ContentPresenter {
  #contentContainer = null;

  #contentComponent = new ContentView();
  #filmCardComponent = new FilmCardView();
  #filmCardExtraComponent = new FilmCardExtraView();
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #headerProfileComponent = new HeaderProfileView();
  #noFilmsComponent = new NoFilmsView();
  #sortComponent =  new SortView();

  #siteMainElement = document.querySelector('.main');
  #siteHeaderElement = document.querySelector('.header');
  #siteFooterElement = document.querySelector('.footer');
  #bodyElement = document.querySelector('body');
  #siteFooterStatisticsElement = this.#siteFooterElement.querySelector('.footer__statistics');

  #renderedFilmsCount = FILMS_LOAD_STEP;

  #films = [];
  #filters = [];

  constructor(contentContainer) {
    this.#contentContainer = contentContainer;
  }

  init = (films, filters) => {
    this.#films = [...films];
    this.#filters = [...filters];
    // Метод для инициализации (начала работы) модуля,

    render(this.#siteHeaderElement, this.#headerProfileComponent, RenderPosition.BEFOREEND);
    this.#renderSort();
    this.#renderNavigation();
    this.#renderFooterStatistics();
    render(this.#siteMainElement, new ContentView(), RenderPosition.BEFOREEND);

    this.#renderContent();
  }

  #renderSort = () => {
    // Метод для рендеринга сортировки
    render(this.#siteMainElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderFilms = (from, to) => {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов фильма,
    // текущая функция renderFilm в main.js
  }

  #renderNavigation = () => {
    const navigationComponent = new NavigationView(this.#filters);
    render(this.#siteMainElement,navigationComponent, RenderPosition.AFTERBEGIN);
  }

  #renderFooterStatistics = () => {
    const footerStatisticsComponent =  new FooterStatisticsView(this.#films.length);
    render(this.#siteFooterStatisticsElement, footerStatisticsComponent, RenderPosition.BEFOREEND);
  }

  #renderPopup = (film) => {
    const popupComponent = new PopupView(film);
    render(this.#bodyElement, popupComponent, RenderPosition.BEFOREEND);

    const onClosePopup = () => {
      this.#bodyElement.classList.remove('hide-overflow');
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

  #renderFilm = (containerElement, film) => {
    const filmComponent = new FilmCardView(film);
    render(containerElement, filmComponent, RenderPosition.BEFOREEND);

    const onOpenPopup = () => {
      this.#bodyElement.classList.add('hide-overflow');
      this.#renderPopup(film);
    };

    filmComponent.setOpenPopupClickHandler(onOpenPopup);
  };

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
    const filmsContainerElement = this.#siteMainElement.querySelector('.films-list__container');
    const filmsListElement = this.#siteMainElement.querySelector('.films-list');

    render(filmsListElement, this.#loadMoreButtonComponent, RenderPosition.BEFOREEND);

    const onLoadMoreHandler = () => {
      this.#films
        .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_LOAD_STEP)
        .forEach((film) => this.#renderFilm(filmsContainerElement, film));

      this.#renderedFilmsCount += FILMS_LOAD_STEP;

      if (this.#renderedFilmsCount >= this.#films.length) {
        remove(this.#loadMoreButtonComponent);
      }
    };

    this.#loadMoreButtonComponent.setLoadMoreClickHandler(onLoadMoreHandler);
  }

  #renderContent = () => {
    if(this.#films.length === 0) {
      this.#renderNoFilms();
    } else {

      const filmsContainerElement = this.#siteMainElement.querySelector('.films-list__container');

      for (let i = 0; i < Math.min(this.#films.length, FILMS_LOAD_STEP); i++) {
        this.#renderFilm(filmsContainerElement, this.#films[i]);
      }

      this.#renderLoadMoreButton();
      this.#renderExtraFilms();
    }
  }

}
