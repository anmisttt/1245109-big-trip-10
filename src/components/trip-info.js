import {createElement} from '../utils.js';

const createTripInfoTemplate = () => {
  return (`<div class="trip-info__main">
          <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

          <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
        </div>`);
};

export default class TripInfoComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  removeElement() {
    this._element = null;
  }
}
