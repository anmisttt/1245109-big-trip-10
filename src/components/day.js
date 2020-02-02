import AbstractComponent from './abstract-component.js';
import moment from 'moment';

export default class DayComponent extends AbstractComponent {
  constructor(date, counter) {
    super();
    this._date = date;
    this._counter = counter;
  }
  getTemplate() {
    return (`<li class="trip-days__item  day">
             ${(this._date !== `false`) ? `<div class="day__info">
                <span class="day__counter">${this._counter}</span>
                <time class="day__date" datetime="${this._date}">${moment(this._date, `DD/MM/YYYY`).format(`DD MMM`)}</time>` : `` }
              </div><ul class="trip-events__list"></ul> </li>`);
  }

}
