import AbstractComponent from './abstract-component.js';

export default class MainContentComponent extends AbstractComponent {
  getTemplate() {
    return (`<section class="trip-events">
          </section>`);
  }
}
