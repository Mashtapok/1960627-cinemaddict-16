import {getRandomInteger} from '../utils';

export const generateComment = () => {
  const emotions = ['smile', 'angry', 'puke', 'sleeping'];
  const texts = ['Крутой фильм!', 'Фу, ужасно!'];

  return {
    text: texts[getRandomInteger(0, texts.length - 1)],
    emotion: emotions[getRandomInteger(0, emotions.length - 1)],
    author: `Вася${getRandomInteger(1,100)}`,
    date: new Date()
  };
};
