<template>
  <v-container text-xs-center fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center wrap column justify-space-between>
          <v-form ref="form" lazy-validation class="select">
            <v-select
              style="min-width: 10vw"
              label="Graph"
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              required
              ref='graphSelect'
            ></v-select>
            <HotelDatePicker @checkInChanged="checkInChanged($event)" @checkOutChanged="checkOutChanged($event)" :startingDateValue="startDateVal._d"
            :endingDateValue="endDateVal._d"  :startDate="moment().subtract(1, 'years').format('YYYY-MM-DD')" :endDate="moment().startOf('day').add(2, 'days').format('YYYY-MM-DD')" :hoveringTooltip="false"/>
            <v-btn outline color="success" @click="buttonRangeClick('today')">Today</v-btn>
            <v-btn outline color="primary" @click="buttonRangeClick('yesterday')">Yesterday</v-btn>
            <v-btn outline color=""  @click="buttonRangeClick('last7Days')">Last 7 Days</v-btn>
            <v-btn outline color="success"  @click="buttonRangeClick('thisMonth')">This Month</v-btn>
            <v-btn outline color="info"  @click="buttonRangeClick('last30Days')">Last 30 Days</v-btn>
            <v-btn outline color=""  @click="buttonRangeClick('yearToDate')">Year To Date</v-btn>
          </v-form>
        <div class="graph">
          <graph :chartData="chartData" :options="chartOptions" class="graphs"> </graph>
          <div class="spinner" v-if="loading">
            <div class="cube1"></div>
            <div class="cube2"></div>
          </div>
        </div>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import HotelDatePicker from 'vue-hotel-datepicker';

import Graph from './../components/Graph';

export default {
  components: {
    Graph,
    HotelDatePicker,
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
        'BTC-AUD',
        'ETH-AUD',
        'BCH-AUD',
      ],
      startDateVal: moment()
        .startOf('day')
        .subtract(1, 'days'),
      endDateVal: moment()
        .startOf('day')
        .add(1, 'days'),
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
          enabled: false,

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
    checkInChanged(date) {
      this.startDateVal = moment(date);
    },
    checkOutChanged(date) {
      this.endDateVal = moment(date);
    },
    buttonRangeClick(range) {
      if (range === 'today') {
        this.startDateVal = moment().startOf('day');
        this.endDateVal = moment()
          .startOf('day')
          .add(1, 'days');
      } else if (range === 'yesterday') {
        this.startDateVal = moment()
          .startOf('day')
          .subtract(1, 'days');
        this.endDateVal = moment().startOf('day');
      } else if (range === 'last7Days') {
        this.startDateVal = moment()
          .startOf('day')
          .subtract(6, 'days');
        this.endDateVal = moment()
          .startOf('day')
          .add(1, 'days');
      } else if (range === 'thisMonth') {
        this.startDateVal = moment().startOf('month');
        this.endDateVal = moment()
          .startOf('day')
          .add(1, 'days');
      } else if (range === 'last30Days') {
        this.startDateVal = moment()
          .startOf('day')
          .subtract(29, 'days');
        this.endDateVal = moment()
          .startOf('day')
          .add(1, 'days');
      } else if (range === 'yearToDate') {
        this.startDateVal = moment().startOf('year');
        this.endDateVal = moment()
          .startOf('day')
          .add(1, 'days');
      }
      this.loading = true;
      const graph = this.select.split('-');
      axios
        .get(
          `${this.$API_URL}/date-range/${graph[0]}/${
            graph[1]
          }/${this.startDateVal.unix() * 1000}/${this.endDateVal.unix() * 1000}`,
        )
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
          moment(histData[element].time).format('MMM-DD-Y HH:mm'),
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
        .get(
          `${this.$API_URL}/date-range/${graph[0]}/${
            graph[1]
          }/${this.startDateVal.unix() * 1000}/${this.endDateVal.unix() * 1000}`,
        )
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
    endDateVal() {
      this.loading = true;
      const graph = this.select.split('-');
      axios
        .get(
          `${this.$API_URL}/date-range/${graph[0]}/${
            graph[1]
          }/${this.startDateVal.unix() * 1000}/${this.endDateVal.unix() * 1000}`,
        )
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
      .get(
        `${this.$API_URL}/date-range/${graph[0]}/${
          graph[1]
        }/${this.startDateVal.unix() * 1000}/${this.endDateVal.unix() * 1000}`,
      )
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
  width: 90%;
}

.select {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
