import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const shortenCurrencyName = (value) => {
  if (value === 'Mexican Pesos') {
    return 'MXN';
  } else if (value === 'Argentine Pesos') {
    return 'ARS';
  }
  return 'AUD';
};

export const store = new Vuex.Store({
  state: {
    ARSRate: null,
    AUDRate: null,
    MXNRate: null,
    bestArb: {
      symbol: null,
      exchange: null,
      spreadPercentage: 0,
      spread: 0,
    },
  },
  getters: {
    getARSRate: state => state.ARSRate,
    getAUDRate: state => state.AUDRate,
    getMXNRate: state => state.MXNRate,
    getBestArb: state => state.bestArb,
  },
  mutations: {
    setARSRate: (state, rate) => {
      state.ARSRate = rate;
    },
    setAUDRate: (state, rate) => {
      state.AUDRate = rate;
    },
    setMXNRate: (state, rate) => {
      state.MXNRate = rate;
    },
    setBestArb: (state, arb) => {
      if (arb.spreadPercentage > state.bestArb.spreadPercentage) {
        state.bestArb.symbol = arb.symbol;
        state.bestArb.exchange = shortenCurrencyName(arb.foreignCurrency);
        state.bestArb.spreadPercentage = arb.spreadPercentage.toLocaleString(
          undefined,
          { minimumFractionDigits: 3 },
        );
        state.bestArb.spread = arb.spread.toLocaleString(undefined, {
          minimumFractionDigits: 3,
        });
      }
    },
  },
});
