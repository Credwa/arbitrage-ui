import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    ARSRate: null,
    AUDRate: null,
    MXNRate: null,
  },
  getters: {
    getARSRate: state => state.ARSRate,
    getAUDRate: state => state.AUDRate,
    getMXNRate: state => state.MXNRate,
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
  },
});
