import {getDate, getTime, fromSecToDate} from '../utils/common.js';

const EventConsts = {
  Types: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`],
  Towns: [`London`, `Tallin`, `Berlin`, `Paris`, `Moscow`],
  Descriptions: (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Cras aliquet varius magna, non porta ligula feugiat eget. 
  Fusce tristique felis at fermentum pharetra. 
  Aliquam id orci ut lectus varius viverra. 
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. 
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. 
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`).split(`. `),
  Offers: [`Add luggage + 10€`, `Switch to comfort class + 150€`, `Add meal + 2€`, `Choose seats + 9€`]
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const generateOffers = (offers) => {
  return offers
    .filter(() => Math.random() > 0.5)
    .slice(0, 2);
};

const generateDescription = (description) => {
  return description
  .filter(() => Math.random() > 0.5).slice(0, 3);
};

const generatePhotos = () => {
  return new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

const generateEvent = () => {
  const startDate = getDate();
  const endDate = fromSecToDate(+startDate + +getDate());
  const startTime = getTime(startDate);
  const endTime = getTime(endDate);
  const randomType = getRandomArrayItem(EventConsts.Types);
  return {
    transportTypes: EventConsts.Types.slice(0, 6),
    activityTypes: EventConsts.Types.slice(7, 10),
    type: randomType,
    icon: `img/icons/${randomType}.png`,
    towns: EventConsts.Towns,
    town: getRandomArrayItem(EventConsts.Towns),
    photos: generatePhotos(),
    description: new Array(generateDescription(EventConsts.Descriptions)),
    price: getRandomIntegerNumber(1, 100),
    offers: new Set(generateOffers(EventConsts.Offers)),
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
  generateEvents
};
