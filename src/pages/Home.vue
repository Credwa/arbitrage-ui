<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center wrap column justify-space-between v-if="!loading">
        <v-flex xs12 sm6 class="py-2">
            <v-btn-toggle  active-class="exchangeActive" v-model="activeExchange">
              <v-btn flat value="MXN" color="blue">
                MXN
              </v-btn>
              <v-btn flat value="ARS" color="green">
                ARS
              </v-btn>
              <v-btn flat value="AUD" color="red">
                AUD
              </v-btn>
            </v-btn-toggle>
            <v-chip color="primary"><span style="color:white">{{getBestArb.exchange}}-{{getBestArb.symbol}}: {{getBestArb.spreadPercentage || 0}}% | ${{getBestArb.spread}}</span></v-chip>
          </v-flex>
        <v-layout row>
          <h1 v-if="activeExchange === 'MXN'">Mexican Peso Exchange Rate: <span style="color:#2e7d32">$1.000 - {{getMXNRate}} MXN</span></h1>

          <h1 v-if="activeExchange === 'ARS'">Argentine Peso Exchange Rate: <span style="color:#2e7d32">$1.000 - {{getARSRate}} ARS</span></h1>

          <h1 v-if="activeExchange === 'AUD'">Austrailian Dollar Exchange Rate: <span style="color:#2e7d32">$1.000 - {{getAUDRate}} AUD</span></h1>
        </v-layout>
        <v-layout row wrap justify-space-between>
          <arbitrage  v-show="activeExchange === 'MXN'" v-for="arbitrage in MXNArbitrage" :arbitrage="arbitrage" :key="arbitrage.time" ></arbitrage>

          <arbitrage  v-show="activeExchange === 'ARS'" v-for="arbitrage in ARSArbitrage" :key="arbitrage.time" :arbitrage="arbitrage"></arbitrage>

          <arbitrage  v-show="activeExchange === 'AUD'" v-for="arbitrage in AUDArbitrage" :key="arbitrage.time" :arbitrage="arbitrage"></arbitrage>
        </v-layout>
      </v-layout>
    <div class="spinner" v-if="loading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import axios from 'axios';
import Arbitrage from '../components/Arbitrage';

const db = require('../config/firebaseInit').db;

export default {
  components: {
    Arbitrage,
  },
  data() {
    return {
      mexicanPesosRate: null,
      argentinePesosRate: null,
      AUDRate: null,
      AUDArbitrage: null,
      MXNArbitrage: null,
      ARSArbitrage: null,
      toggleExchanges: false,
      loading: false,
      text: 'center',
      activeExchange: 'MXN',
    };
  },
  sockets: {},
  watch: {
    MXNArbitrage() {
      Object.keys(this.MXNArbitrage || Object()).forEach((arb) => {
        this.setBestArb(this.MXNArbitrage[arb] || Object());
      });
    },
    ARSArbitrage() {
      Object.keys(this.ARSArbitrage || Object()).forEach((arb) => {
        this.setBestArb(this.ARSArbitrage[arb] || Object());
      });
    },
    AUDArbitrage() {
      Object.keys(this.MXNArbitrage || Object()).forEach((arb) => {
        this.setBestArb(this.AUDArbitrage[arb] || Object());
      });
    },
  },
  methods: {
    ...mapMutations([
      'setARSRate',
      'setMXNRate',
      'setAUDRate',
      'setBestArb',
      'setUserAlert',
    ]),
    shortenCurrencyName(value) {
      if (value === 'Mexican Pesos') {
        return 'MXN';
      } else if (value === 'Argentine Pesos') {
        return 'ARS';
      }
      return 'AUD';
    },
  },
  computed: {
    ...mapGetters([
      'getARSRate',
      'getMXNRate',
      'getAUDRate',
      'getBestArb',
      'getCurrentUser',
    ]),
    highestSpread() {
      const all = {
        ...this.ARSArbitrage,
        ...this.MXNArbitrage,
        ...this.AUDArbitrage,
      };
      Object.keys(all).forEach((arb) => {
        this.setBestArb(all[arb] || Object());
      });
    },
  },
  mounted() {
    this.loading = true;
    axios
      .get(`${this.$API_URL}/latest/MXN`)
      .then((data) => {
        this.MXNArbitrage = data.data;
        this.setMXNRate(
          data.data[0].exchangeRate.toLocaleString(undefined, {
            minimumFractionDigits: 3,
          }),
        );
        this.loading = false;
      })
      .catch((e) => {
        console.log(e);
        this.loading = false;
      });

    axios
      .get(`${this.$API_URL}/latest/ARS`)
      .then((data) => {
        this.ARSArbitrage = data.data;
        this.setARSRate(data.data[0].exchangeRate);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`${this.$API_URL}/latest/AUD`)
      .then((data) => {
        this.AUDArbitrage = data.data;
        this.setAUDRate(data.data[0].exchangeRate);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      db
        .collection('users')
        .doc(this.getCurrentUser.uid)
        .collection('active-alerts')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.setUserAlert(doc.data());
          });
        });
    }, 2000);
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

.exchangeActive {
  color: red;
}

.btn--active {
  background: blue;
}
</style>
