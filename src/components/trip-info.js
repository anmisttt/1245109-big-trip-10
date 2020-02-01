import AbstractSmartComponent from './abstract-smart-component.js';
import moment from 'moment';

const countPrice = (points) => {
  const pointsPrice = points.reduce((acc, point) => acc + point.price, 0);
  let offersPrice = 0;
  points.map((point) => point.offers).forEach((offers) => offers.forEach((offer) =>{
    if (offer.isChecked === true) {
      offersPrice += offer.price;
    }
  }));
  return (pointsPrice + offersPrice);
};

export const printDate = (date) => {
  return moment(date).format(`DD MMM`);
};

const createTripInfoTemplate = (pointsModel) => {
  const points = pointsModel.getPoints().sort((a, b) => a.dateStart - b.dateEnd);
  const length = points.length;
  return (`<section class="trip-main__trip-info  trip-info">
            <div class = "trip-info__main">
              <h1 class = "trip-info__title" > ${(length > 0) ? points[0].town : ` `} &mdash; ${(length === 3) ? points[1].town : `...`} &mdash;
            ${(length > 0) ? points[length - 1].town : ` `} </h1>

              <p class = "trip-info__dates" > ${(length > 0) ? printDate(points[0].dateStart) : ` `} &nbsp; &mdash; &nbsp;
            ${(length > 0) ? printDate(points[length - 1].dateEnd) : ` `} </p> 
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${(length > 0) ? countPrice(points) : `0`}</span>
            </p>
          </section>`);
};

export default class TripInfoComponent extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }
  getTemplate() {
    return createTripInfoTemplate(this._pointsModel);
  }

  rerender(pointsModel) {
    this._pointsModel = pointsModel;
    super.rerender();
  }

  recoveryListeners() {}
}
