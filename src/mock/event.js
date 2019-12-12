const EventConsts = {
  Types: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`, `Trip`],
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
  return new Array(5).fill(`http://picsum.photos/300/150?r=${Math.random()}`);
};

const getTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeFormat = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (`${timeFormat(hours)}:${timeFormat(minutes)}`);
};

const getInterval = (date1, date2) => {
  const interval = 60 * (24 * (date2.getDate() - date1.getDate()) + date2.getHours() - date1.getHours()) + date2.getMinutes() - date1.getMinutes();
  let formatInterval;
  if (interval < 60) {
    formatInterval = `${interval}M`;
  } else if (interval < 24 * 60) {
    formatInterval = `${date2.getHours() - date1.getHours()}H ${date2.getMinutes() - date1.getMinutes()}M}`;
  } else {
    formatInterval = `${date2.getDate() - date1.getDate()}D ${date2.getHours() - date1.getHours()}H ${date2.getMinutes() - date1.getMinutes()}M`;
  }
  return (formatInterval);
};

const getDate = () => {
  const year = 2000 + Math.floor(19 * Math.random());
  const month = Math.floor(12 * Math.random());
  const day = 1 + Math.floor(31 * Math.random());
  const hour = Math.floor(24 * Math.random());
  const minute = Math.floor(60 * Math.random());

  return new Date(year, month, day, hour, minute);
};

const printDate = (date) => {
  const dateFormat = (value) => {
    return value < 10 ? `0${value}` : `${value}`;

  };
  return (`${dateFormat(date.getDate())}/${dateFormat(date.getMonth())}/${dateFormat((date.getFullYear()) % 100)}`);
};

const generateEvent = () => {
  return {
    type: getRandomArrayItem(EventConsts.Types),
    icon: `img/icons/${getRandomArrayItem(EventConsts.Types)}.png`,
    town: getRandomArrayItem(EventConsts.Towns),
    photos: new Array(generatePhotos()),
    description: new Array(generateDescription(EventConsts.Descriptions)),
    price: getRandomIntegerNumber(1, 100),
    offers: new Set(generateOffers(EventConsts.Offers)),
    dateStart: getDate(),
    dateEnd: getDate(),
    timeStart: getTime(this.dateStart),
    timeEnd: getTime(this.dateEnd),
    interval: getInterval(dateStart, dateEnd)
  };
};

const generateEvents = (count) => {
  return new Array(count).fill(``).map(generateEvent);
};

export {
  generateEvents, printDate
};
