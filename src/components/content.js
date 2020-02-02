import AbstractComponent from './abstract-component.js';

export default class ContentComponent extends AbstractComponent {
  getTemplate() {
    return (`<ul class="trip-days"> </ul>`);
  }
}
