import {createElement} from '../utils.js';

const noPointsTemplate = () => {
  return (`<p class="trip-events__msg">Click New Event to create your first point</p>`);
};

export default class NoPointsComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return noPointsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeTemplate() {
    this._element = null;
  }
}
