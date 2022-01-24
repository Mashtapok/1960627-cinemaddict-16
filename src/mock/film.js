import { getRandomInteger } from '../utils';
import {generateComment} from './comment';

const generateTitle = () => {
  const titles = [
    'Star Wars',
    'Titanik',
    'Avangers',
    'Hatiko',
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, ipsa.',
    'ipsum dolor sit amet, consectetur adipisicing elit.',
    'consectetur adipisicing elit. Blanditiis, ipsa',
    'Oscar-winning film, a war drama about two young people, from the creators of timeless classic'
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'sagebrush-trail',
    'the-man-with-the-golden-arm',
    'santa-claus-conquers-the-martians',
    'the-great-flamarion',
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

export const generateFilm = () => ({
  id: getRandomInteger(0, 99999),
  title: generateTitle(),
  description: generateDescription(),
  poster: generatePoster(),
  comments: Array.from({length: getRandomInteger(1, 6)}, generateComment),
  runtime: '1h 36m',
  totalRating: `${getRandomInteger(1, 10)}.${getRandomInteger(0, 9)}`,
  alternativeTitle: 'Laziness Who Sold Themselves',
  ageRating: getRandomInteger(0, 21),
  director: 'Tom Ford',
  writers: [
    'Takeshi Kitano'
  ],
  actors: [
    'Morgan Freeman', 'Leonardo DiCaprio'
  ],
  release: {
    date: new Date(`11 11 19${getRandomInteger(21, 99)}`),
    'release_country': 'Finland'
  },
  genre: [
    'Comedy', 'Drama'
  ],
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: Boolean(getRandomInteger(0, 1))
  }
});
