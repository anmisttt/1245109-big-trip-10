import TripInfoComponent from './components/trip-info.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortComponent from './components/sort.js';
import ContentComponent from './components/content.js';
import EventComponent from './components/event.js';
import EventEditComponent from './components/event-edit.js';
import {generateEvents} from './mock/event.js';
import {render, RenderPosition} from './utils.js';

const EVENT_COUNT = 10;
const events = generateEvents(EVENT_COUNT);

const mainTripElement = document.querySelector(`.trip-main`);
const infoElement = mainTripElement.querySelector(`.trip-info`);

render(infoElement, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = mainTripElement.querySelector(`.trip-controls`);
const menuTitleElement = tripControlsElement.querySelector(`h2`);

render(menuTitleElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const mainPageElement = document.querySelector(`.page-main`);
const tripEventsElement = mainPageElement.querySelector(`.trip-events`);

render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const contentComponent = new ContentComponent();
render(tripEventsElement, contentComponent.getElement(), RenderPosition.BEFOREEND);

const tripContentElement = contentComponent.getElement().querySelector(`.trip-events__list`);
render(tripContentElement, new EventEditComponent(events[0]).getElement(), RenderPosition.BEFOREEND);

events.forEach((_, index) => {
  render(tripContentElement, new EventComponent(events[index]).getElement(), RenderPosition.BEFOREEND);
});

