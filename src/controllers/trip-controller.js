import ContentComponent from '../components/content.js';
import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import NoPointsComponent from '../components/no-points.js';
import SortComponent, {SortType} from '../components/sort.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const renderEvent = (tripContentElement, event) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      changeEventOnEventEdit();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);
  eventComponent.setEventClickHandler(() => {
    changeEventEditOnEvent(eventEditComponent, eventComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const changeEventOnEventEdit = () => {
    replace(eventComponent, eventEditComponent);
  };

  const changeEventEditOnEvent = () => {
    replace(eventEditComponent, eventComponent);
  };

  eventEditComponent.setEventEditSubmitHandler(() => {
    changeEventOnEventEdit();
  });

  render(tripContentElement, eventComponent, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._contentComponent = new ContentComponent();
    this._noPintsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
  }
  render(events) {
    const container = this._container;
    render(container, this._contentComponent, RenderPosition.BEFOREEND);

    const tripContentElement = this._contentComponent.getElement();

    if (events.length === 0) {
      render(tripContentElement, this._noPintsComponent, RenderPosition.BEFOREEND);
    }

    events.forEach((_, index) => {
      renderEvent(tripContentElement, events[index]);
    });

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
      renderEvent(tripContentElement, sortedEvents);
    });
  }

}
