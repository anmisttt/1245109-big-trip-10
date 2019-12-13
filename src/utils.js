export const getTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeFormat = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (`${timeFormat(hours)}:${timeFormat(minutes)}`);
};

export const fromSecToDate = (sec) => {
  const date = new Date(0, 0, 1);
  date.setSeconds(sec);
  return date;
};

export const getInterval = (date1, date2) => {
  let interval = 60 * (24 * (date2.getDate() - date1.getDate()) + date2.getHours() - date1.getHours()) + date2.getMinutes() - date1.getMinutes();
  let formatInterval;
  if (interval < 60) {
    formatInterval = `${interval}M`;
  } else if (interval < 24 * 60) {
    formatInterval = `${date2.getHours() - date1.getHours()}H ${date2.getMinutes() - date1.getMinutes()}M`;
  } else {
    formatInterval = `${date2.getDate() - date1.getDate()}D ${date2.getHours() - date1.getHours()}H ${date2.getMinutes() - date1.getMinutes()}M`;
  }
  return (formatInterval);
};

export const getDate = () => {
  const year = 1970 + Math.floor(19 * Math.random());
  const month = Math.floor(12 * Math.random());
  const day = 1 + Math.floor(31 * Math.random());
  const hour = Math.floor(24 * Math.random());
  const minute = Math.floor(60 * Math.random());

  return new Date(year, month, day, hour, minute);
};

export const printDate = (date) => {
  const dateFormat = (value) => {
    return value < 10 ? `0${value}` : `${value}`;

  };
  return (`${dateFormat(date.getDate())}/${dateFormat(date.getMonth())}/${dateFormat((date.getFullYear()) % 100)}`);
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

