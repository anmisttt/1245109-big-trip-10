import {getDate, getTime, getRandomIntegerNumber} from '../utils/common.js';
import {EventConsts} from '../const.js';

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const generateOffers = (offers) => {
  return offers
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const generatePhotos = () => {
  return new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

const generateDescription = (description) => {
  return description
    .filter(() => Math.random() > 0.5).slice(0, 3);
};

const generateEvent = () => {
  const startDate = getDate();
  const endDate = getDate();
  const startTime = getTime(startDate);
  const endTime = getTime(endDate);
  const randomType = getRandomArrayItem(EventConsts.Types);
  return {
    id: String(new Date() + Math.random()),
    transportTypes: EventConsts.Types.slice(0, 6),
    activityTypes: EventConsts.Types.slice(7, 10),
    type: randomType,
    icon: `img/icons/${randomType}.png`,
    towns: EventConsts.Towns,
    town: getRandomArrayItem(EventConsts.Towns),
    photos: generatePhotos(),
    descriptionList: EventConsts.Descriptions,
    description: new Array(generateDescription(EventConsts.Descriptions)),
    price: getRandomIntegerNumber(1, 100),
    offers: new Set(generateOffers(EventConsts.Offers)),
    offersList: EventConsts.Offers,
    dateStart: startDate,
    dateEnd: endDate,
    timeStart: startTime,
    timeEnd: endTime,
  };
};

const generateEvents = (count) => {
  return new Array(count).fill(``).map(generateEvent);
};

export {
  generateEvents,
  generateDescription,
  generateOffers,
  generatePhotos
};
