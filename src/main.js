import { generateFilters } from './utils';
import { generateFilm } from './mock/film';
import ContentPresenter from './presenter/content-presenter';

const FILMS_COUNT = 12;

const films = Array.from({length: FILMS_COUNT}, generateFilm);
const filters = generateFilters(films);

const contentPresenter = new ContentPresenter(films);

contentPresenter.init(films, filters);

