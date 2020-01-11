// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import 'flatpickr/dist/themes/light.css';
import {printDate} from '../utils/common.js';
import {generateDescription, generateOffers} from '../mock/event.js';
import AbstractSmartComponent from './abstract-smart-component.js';
// import {relativeTimeThreshold} from 'moment';

const createOffersMap = (offers) => {
  return offers.map((offer) => {
    return (
      `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" 
    type="checkbox" name="event-offer-train">
    <label class="event__offer-label" for="event-offer-train-1">
    <span class="event__offer-title">${offer}</span>
    </label>
    </div>`);
  }).join(` `);
};

const createPhotoMap = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(` `);
};

const createTownsList = (towns) => {
  return towns.map((town) => {
    return (`<option value="${town}"></option>`);
  });
};

const createTypesList = (types) => {
  return types.map((type) => {
    return (`<div class="event__type-item">
  <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}">${type}</label></div>`);
  }).join(` `);
};

const editTripEventTemplate = (event) => {
  const {
    transportTypes,
    activityTypes,
    description,
    type,
    icon,
    photos,
    price,
    towns,
    town,
    offers,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd
  } = event;

  const offersMap = createOffersMap(Array.from(offers));
  const photosMap = createPhotoMap(photos);
  const townsList = createTownsList(towns);
  const transportTypesList = createTypesList(transportTypes);
  const activityTypesList = createTypesList(activityTypes);

  return (`<form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="${icon}" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                        <div class="event__type-list">
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Transfer</legend>
                            ${transportTypesList}
                          </fieldset>
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Activity</legend>
                            ${activityTypesList}
                          </fieldset>
                        </div>
                      </div>

                      <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${type}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${town}" list="destination-list-1">
                        <datalist id="destination-list-1">
                          ${townsList}
                        </datalist>
                      </div>

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${printDate(dateStart)} ${timeStart}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${printDate(dateEnd)} ${timeEnd}">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                      </div>

                      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                      <button class="event__reset-btn" type="reset">Delete</button>

                      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

                      <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                      </button>
                    </header>

                    <section class="event__details">

                      <section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                        <div class="event__available-offers">
                          ${offersMap}
                        </div>
                      </section>

                      <section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${description}</p>

                        <div class="event__photos-container">
                          <div class="event__photos-tape">
                            ${photosMap}
                          </div>
                        </div>
                      </section>
                    </section>
                  </form>`);
};

export default class EventEditComponent extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._submitHandler = null;
  }

  getTemplate() {
    return editTripEventTemplate(this._event);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).
    addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  reset() {
    // this._event.type = this.getElement().querySelector(`.event__type-output`);
    this._event.town = this.getElement().querySelector(`.event__input--destination`).value;
    this._event.price = this.getElement().querySelector(`.event__input--price`).value;
    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const types = element.querySelectorAll(`.event__type-input`);

    types.forEach((type)=> {
      type.addEventListener(`click`, () => {
        this._event.type = type.value;
        this._event.icon = `img/icons/${type.value}.png`;
        this._event.offers = new Set(generateOffers(this._event.offersList));
        this.rerender();
      });
    });

    const town = element.querySelector(`.event__input--destination`);
    town.addEventListener(`change`, () => {
      this._event.town = town.value;
      this._event.description = new Array(generateDescription(this._event.descriptionList));
      this.rerender();
    });


    const price = element.querySelector(`.event__input--price`);
    price.addEventListener(`change`, () => {
      this._event.price = price.value;
      this.rerender();
    });
  }
}

