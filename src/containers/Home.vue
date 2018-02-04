<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center wrap column justify-space-between v-if="!loading">
        <v-switch v-bind:label="`Switch Exchanges`" v-model="toggleExchanges"></v-switch>
        <v-layout row>
          <h1 v-if="!toggleExchanges">Mexican Peso Exchange Rate: <span style="color:#2e7d32">$1.000 - ₱{{mexicanPesosRate}}</span></h1>

          <h1 v-if="toggleExchanges">Argentine Peso Exchange Rate: <span style="color:#2e7d32">$1.000 - ₱{{argentinePesosRate}}</span></h1>
        </v-layout>
        <v-layout row wrap justify-space-between>
          <arbitrage  v-show="!toggleExchanges" v-for="arbitrage in MXNArbitrage" :arbitrage="arbitrage" :key="arbitrage.time" ></arbitrage>

          <arbitrage  v-show="toggleExchanges" v-for="arbitrage in ARSArbitrage" :key="arbitrage.time" :arbitrage="arbitrage"></arbitrage>
        </v-layout>
      </v-layout>
      <v-progress-circular v-bind:size="250" v-bind:width="2" v-if="loading" indeterminate color="primary"></v-progress-circular>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import axios from 'axios';
import Arbitrage from '../components/Arbitrage';

export default {
  components: {
    Arbitrage,
  },
  data() {
    return {
      mexicanPesosRate: null,
      argentinePesosRate: null,
      MXNArbitrage: null,
      ARSArbitrage: null,
      toggleExchanges: false,
      loading: false,
    };
  },
  sockets: {
  },
  created() {
    this.loading = true;
    axios.get('https://shielded-oasis-26232.herokuapp.com/latest/MXN').then((data) => {
      console.log(data.data);
      this.MXNArbitrage = data.data;
      this.mexicanPesosRate = data.data[0].exchangeRate.toLocaleString(undefined, { minimumFractionDigits: 3 });
      this.loading = false;
    }).catch((e) => {
      console.log(e);
      this.loading = false;
    });

    axios.get('https://shielded-oasis-26232.herokuapp.com/latest/ARS').then((data) => {
      console.log(data.data);
      this.ARSArbitrage = data.data;
      this.argentinePesosRate = data.data[0].exchangeRate.toLocaleString(undefined, { minimumFractionDigits: 3 });
    }).catch((e) => {
      console.log(e);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
