import ContentComponent from '../components/content.js';
import NoPointsComponent from '../components/no-points.js';
import SortComponent, {SortType} from '../components/sort.js';
import {render, RenderPosition} from '../utils/render.js';
import PointController from './point-controller.js';

const renderEvents = (events, container, onDataChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange);
    pointController.renderEvent(event);
    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._contentComponent = new ContentComponent();
    this._noPintsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._onDataChange = this._onDataChange.bind(this);
  }
  render(events) {
    const container = this._container;
    render(container, this._contentComponent, RenderPosition.BEFOREEND);

    const tripContentElement = this._contentComponent.getElement();

    if (events.length === 0) {
      render(tripContentElement, this._noPintsComponent, RenderPosition.BEFOREEND);
    }

    renderEvents(events, tripContentElement, this._onDataChange);

    render(tripContentElement, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.changeSortTypeHandler((sortType) => {
      let sortedEvents = [];
      switch (sortType) {
        case SortType.TIME:
          sortedEvents = events.slice().sort((a, b) => a.timeStart - b.timeStart);
          break;
        case SortType.PRICE:
          sortedEvents = events.slice().sort((a, b) => a.price - b.price);
          break;
        case SortType.DEFAULT:
          sortedEvents = events.slice(0, events.length());
          break;
      }
      tripContentElement.innerHTML = ``;
      renderEvents(sortedEvents, tripContentElement, this._onDataChange);
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.renderEvent(this._events[index]);
  }

}
