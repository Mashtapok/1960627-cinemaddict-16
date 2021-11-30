import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const createFilmCardTemplate = ({
  title,
  totalRating,
  release,
  runtime,
  genre,
  comments,
  description,
  poster,
  userDetails
}) => {
  const year = release.date
    ? dayjs(release.date).format('YYYY')
    : '';

  const alreadyWatchedClassName = userDetails.already_watched ?
    'film-card__controls-item--active' : '';

  const isFavouriteClassName = userDetails.favorite ?
    'film-card__controls-item--active'
    : '';

  const inWatchlistClassName = userDetails.watchlist ?
    'film-card__controls-item--active'
    : '';

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${runtime}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="./images/posters/${poster}.jpg" alt="постер" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${comments.length}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${inWatchlistClassName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${isFavouriteClassName}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
