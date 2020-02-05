import moment from 'moment';
import ContentComponent from '../components/content.js';
import TripInfoComponent from '../components/trip-info.js';
import NoPointsComponent from '../components/no-points.js';
import DayComponent from '../components/day.js';
import SortComponent, {SortType} from '../components/sort.js';
import {render, RenderPosition} from '../utils/render.js';
import PointController, {Mode as EventControllerMode} from './point-controller.js';
import {removeAllChild, getEmptyPoint} from '../utils/common.js';

const HIDDEN_CLASS = `visually-hidden`;

const renderEvents = (eventDays, container, onDataChange, onViewChange) => {
  const points = [];
  removeAllChild(container);
  Object.entries(eventDays).forEach(([date, events], index) => {
    if (!events.length) {
      return;
    }
    const dayComponent = new DayComponent(date, (index + 1));
    const dayContainer = dayComponent.getElement().querySelector(`.trip-events__list`);

    events.forEach((event) => {
      const pointController = new PointController(dayContainer, onDataChange, onViewChange);
      pointController.renderEvent(event, EventControllerMode.DEFAULT);
      points.push(pointController);
    });
    render(container, dayComponent, RenderPosition.BEFOREEND);
  });

  return points;
};


export default class TripController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._contentComponent = new ContentComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._tripInfoComponent = new TripInfoComponent(this._pointsModel);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._showedEvents = [];
    this._creatingPoint = null;
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);

    this._sortType = SortType.EVENT;
    this._tripContentElement = this._contentComponent.getElement();
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  generateDays(events) {
    const days = {};

    events.forEach((event) => {
      const data = moment(event.dateStart).format(`DD/MM/YYYY`);

      if (data in days) {
        days[data].push(event);
      } else {
        days[data] = [];
        days[data].push(event);
      }
    });

    return days;
  }

  render() {
    const mainTripElement = document.querySelector(`.trip-main`);

    render(mainTripElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    const container = this._container;
    render(container, this._contentComponent, RenderPosition.BEFOREEND);

    const events = this._pointsModel.getPoints();

    if (events.length === 0) {
      render(this._tripContentElement, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      const eventDays = this.generateDays(events);

      this._showedEvents = renderEvents(eventDays, this._tripContentElement, this._onDataChange, this._onViewChange);
    }

    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.changeSortTypeHandler((sortType) => {
      const points = this._pointsModel.getPoints();

      this.sort(points, sortType);

    });
  }

  sort(points, sortType) {
    if (points.length === 0) {
      render(this._tripContentElement, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      let sortedEvents = [];
      let date = null;
      switch (sortType) {
        case SortType.TIME:
          sortedEvents = points.slice().sort((b, a) => moment(a.dateEnd).diff(moment(a.dateStart)) - moment(b.dateEnd).diff(moment(b.dateStart)));
          date = null;
          this._sortType = SortType.TIME;
          break;
        case SortType.PRICE:
          sortedEvents = points.slice().sort((a, b) => b.price - a.price);
          date = null;
          this._sortType = SortType.PRICE;
          break;
        case SortType.EVENT:
          sortedEvents = points.slice().sort((a, b) => moment(a.dateStart).diff(moment(b.dateStart)));
          date = sortedEvents[0].dateStart;
          this._sortType = SortType.EVENT;
          break;
      }
      this._tripContentElement.innerHTML = ``;
      sortedEvents = (date === null) ? {
        'false': sortedEvents
      } : this.generateDays(sortedEvents);
      this._showedEvents = renderEvents(sortedEvents, this._tripContentElement, this._onDataChange, this._onViewChange);
    }
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }
    this._creatingPoint = new PointController(this._tripContentElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.renderEvent(getEmptyPoint(), EventControllerMode.ADDING);
  }

  _onDataChange(pointController, oldData, newData) {
    if (this._isEmptyObject(oldData.destination)) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updateEvents();
        this._tripInfoComponent.rerender(this._pointsModel);
      } else {
        this._api.createPoint(newData).then((pointModel) => {
          this._pointsModel.addPoint(pointModel);
          this._tripInfoComponent.rerender(this._pointsModel);
          pointController.renderEvent(pointModel, EventControllerMode.DEFAULT);
          this._updateEvents();
        })
        .catch(() => {
          pointController.shake();
        });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
      .then(() => {
        this._pointsModel.removePoint(oldData.id);
        this._updateEvents();
        this._tripInfoComponent.rerender(this._pointsModel);
      })
      .catch(() => {
        pointController.shake();
      });
    } else {
      this._api.updatePoint(oldData.id, newData).then((pointModel) => {
        newData.id = oldData.id;
        const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
        if (isSuccess) {
          pointController.renderEvent(pointModel, EventControllerMode.DEFAULT);
          this._updateEvents();
        }
        this._tripInfoComponent.rerender(this._pointsModel);
      })
      .catch(() => {
        pointController.shake();
      });
    }
  }

  _isEmptyObject(obj) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }

  _onViewChange() {
    this._showedEvents.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _updateEvents() {
    this._removePoints();
    this.sort(this._pointsModel.getPoints(), this._sortType);
  }

  _removePoints() {
    this._showedEvents.forEach((pointController) => pointController.destroy());
    this._showedEvents = [];
  }

}
