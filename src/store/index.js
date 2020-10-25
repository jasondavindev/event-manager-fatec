import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: null,
      password: '',
    },
  },
  actions: {
    setUser({ state }, { id, name, password }) {
      state.user.name = name;
      state.user.id = id;
      state.user.password = password;
    },
    clearSession({ state }) {
      state.user = {};
    },
  },
  mutations: {},
  getters: {
    user: state => state.user,
  },
});
