import {createTripInfoTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/sort.js';
import {createTripContentTemplate} from './components/content.js';
import {createTripEventTemplate} from './components/event.js';
import {editTripEventTemplate} from './components/event-edit.js';
import {generateEvents} from './mock/event.js';

const EVENT_COUNT = 10;
const events = generateEvents(EVENT_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
const mainTripElement = document.querySelector(`.trip-main`);
const infoElement = mainTripElement.querySelector(`.trip-info`);

render(infoElement, createTripInfoTemplate(), `afterbegin`);

const tripControlsElement = mainTripElement.querySelector(`.trip-controls`);
const menuTitleElement = tripControlsElement.querySelector(`h2`);

render(menuTitleElement, createMenuTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate());

const mainPageElement = document.querySelector(`.page-main`);
const tripEventsElement = mainPageElement.querySelector(`.trip-events`);

render(tripEventsElement, createTripSortTemplate());
render(tripEventsElement, createTripContentTemplate());

const tripContentElement = tripEventsElement.querySelector(`.trip-events__list`);
render(tripContentElement, editTripEventTemplate(events[0]), `beforebegin`);

events.forEach((_, index) => {
  render(tripContentElement, createTripEventTemplate(events[index]));
});

