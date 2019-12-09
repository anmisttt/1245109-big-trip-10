const Types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`];
const Towns = [`London`, `Tallin`, `Berlin`, `Paris`, `Moscow`];
const DescriptionString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const Descriptions = DescriptionString.split(`. `);
const Offers = [`Add luggage + 10€`, `Switch to comfort class + 150€`, `Add meal + 2€`, `Choose seats + 9€`];

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

const generateEvent = () => {
  return {
    type: `../../markup/img/icons/${getRandomArrayItem(Types)}.png`,
    town: getRandomArrayItem(Towns),
    photo: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: getRandomArrayItem(Descriptions),
    price: getRandomIntegerNumber(1, 100),
    offers: new Set(generateOffers(Offers))
  };
};

const generateEvents = (count) => {
  return new Array(count).fill(``).map(generateEvent);
};

export {
  generateEvent,
  generateEvents
};
