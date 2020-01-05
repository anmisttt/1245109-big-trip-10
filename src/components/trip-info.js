import AbstractComponent from './abstract-component.js';

export default class TripInfoComponent extends AbstractComponent {
  getTemplate() {
    return (`<div class="trip-info__main">
          <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

          <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
        </div>`);
  }
}
