import moment from 'moment';

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const futurePoints = (events, today) => {
  return events.filter((event) => (moment(event.dateStart).isAfter(moment(today))));
};

const pastPoints = (events, today) => {
  return events.filter((event) => (moment(event.dateEnd).isBefore(moment(today))));
};

const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.PAST:
      return pastPoints(points, nowDate);
    case FilterType.FUTURE:
      return futurePoints(points, nowDate);
  }
  return points;
};

export {FilterType, futurePoints, pastPoints, getPointsByFilter};
