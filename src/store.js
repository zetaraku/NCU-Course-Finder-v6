/* eslint-disable no-param-reassign */
import * as Vuex from 'vuex';

const store = Vuex.createStore({
  state() {
    return {
    };
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  plugins: import.meta.env.DEV ? [Vuex.createLogger()] : [],
});

export default store;
