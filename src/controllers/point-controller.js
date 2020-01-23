import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import PointModel from '../models/point.js';
import {destinationsApi, offersApi} from '../main.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  type: `taxi`,
  destination: {},
  icon: `img/icons/taxi.png`,
  photos: [],
  price: ``,
  town: ``,
  offers: [],
  dateStart: null,
  dateEnd: null,
};

const parseFormData = (formData, destinations, offers) => {
  const currentType = formData.get(`event-type`);
  return new PointModel({
    'offers': (currentType) ? offers.filter((offer) => offer.type === currentType.toLowerCase()).map((it) => it.offers)[0] : [],
    'type': (currentType) ? currentType.toLowerCase() : ``,
    'destination': destinations.filter((destination) => destination.name === formData.get(`event-destination`))[0],
    'base_price': Number(formData.get(`event-price`)),
    'date_from': formData.get(`event-start-time`) ? new Date(formData.get(`event-start-time`)) : null,
    'date_to': formData.get(`event-end-time`) ? new Date(formData.get(`event-end-time`)) : null,
    'is_favorite': false
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._mode = Mode.DEFAULT;
  }
  renderEvent(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);
    this._mode = mode;

    this._eventComponent.setEventClickHandler(() => {
      this._changeEventOnEventEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      offersApi.then((offer)=>{
        destinationsApi.then((destination)=>{
          const formData = this._eventEditComponent.getData();
          const data = parseFormData(formData, destination, offer);
          this._onDataChange(this, event, data);
        });
      });
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      const newPoint = PointModel.clone(event);
      newPoint.isFavorite = !newPoint.isFavorite;

      this._onDataChange(this, event, newPoint);

    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._changeEventEditOnEvent();
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  _changeEventEditOnEvent() {
    this._eventEditComponent.reset();
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _changeEventOnEventEdit() {
    replace(this._eventEditComponent, this._eventComponent);
    this._onViewChange();
    this._mode = Mode.EDIT;
  }


  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._changeEventEditOnEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._changeEventEditOnEvent();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
