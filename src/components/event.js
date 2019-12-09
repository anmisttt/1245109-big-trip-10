const createOffersMap = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
    <span class="event__offer-title">${offer}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">20</span>
    </li>`);
  }).join(`/n`);
};

export const createTripEventTemplate = (event) => {

  const {
    type,
    description,
    price,
    offers
  } = event;
  return (`<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src=${type} alt="Event type icon">
                    </div>
                    <h3 class="event__title">${description}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                        &mdash;
                        <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
                      </p>
                      <p class="event__duration">1H 30M</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      ${createOffersMap(offers)}
                    </ul>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`);
};
