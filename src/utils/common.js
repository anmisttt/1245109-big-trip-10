import moment from 'moment';

const getTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const getInterval = (date1, date2) => {
  const days = moment(date2).diff(moment(date1), `days`);
  const hours = moment(date2).diff(moment(date1), `hours`) - days * 24;
  const minutes = (hours === 0) ? (moment(date2).diff(moment(date1), `minutes`) - days * 24 * 60) : (moment(date2).diff(moment(date1), `minutes`) - hours * 60);
  if (days > 0) {
    return (`${days}d ` + `${hours}h ` + `${minutes}M`);
  } else if (hours > 0) {
    return (`${hours}H ` + `${minutes}M`);
  } else {
    return (`${minutes}M`);
  }
};

const generatePlaceholder = (type) => {
  return ((type === `check-in`) || (type === `sightseeing`) || (type === `restaurant`)) ? `in` : `to`;
};

const removeAllChild = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

export {getTime, getInterval, generatePlaceholder, removeAllChild};
