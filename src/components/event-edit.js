import flatpickr from 'flatpickr';
// import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {generatePlaceholder} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {EventConsts} from '../const.js';

// нужно передавать отсюда информацию в PointsModel, чтобы значения обновлялись сразу после изменения формы

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

const createOffersMap = (offers, type) => {
  return offers.map((offer, index) => {
    return (
      `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index}" 
    type="checkbox" name="event-offer-${type}" ${(offer.isChecked) ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${type}-${index}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`);
  }).join(` `);
};

const createPhotoMap = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join(` `);
};

const createTownsList = (towns) => {
  return towns.map((town) => {
    return (`<option value="${town}"></option>`);
  });
};

const createTypesList = (types, currentType) => {
  return types.map((type) => {
    return (`<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"
  ${currentType.toLowerCase() === type.toLowerCase() ? `checked` : ``}>
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label></div>`);
  }).join(` `);
};


const editTripEventTemplate = (event, externalData) => {
  const {
    type,
    description,
    icon,
    photos,
    price,
    town,
    offers,
    isFavorite
  } = event;

  const offersMap = createOffersMap(Array.from(offers), type);
  const photosMap = createPhotoMap(photos);
  const townsList = createTownsList(EventConsts.Towns);
  const transportTypesList = createTypesList(EventConsts.Types.slice(0, 6), type);
  const activityTypesList = createTypesList(EventConsts.Types.slice(7, 10), type);
  const placeholder = generatePlaceholder(type);

  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

  return (`<form class="event  trip-events__item event--edit" action="#" method="post">
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
                        <label class="event__label  event__type-output"  for="event-destination-1">
                          ${type} ${placeholder}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${town}"  onkeypress="return false" list="destination-list-1">
                        <datalist id="destination-list-1">
                          ${townsList}
                        </datalist>
                      </div>

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                      </div>

                      <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
                      <button class="event__reset-btn" type="reset">${deleteButtonText}</button>

                      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${(isFavorite) ? `checked` : ``}>
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
                      ${(Array.from(offers).length > 0) ? `<section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                        <div class="event__available-offers">
                          ${offersMap} 
                        </div>
                      </section>` : ``}
                      

                      ${(description) ? `<section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${description}</p>

                        <div class="event__photos-container">
                          <div class="event__photos-tape">
                            ${photosMap}
                          </div>
                        </div>
                      </section>` : ``}
                      
                    </section>
                  </form>`);
};

export default class EventEditComponent extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._submitHandler = null;
    this._flatpickr = null;
    this._deleteButtonClickHandler = null;
    this._externalData = DefaultData;
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return editTripEventTemplate(this._event, this._externalData);
  }

  removeElement() {
    if (this._flatpickr) {
      // this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).
    addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    // здесь информация об офферах обновляется
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setEventEditClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  rerender() {
    // если обновлять только иконку и тип, то уйдет проблема с новым ивентом, потому что город не успеет обновиться
    super.rerender();
    this._applyFlatpickr();
    // здесь информация об офферах обновляется
  }

  reset() {
    this._event.town = this.getElement().querySelector(`.event__input--destination`).value;
    this._event.price = this.getElement().querySelector(`.event__input--price`).value;
    this.rerender();
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  getData() {
    const form = this.getElement();

    return new FormData(form);
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
    const startDateElement = this.getElement().querySelector(`#event-start-time-1`);
    this._flatpickr = flatpickr(startDateElement, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      allowInput: true,
      defaultDate: this._event.dateStart,
    });
    const endDateElement = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickr = flatpickr(endDateElement, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      allowInput: true,
      defaultDate: this._event.dateEnd,
    });

  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const dateStart = element.querySelector(`#event-start-time-1`);
    if (dateStart) {
      dateStart.addEventListener(`change`, () => {
        this._event.dateStart = dateStart.value;
      });
    }

    const dateEnd = element.querySelector(`#event-end-time-1`);
    if (dateEnd) {
      dateEnd.addEventListener(`change`, () => {
        this._event.dateEnd = dateEnd.value;
      });
    }

    const offers = element.querySelectorAll(`.event__offer-checkbox`);
    offers.forEach((offer, index) => {
      offer.addEventListener(`click`, () => {
        // из-за того что rerender меняет разметку, а разметка не меняется, ничего не происходит, можно обновить класс
        this._event.offers[index].isChecked = offers[index].checked;
      });
    });

    const types = element.querySelectorAll(`.event__type-input`);
    types.forEach((type)=> {
      type.addEventListener(`change`, () => {
        this._event.type = type.value;
        this._event.icon = `img/icons/${type.value}.png`;
        this.rerender();
      });
    });


    const town = element.querySelector(`.event__input--destination`);
    town.addEventListener(`change`, () => {
      this._event.town = town.value;
    });


    const price = element.querySelector(`.event__input--price`);
    price.addEventListener(`change`, () => {
      this._event.price = price.value;
    });

    const favoriteButton = element.querySelector(`.event__favorite-btn`);
    favoriteButton.addEventListener(`click`, () => {
      this._event.isFavorite = !this._event.isFavorite;
    });
  }
}

