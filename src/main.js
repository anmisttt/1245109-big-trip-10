import API from './api.js';
import MenuComponent, {MenuItem} from './components/menu.js';
import FilterController from './controllers/filter-controller.js';
import TripController from './controllers/trip-controller.js';
import MainContentComponent from './components/main-content.js';
import StatsComponent from './components/stats.js';
import PointsModel from './models/points.js';
import {render, RenderPosition} from './utils/render.js';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();

const mainTripElement = document.querySelector(`.trip-main`);

const tripControlsElement = mainTripElement.querySelector(`.trip-controls`);

const menuComponent = new MenuComponent();
render(tripControlsElement, menuComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripControllerElement.createPoint();
});

const pageBodyContainer = document.querySelectorAll(`.page-body__container`)[1];
const mainContentElement = new MainContentComponent();
render(pageBodyContainer, mainContentElement, RenderPosition.BEFOREEND);

const statsComponent = new StatsComponent(pointsModel);

render(pageBodyContainer, statsComponent, RenderPosition.BEFOREEND);

const tripControllerElement = new TripController(mainContentElement.getElement(), pointsModel, api);
statsComponent.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statsComponent.hide();
      tripControllerElement.show();
      break;
    case MenuItem.STATS:
      statsComponent.show();
      tripControllerElement.hide();
      break;
  }
});

api.getPoints().then((points) => {
  pointsModel.setPoints(points);
  tripControllerElement.render();
});

export const apiOffersDestinations = Promise.all([api.getDestinations(), api.getOffers()]);
