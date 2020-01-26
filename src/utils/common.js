import moment from 'moment';

export const getTime = (date) => {
  return moment(date).format(`HH:MM`);
};

export const getInterval = (date1, date2) => {
  const interval = moment(date2).diff(moment(date1), `minutes`);
  let formatInterval = interval;
  if (interval < 60) {
    formatInterval = `${moment(interval).format(`mm`)}M`;
  } else if (interval < 24 * 60) {
    formatInterval = `${moment(interval).format(`hh`)}h ` + `${moment(interval).format(`mm`)}M`;
  } else {
    formatInterval = `${moment(interval).format(`DD`)}d ` + `${moment(interval).format(`hh`)}h ` + `${moment(interval).format(`mm`)}M`;
  }
  return (formatInterval);
};

export const getDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

export const printDate = (date) => {
  return moment(date).format(`dd/mm/yy HH:MM`);
};
