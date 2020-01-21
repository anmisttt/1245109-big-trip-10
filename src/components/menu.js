import AbstractComponent from './abstract-component.js';

export const MenuItem = {
  TABLE: `menu_table`,
  STATS: `menu_stats`,
};

export default class MenuComponent extends AbstractComponent {
  getTemplate() {
    return (`<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn trip-tabs__btn--active" id="menu_table" href="#">Table</a>
              <a class="trip-tabs__btn" id="menu_stats" href="#">Stats</a>
            </nav>`);
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const menuItem = evt.target.id;
      handler(menuItem);
    });
  }
}
