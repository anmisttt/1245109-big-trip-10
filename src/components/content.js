import AbstractComponent from './abstract-component.js';

export default class ContentComponent extends AbstractComponent {
  getTemplate() {
    return (`<ul class="trip-events__list"> </ul>`);
  }
}
