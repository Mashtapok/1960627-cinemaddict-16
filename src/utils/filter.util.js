const filmToFilterMap = {
  all: (films) => ({count: films.length, label: 'All movies'}),
  watchlist: (films) => ({count: films.filter((film) => film.userDetails.watchlist).length, label: 'Watchlist'}),
  history: (films) => ({count: films.filter((film) => film.userDetails.alreadyWatched).length, label: 'History'}),
  favorites: (films) => ({count: films.filter((film) => film.userDetails.favorite).length, label: 'Favourites'}),
};

export const generateFilters = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({name: filterName, info: countFilms(films)})
);
