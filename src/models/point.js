export default class PointModel {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.icon = `img/icons/${data[`type`]}.png`;
    this.price = data[`base_price`];
    this.destination = data[`destination`];
    this.description = data[`destination`].description;
    this.town = data[`destination`].name;
    this.dateStart = data[`date_from`] ? new Date(data[`date_from`]) : null;
    this.dateEnd = data[`date_to`] ? new Date(data[`date_to`]) : null;
    this.offers = Array.from(data[`offers`].map((offer) => {
      if (offer.isChecked === undefined) {
        offer.isChecked = false;
      }
      return offer;
    }));
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.photos = data[`destination`].pictures;
  }
  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'base_price': this.price,
      'date_from': this.dateStart ? this.dateStart.toISOString() : null,
      'date_to': this.dateEnd ? this.dateEnd.toISOString() : null,
      'offers': Array.from(this.offers),
      'destination': this.destination,
      'is_favorite': this.isFavorite,
    };
  }

  static parsePoint(data) {
    return new PointModel(data);
  }

  static parsePoints(data) {
    return data.map(PointModel.parsePoint);
  }

  static clone(data) {
    return new PointModel(data.toRAW());
  }
}
