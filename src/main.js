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

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
const bodyElement = document.querySelector('body');


renderTemplate(siteHeaderElement, createHeaderProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createNavigationTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createContentTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterStatisticsElement, createFooterStatisticsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(bodyElement, createPopupTemplate(), RenderPosition.BEFOREEND);

const filmsContainerElement = siteMainElement.querySelector('.films-list__container');
const filmsListElement = siteMainElement.querySelector('.films-list');

for (let i = 0; i < 5; i++) {
  renderTemplate(filmsContainerElement, createFilmCardTemplate(), RenderPosition.AFTERBEGIN);
}

renderTemplate(filmsListElement, createLoadMoreButtonTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < 2; i++) {
  renderTemplate(filmsListElement, createFilmCardExtraTemplate(), RenderPosition.AFTEREND);
}
