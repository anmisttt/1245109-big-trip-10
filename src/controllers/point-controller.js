import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import PointModel from '../models/point.js';
import {destinationsApi, offersApi} from '../main.js';
import {getRandomIntegerNumber} from '../utils/common.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  id: `${getRandomIntegerNumber(20, 1000)}`,
  type: `taxi`,
  destination: {},
  icon: `img/icons/taxi.png`,
  photos: [],
  price: ``,
  town: ``,
  offers: [],
  dateStart: new Date(),
  dateEnd: new Date(),
  isFavorite: false
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const parseFormData = (formData, destinations, offers) => {
  const currentType = formData.get(`event-type`);
  return new PointModel({
    'offers': (currentType) ? offers.filter((offer) => offer.type === currentType.toLowerCase()).map((it) => it.offers)[0] : [],
    'type': (currentType) ? currentType.toLowerCase() : ``,
    'destination': destinations.filter((destination) => destination.name === formData.get(`event-destination`))[0],
    'base_price': Number(formData.get(`event-price`)),
    'date_from': formData.get(`event-start-time`) ? new Date(formData.get(`event-start-time`)) : null,
    'date_to': formData.get(`event-end-time`) ? new Date(formData.get(`event-end-time`)) : null,
    'is_favorite': Boolean(formData.get(`event-favorite`))
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
      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
      });
      offersApi.then((offer)=>{
        destinationsApi.then((destination)=>{
          const formData = this._eventEditComponent.getData();
          const data = parseFormData(formData, destination, offer);
          this._onDataChange(this, event, data);
        });
      });
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });
      this._onDataChange(this, event, null);
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

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
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
