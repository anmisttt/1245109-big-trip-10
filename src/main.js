import TripInfoComponent from './components/trip-info.js';
import MenuComponent from './components/menu.js';
import FilterController from './controllers/filter-controller.js';
import TripController from './controllers/trip-controller.js';
import MainContentComponent from './components/main-content.js';
import PointsModel from './models/point.js';
import {generateEvents} from './mock/event.js';
import {render, RenderPosition} from './utils/render.js';

const EVENT_COUNT = 10;
const events = generateEvents(EVENT_COUNT);
const pointsModel = new PointsModel();
pointsModel.setPoints(events);

const mainTripElement = document.querySelector(`.trip-main`);
const infoElement = mainTripElement.querySelector(`.trip-info`);

render(infoElement, new TripInfoComponent(), RenderPosition.AFTERBEGIN);

const tripControlsElement = mainTripElement.querySelector(`.trip-controls`);
const menuTitleElement = tripControlsElement.querySelector(`h2`);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripControllerElement.createPoint();
});

render(menuTitleElement, new MenuComponent(), RenderPosition.BEFOREEND);

const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

const pageBodyContainer = document.querySelectorAll(`.page-body__container`)[1];
const mainContentElement = new MainContentComponent();
render(pageBodyContainer, mainContentElement, RenderPosition.BEFOREEND);

const tripControllerElement = new TripController(mainContentElement.getElement(), pointsModel);
tripControllerElement.render();

