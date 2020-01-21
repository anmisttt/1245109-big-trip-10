import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import moment from 'moment';
import 'chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels';

const createStatsTemplate = () => {
  return (`<section class="statistics">
          <h2 class="">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`);
};

const createRandomColor = () => {
  const value = Math.floor(Math.random() * 0xffffff);

  return `#${value.toString(16)}`;
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const renderTypes = (events) => {
  return events.map((event) => event.type).filter(getUniqItems);
};

const renderTransportTypes = (events) => {
  const transportTypes = events.map((event) => event.type).filter(getUniqItems);
  return (transportTypes.filter((type) => (type !== `Check-in`) && (type !== `Sightseeing`) && (type !== `Restaurant`)));
};

const countMoney = (events, types) => {
  types.map((type, index) => {
    const trueEvents = events.filter((event) => event.type === type);
    types[index] = trueEvents.reduce((acc, event) => {
      return acc + event.price;
    }, 0);
  });
  return (types);
};

const countTransport = (events, types) => {
  types.map((type, index) => {
    const trueEvents = events.filter((event) => event.type === type);
    types[index] = trueEvents.length;
  });
  return (types);
};

const countTime = (events, types) => {
  types.map((type, index) => {
    const trueEvents = events.filter((event) => event.type === type);
    types[index] = trueEvents.reduce((acc, event) => {
      return acc + moment(event.dateStart).diff(moment(event.dateEnd), `minutes`);
    }, 0);
  });
  return (types);
};

const renderMoneyChart = (moneyCtx, events) => {
  const types = renderTypes(events);
  return new Chart(moneyCtx, {
    // plugins: [window.ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        label: `Сколько денег было потрачено на каждое событие в маршруте`,
        data: countMoney(events, renderTypes(events)),
        backgroundColor: types.map(createRandomColor),
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

const renderTransportChart = (transportCtx, events) => {
  const types = renderTransportTypes(events);
  return new Chart(transportCtx, {
    // plugins: [window.ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        label: `Сколько раз воспользовались данным транспортным средством`,
        data: countTransport(events, renderTransportTypes(events)),
        backgroundColor: types.map(createRandomColor),
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

const renderTimeChart = (timeCtx, events) => {
  const types = renderTypes(events);
  return new Chart(timeCtx, {
    // plugins: [window.ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        label: `Cколько времени было затрачено в определённом типе точки маршрута`,
        data: countTime(events, renderTypes(events)),
        backgroundColor: types.map(createRandomColor),
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

export default class StatsComponent extends AbstractSmartComponent {
  constructor(events) {
    super();
    this._events = events;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChar = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  show() {
    super.show();

    this.rerender(this._events);
  }

  rerender(events) {
    this._events = events;

    super.rerender();

    this._renderCharts();
  }

  recoveryListeners() {}

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, this._events);
    this._transportChart = renderTransportChart(transportCtx, this._events);
    this._timeChart = renderTimeChart(timeCtx, this._events);
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeChart) {
      this._timeChart.destroy();
      this._timeChart = null;
    }
  }
}
