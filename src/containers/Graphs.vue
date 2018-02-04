<template>
  <v-container text-xs-center fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center wrap column justify-space-between>
          <v-form ref="form" lazy-validation class="select">
            <v-select
              label="Graph"
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              required
              ref='graphSelect'
            ></v-select>
        </v-form>
        <div class="graph">
          <graph :chartData="chartData" :options="chartOptions" class="graphs"> </graph>
          <v-progress-circular v-bind:size="250" v-bind:width="2" v-if="loading" indeterminate color="primary"></v-progress-circular>
        </div>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Graph from './../components/Graph';

export default {
  components: {
    Graph,
  },
  data() {
    return {
      select: 'BTC-MXN',
      items: [
        'BTC-MXN',
        'ETH-MXN',
        'BCH-MXN',
        'LTC-MXN',
        'XRP-MXN',
        'BTC-ARS',
        'ETH-ARS',
      ],
      loading: false,
      histData: null,
      moment,
      chartWidth: 800,
      chartHeight: 600,
      chartOptions: {
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        pan: {
          // Boolean to enable panning
          enabled: true,

          // Panning directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow panning in the y direction
          mode: 'x',
        },
        // Container for zoom options
        zoom: {
          // Boolean to enable zooming
          enabled: true,

          // Zooming directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow zooming in the y direction
          mode: 'xy',
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
      chartData: null,
    };
  },
  methods: {
    formatDataForGraph(histData) {
      const keys = Object.keys(histData);
      const newDataSet = {
        labels: [],
        datasets: [
          {
            label: 'USD Prices',
            data: [],
            backgroundColor: 'rgba(49, 204, 236, 0.3)',
            borderColor: 'rgba(40, 190, 255, 1)',
            borderWidth: 2,
            fill: false,
            hidden: true,
          },
          {
            label: 'Foreign Exchange',
            data: [],
            backgroundColor: 'rgba(236, 204, 49, 0.3)',
            borderColor: 'rgba(255, 190, 40, 1)',
            borderWidth: 2,
            fill: false,
            hidden: true,
          },
          {
            label: 'Foreign Exchange USD',
            data: [],
            backgroundColor: 'rgba(59, 255, 49, 0.3)',
            borderColor: 'rgba(59, 255, 40, 1)',
            borderWidth: 2,
            fill: false,
            hidden: true,
          },
          {
            label: 'Spread',
            data: [],
            backgroundColor: 'rgba(236, 204, 155, 0.3)',
            borderColor: 'rgba(255, 190, 255, 1)',
            borderWidth: 2,
            fill: false,
            hidden: true,
          },
          {
            label: 'Spread %',
            data: [],
            backgroundColor: 'rgba(236, 49, 204, 0.3)',
            borderColor: 'rgba(255, 40, 190, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      };
      keys.forEach((element) => {
        newDataSet.labels.push(
          moment(histData[element].time).format('MM-dd HH:mm'),
        );
        newDataSet.datasets[0].data.push(histData[element].USDPrice);
        newDataSet.datasets[1].data.push(
          histData[element].foreignExchangePrice,
        );
        newDataSet.datasets[2].data.push(
          histData[element].foreignExchangePriceUSD,
        );
        newDataSet.datasets[3].data.push(histData[element].spread);
        newDataSet.datasets[4].data.push(histData[element].spreadPercentage);
      });
      this.chartData = newDataSet;
    },
  },
  computed: {
    getChartData() {
      return this.chartData;
    },
  },
  watch: {
    select() {
      this.loading = true;
      const graph = this.select.split('-');
      axios
        .get(`https://shielded-oasis-26232.herokuapp.com/historical/${graph[0]}/${graph[1]}`)
        .then((data) => {
          this.histData = data.data;
          this.formatDataForGraph(data.data);
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
  },
  mounted() {
    this.chartWidth = window.innerWidth * 0.95;
    this.chartHeight = window.innerHeight * 0.7;
    const graph = this.select.split('-');
    this.loading = true;
    axios
      .get(`https://shielded-oasis-26232.herokuapp.com/historical/${graph[0]}/${graph[1]}`)
      .then((data) => {
        this.histData = data.data;
        this.formatDataForGraph(data.data);
        this.loading = false;
      })
      .catch((e) => {
        console.log(e);
        this.loading = false;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  width:90%;
}

.select {
  min-width: 10vw;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
