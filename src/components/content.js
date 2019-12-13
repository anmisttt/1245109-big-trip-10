import {createElement} from '../utils.js';

const createTripContentTemplate = () => {
  return (`<ul class="trip-events__list"></ul>`);
};

export default class ContentComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripContentTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
