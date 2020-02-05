import {getInterval, getTime, generatePlaceholder} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createOffersMap = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`);
  }).join(`\n`);
};

const createTripEventTemplate = (event) => {
  const {
    icon,
    type,
    town,
    price,
    offers,
    dateStart,
    dateEnd
  } = event;

  const offersMap = createOffersMap(Array.from(offers).filter((offer) => offer.isChecked === true).slice(0, 3));
  const interval = getInterval(dateStart, dateEnd);
  const timeStart = getTime(dateStart);
  const timeEnd = getTime(dateEnd);
  const placeholder = generatePlaceholder(type);

  return (`<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src=${icon} alt="Event type icon">
                    </div>
                    <h3 class="event__title">${type[0].toUpperCase() + type.slice(1)} ${placeholder} ${town}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
                        &mdash;
                        <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
                      </p>
                      <p class="event__duration">${interval}</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      ${offersMap}
                    </ul>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`);
};

export default class EventComponent extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
  }

  setEventClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
  }

  removeEventClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
    .removeEventListener(`click`, handler);
  }
}
