import moment from 'moment';

export const getTime = (date) => {
  return moment(date).format(`HH:MM`);
};

export const getInterval = (date1, date2) => {
  const days = moment(date2).diff(moment(date1), `days`);
  const hours = moment(date2).diff(moment(date1), `hours`) - days * 24;
  const minutes = moment(date2).diff(moment(date1), `minutes`) - hours * 60;
  if (days > 0) {
    return (`${days}d ` + `${hours}h ` + `${minutes}M`);
  } else if (hours > 0) {
    return (`${hours}H ` + `${minutes}M`);
  } else {
    return (`${minutes}M`);
  }
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
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export const generatePlaceholder = (type) => {
  return ((type === `Check-in`) || (type === `Sightseeing`) || (type === `Restaurant`)) ? `in` : `to`;
};
