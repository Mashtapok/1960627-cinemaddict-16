import {RenderPosition, renderTemplate} from './render';
import {createHeaderProfileTemplate} from './view/header-profile-view';
import {createNavigationTemplate} from './view/navigation-view';
import {createSortTemplate} from './view/sort-view';
import {createContentTemplate} from './view/content-view';
import {createFooterStatisticsTemplate} from './view/footer-statistics-view';
import {createFilmCardTemplate} from './view/film-card-view';
import {createLoadMoreButtonTemplate} from './view/load-more-button-view';
import {createFilmCardExtraTemplate} from './view/film-card-extra-view';
import {createPopupTemplate} from './view/popup-view';
import {generateFilm} from './mock/film';
import {generateFilters} from './utils';

const FILMS_COUNT = 22;
const FILMS_LOAD_STEP = 5;

const films = Array.from({length: FILMS_COUNT}, generateFilm);
const filters = generateFilters(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
const bodyElement = document.querySelector('body');


renderTemplate(siteHeaderElement, createHeaderProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createNavigationTemplate(filters), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createContentTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterStatisticsElement, createFooterStatisticsTemplate(films.length), RenderPosition.BEFOREEND);
renderTemplate(bodyElement, createPopupTemplate(films[0]), RenderPosition.BEFOREEND);

const filmsContainerElement = siteMainElement.querySelector('.films-list__container');
const filmsListElement = siteMainElement.querySelector('.films-list');

for (let i = 0; i < Math.min(films.length, FILMS_LOAD_STEP); i++) {
  renderTemplate(filmsContainerElement, createFilmCardTemplate(films[i]), RenderPosition.BEFOREEND);
}

if (films.length > FILMS_LOAD_STEP) {
  let renderedFilmsCount = FILMS_LOAD_STEP;

  renderTemplate(filmsListElement, createLoadMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsListElement.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', () => {
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_LOAD_STEP)
      .forEach((film) => renderTemplate(filmsContainerElement, createFilmCardTemplate(film), RenderPosition.BEFOREEND));

    renderedFilmsCount += FILMS_LOAD_STEP;

    if (renderedFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

for (let i = 0; i < 2; i++) {
  renderTemplate(filmsListElement, createFilmCardExtraTemplate(), RenderPosition.AFTEREND);
}

// Закрытие popup (временно)
const popupElement = document.querySelector('.film-details');
const closePopupBtnElement = popupElement.querySelector('.film-details__close-btn');
const removePopup = () => {
  popupElement.remove();
  document.removeEventListener('click', removePopup);
};
closePopupBtnElement.addEventListener('click', removePopup);
