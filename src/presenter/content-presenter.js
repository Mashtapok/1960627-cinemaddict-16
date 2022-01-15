import FilmCardView from '../view/film-card-view';
import ContentView from '../view/content-view';
import LoadMoreButtonView from '../view/load-more-button-view';

export default class ContentPresenter {
  #contentContainer = null;

  #filmCardComponent = new FilmCardView();
  #contentComponent = new ContentView();
  #loadMoreButtonComponent = new LoadMoreButtonView();

  #films = [];

  constructor(contentContainer) {
    this.#contentContainer = contentContainer;
  }

  init = (films) => {
    this.#films = [...films];
    // Метод для инициализации (начала работы) модуля,
  }

  #renderSort = () => {
    // Метод для рендеринга сортировки
  }

  #renderFilm = () => {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов фильма,
    // текущая функция renderFilm в main.js
  }

  #renderFilms = () => {
    // Метод для рендеринга N-фильмов за раз
  }

  #renderNoFilms = () => {
    // Метод для рендеринга заглушки
  }

  #renderLoadMoreButton = () => {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа,
    // сейчас в main.js является частью renderBoard
  }

  #renderBoard = () => {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
