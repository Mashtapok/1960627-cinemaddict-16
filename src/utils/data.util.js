import dayjs from 'dayjs';

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizePopupRealiseDate = (date) => dayjs(date).format('DD MMMM YYYY');

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortDateUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.release.date, taskB.release.date);

  return weight ?? dayjs(taskA.release.date).diff(dayjs(taskB.release.date));
};

export const sortDateDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.release.date, taskB.release.date);

  return weight ?? dayjs(taskB.release.date).diff(dayjs(taskA.release.date));
};

export const sortRating = (taskA, taskB) => {
  const A = Number(taskA.totalRating);
  const B = Number(taskB.totalRating);

  return B - A;
};
