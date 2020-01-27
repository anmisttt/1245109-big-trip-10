import AbstractSmartComponent from './abstract-smart-component.js';

const countPrice = (points) => {
  return points.reduce((acc, point) => acc + point.price, 0);
};

const createTripInfoTemplate = (pointsModel) => {
  const points = pointsModel.getPoints();
  const length = points.length;
  return (`<section class="trip-main__trip-info  trip-info">
            <div class = "trip-info__main">
              <h1 class = "trip-info__title" > ${(length > 0) ? points[0].town : ` `} &mdash; ${(length === 3) ? points[1].town : `...`} &mdash;
            ${(length > 0) ? points[length - 1].town : ` `} </h1>

              <p class = "trip-info__dates" > Mar 18 &nbsp; &mdash; &nbsp;
            21 </p> 
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
