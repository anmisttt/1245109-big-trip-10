import TripInfoComponent from './components/trip-info.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortComponent from './components/sort.js';
import TripControllerComponent from './controllers/trip-controller.js';
import {generateEvents} from './mock/event.js';
import {render, RenderPosition} from './utils/render.js';

const EVENT_COUNT = 10;
const events = generateEvents(EVENT_COUNT);


const mainTripElement = document.querySelector(`.trip-main`);
const infoElement = mainTripElement.querySelector(`.trip-info`);

render(infoElement, new TripInfoComponent(), RenderPosition.AFTERBEGIN);

const tripControlsElement = mainTripElement.querySelector(`.trip-controls`);
const menuTitleElement = tripControlsElement.querySelector(`h2`);

render(menuTitleElement, new MenuComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FilterComponent(), RenderPosition.BEFOREEND);

const mainPageElement = document.querySelector(`.page-main`);
const tripEventsElement = mainPageElement.querySelector(`.trip-events`);

render(tripEventsElement, new SortComponent(), RenderPosition.BEFOREEND);

const tripControllerElement = new TripControllerComponent(tripEventsElement);
tripControllerElement.render(events);

