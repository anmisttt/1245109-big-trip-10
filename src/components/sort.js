import AbstractSmartComponent from './abstract-smart-component.js';

export const SortType = {
  TIME: `Time`,
  PRICE: `Price`,
  EVENT: `Event`,
};

const createTripSortTemplate = (currentSortType) => {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <span class="trip-sort__item  trip-sort__item--day">Day</span>

            <div class="trip-sort__item  trip-sort__item--event">
              <input data-sort-type="${SortType.EVENT}" id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" ${(currentSortType === SortType.EVENT) ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input data-sort-type="${SortType.TIME}" id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${(currentSortType === SortType.TIME) ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-time">
                Time
                <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>
              </label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input data-sort-type="${SortType.PRICE}" id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${(currentSortType === SortType.PRICE) ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-price">
                Price
                <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>
              </label>
            </div>

            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
          </form>`);
};

export default class SortComponent extends AbstractSmartComponent {
  constructor() {
    super();

    this._currenSortType = SortType.EVENT;
  }

  getTemplate() {
    return createTripSortTemplate(this._currenSortType);
  }

  changeSortTypeHandler(handler) {
    this.getElement().querySelectorAll(`.trip-sort__input`).forEach((sort) => sort.addEventListener(`click`, (evt) => {
      evt.preventDefault();


      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;


      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    }));
  }

  getSortTypeHandler(handler) {
    this.getElement().querySelectorAll(`.trip-sort__input`).forEach((sort) => sort.addEventListener(`click`, (evt) => {
      evt.preventDefault();


      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;


      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    }));
  }

  recoveryListeners() {}
}
