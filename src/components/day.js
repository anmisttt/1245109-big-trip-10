import AbstractComponent from './abstract-component.js';
import {printDate} from './trip-info.js';

export default class DayComponent extends AbstractComponent {
  constructor(date, counter) {
    super();
    this._date = date;
    this._counter = counter;
  }
  getTemplate() {
    return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${this._counter}</span>
                <time class="day__date" datetime="${this._dateStart}">${printDate(this._date)}</time>
              </div> </li>`);
  }

}
