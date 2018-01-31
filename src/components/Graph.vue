<template>
  <div>
    <canvas id="histGraph" class="shadow-6" ref='histGraph' :width="chartWidth" :height="chartHeight"></canvas>
  </div>
</template>


<script>
import moment from 'moment';
import Chart from 'chart.js';

export default {
  props: ['chartData'],
  data() {
    return {
      moment,
      USDPrices: [],
      foreignExchangePrices: [],
      foreignExchangePricesUSD: [],
      spreads: [],
      spreadPercentages: [],
      timeLabels: [],
      myChart: '',
      chartHeight: 600,
      chartWidth: 800,
      counter: 0,
    };
  },
  methods: {
    formatDataForGraph(histData) {
      const keys = Object.keys(histData);
      this.USDPrices = [];
      this.timeLabels = [];
      keys.forEach((element) => {
        this.timeLabels.push(
          moment(histData[element].time).format('MM-dd HH:mm'),
        );
        this.USDPrices.push(histData[element].USDPrice);
        this.foreignExchangePrices.push(histData[element].foreignExchangePrice);
        this.foreignExchangePricesUSD.push(
          histData[element].foreignExchangePriceUSD,
        );
        this.spreads.push(histData[element].spread);
        this.spreadPercentages.push(histData[element].spreadPercentage);
      });
    },
  },
  watch: {
    chartData(newVal) {
      this.formatDataForGraph(newVal);
      const ctx = this.$refs.histGraph;
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...this.timeLabels],
          datasets: [
            {
              label: 'USD Prices',
              data: this.USDPrices,
              backgroundColor: 'rgba(49, 204, 236, 0.3)',
              borderColor: 'rgba(40, 190, 255, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Foreign Exchange',
              data: this.foreignExchangePrices,
              backgroundColor: 'rgba(236, 204, 49, 0.3)',
              borderColor: 'rgba(255, 190, 40, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Foreign Exchange USD',
              data: this.foreignExchangePricesUSD,
              backgroundColor: 'rgba(59, 255, 49, 0.3)',
              borderColor: 'rgba(59, 255, 40, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Spread',
              data: this.spreads,
              backgroundColor: 'rgba(236, 204, 155, 0.3)',
              borderColor: 'rgba(255, 190, 255, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Spread %',
              data: this.spreadPercentages,
              backgroundColor: 'rgba(236, 49, 204, 0.3)',
              borderColor: 'rgba(255, 40, 190, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  color: 'rgba(117,117,117,.05)',
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(0,0,0,0)',
                },
              },
            ],
          },
        },
      });
      this.myChart.update({
        type: 'line',
        data: {
          labels: [...this.timeLabels],
          datasets: [
            {
              label: 'USD Prices',
              data: this.USDPrices,
              backgroundColor: 'rgba(49, 204, 236, 0.3)',
              borderColor: 'rgba(40, 190, 255, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Foreign Exchange',
              data: this.foreignExchangePrices,
              backgroundColor: 'rgba(236, 204, 49, 0.3)',
              borderColor: 'rgba(255, 190, 40, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Foreign Exchange USD',
              data: this.foreignExchangePricesUSD,
              backgroundColor: 'rgba(59, 255, 49, 0.3)',
              borderColor: 'rgba(59, 255, 40, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Spread',
              data: this.spreads,
              backgroundColor: 'rgba(236, 204, 155, 0.3)',
              borderColor: 'rgba(255, 190, 255, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Spread %',
              data: this.spreadPercentages,
              backgroundColor: 'rgba(236, 49, 204, 0.3)',
              borderColor: 'rgba(255, 40, 190, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  color: 'rgba(117,117,117,.05)',
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(0,0,0,0)',
                },
              },
            ],
          },
        },
      });
    },
  },
  computed: {
    getHistData() {
      return this.chartData;
    },
  },
  created() {
    this.chartWidth = window.innerWidth * 0.95;
    this.chartHeight = window.innerHeight * 0.7;
  },
};
</script>

<style>

</style>
