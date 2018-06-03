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
    currentUser: null,
    AUDRate: null,
    MXNRate: null,
    allowAlertCreation: false,
    bestArb: {
      symbol: null,
      exchange: null,
      spreadPercentage: 0,
      spread: 0,
    },
    userAlerts: [],
  },
  getters: {
    getCurrentUser: state => state.currentUser,
    getARSRate: state => state.ARSRate,
    getAUDRate: state => state.AUDRate,
    getMXNRate: state => state.MXNRate,
    getBestArb: state => state.bestArb,
    getUserAlerts: state => state.userAlerts,
    getUserAlert: (state, exchange) =>
      state.userAlerts.find(val => val.exchange === exchange),
  },
  mutations: {
    setCurrentUser: (state, user) => {
      state.currentUser = user;
    },
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
      if (
        arb.spreadPercentage > state.bestArb.spreadPercentage ||
        (shortenCurrencyName(arb.foreignCurrency) === state.bestArb.exchange &&
          arb.symbol === state.bestArb.symbol)
      ) {
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
    setUserAlert: (state, newAlert) => {
      if (!state.userAlerts.find(val => val.exchange === newAlert.exchange)) {
        state.userAlerts.push(newAlert);
      }
    },
    deleteUserAlert: (state, exchange) => {
      state.userAlerts = state.userAlerts.filter(
        val => val.exchange !== exchange,
      );
    },
  },
});
