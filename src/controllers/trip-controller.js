import ContentComponent from '../components/content.js';
import NoPointsComponent from '../components/no-points.js';
import SortComponent, {SortType} from '../components/sort.js';
import {render, RenderPosition} from '../utils/render.js';
import PointController, {Mode as EventControllerMode, EmptyPoint} from './point-controller.js';

const HIDDEN_CLASS = `visually-hidden`;

const renderEvents = (events, container, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
    pointController.renderEvent(event, EventControllerMode.DEFAULT);
    return pointController;
  });
};

export default class TripController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._contentComponent = new ContentComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._showedEvents = [];
    this._creatingPoint = null;
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  render() {
    const container = this._container;
    render(container, this._contentComponent, RenderPosition.BEFOREEND);
    const events = this._pointsModel.getPoints();

    const tripContentElement = this._contentComponent.getElement();

    if (events.length === 0) {
      render(tripContentElement, this._noPointsComponent, RenderPosition.BEFOREEND);
    }

    this._showedEvents = renderEvents(events, tripContentElement, this._onDataChange, this._onViewChange);

    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.changeSortTypeHandler((sortType) => {
      let sortedEvents = [];
      switch (sortType) {
        case SortType.TIME:
          sortedEvents = events.slice().sort((a, b) => a.timeStart - b.timeStart);
          break;
        case SortType.PRICE:
          sortedEvents = events.slice().sort((a, b) => a.price - b.price);
          break;
        case SortType.EVENT:
          sortedEvents = events.slice(0, events.length());
          break;
      }
      tripContentElement.innerHTML = ``;
      this._showedEvents = renderEvents(sortedEvents, tripContentElement, this._onDataChange, this._onViewChange);
    });
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const tripContentElement = this._contentComponent.getElement();
    this._creatingPoint = new PointController(tripContentElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.renderEvent(EmptyPoint, EventControllerMode.ADDING);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updateEvents();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.renderEvent(newData, EventControllerMode.DEFAULT);
        this._showedEvents = [].concat(pointController, this._showedEvents);
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updateEvents();
    } else {
      this._api.updatePoint(oldData.id, newData).then((pointModel) => {
        newData.id = oldData.id;
        const isSuccess = this._pointsModel.updatePoints(oldData.id, newData);
        if (isSuccess) {
          pointController.renderEvent(pointModel, EventControllerMode.DEFAULT);
          this._updateEvents();
        }
      });
    }
    // const events = this._pointsModel.getPoints();

    // const index = events.findIndex((it) => it === oldData);

    // if (index === -1) {
    //   return;
    // }

    // events = [].concat(events.slice(0, index), newData, events.slice(index + 1));

    // pointController.renderEvent(events[index]);
  }

  _onViewChange() {
    this._showedEvents.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _updateEvents() {
    this._removePoints();
    this._renderEvents(this._pointsModel.getPoints());
  }

  _renderEvents(events) {
    const tripContentElement = this._contentComponent.getElement();

    const newEvents = renderEvents(events, tripContentElement, this._onDataChange, this._onViewChange);
    this._showedEvents = this._showedEvents.concat(newEvents);
  }

  _removePoints() {
    this._showedEvents.forEach((pointController) => pointController.destroy());
    this._showedEvents = [];
  }

}
