import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {render, replace, RenderPosition} from '../utils/render.js';

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }
  renderEvent(event) {
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventComponent.setEventClickHandler(() => {
      this._changeEventOnEventEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setEventEditSubmitHandler(() => {
      this._changeEventEditOnEvent();
      this.rerender();
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _changeEventEditOnEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    this._eventEditComponent.rerender();
  }

  _changeEventOnEventEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._changeEventEditOnEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
