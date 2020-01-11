import ContentComponent from '../components/content.js';
import NoPointsComponent from '../components/no-points.js';
import SortComponent, {SortType} from '../components/sort.js';
import {render, RenderPosition} from '../utils/render.js';
import PointController from './point-controller.js';

const renderEvents = (events, container, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
    pointController.renderEvent(event);
    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._events = [];
    this._container = container;
    this._contentComponent = new ContentComponent();
    this._noPintsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._showedEvents = [];
  }
  render(events) {
    this._events = events;
    const container = this._container;
    render(container, this._contentComponent, RenderPosition.BEFOREEND);

    const tripContentElement = this._contentComponent.getElement();

    if (this._events.length === 0) {
      render(tripContentElement, this._noPintsComponent, RenderPosition.BEFOREEND);
    }

    this._showedEvents = renderEvents(this._events, tripContentElement, this._onDataChange, this._onViewChange);

    render(tripContentElement, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.changeSortTypeHandler((sortType) => {
      let sortedEvents = [];
      switch (sortType) {
        case SortType.TIME:
          sortedEvents = this._events.slice().sort((a, b) => a.timeStart - b.timeStart);
          break;
        case SortType.PRICE:
          sortedEvents = this._events.slice().sort((a, b) => a.price - b.price);
          break;
        case SortType.DEFAULT:
          sortedEvents = this._events.slice(0, this._events.length());
          break;
      }
      tripContentElement.innerHTML = ``;
      this._showedEvents = renderEvents(sortedEvents, tripContentElement, this._onDataChange, this._onViewChange);
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

  _onViewChange() {
    this._showedEvents.forEach((it) => it.setDefaultView());
  }

}
