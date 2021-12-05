import dayjs from 'dayjs';
import {createElement} from '../utils/render';

const createCommentTemplate = (comment) => (`<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:MM')}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`);

export default class CommentView {
  #element = null;
  #comment = null;

  constructor(comment) {
    this.#comment = comment;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createCommentTemplate(this.#comment);
  }

  remove() {
    this.#element = null;
  }
}
