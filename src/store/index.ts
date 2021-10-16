import { createStore } from 'vuex';

const TOKEN_KEY = 'TOKEN';

export default createStore({
  state: {
    token: localStorage.getItem(TOKEN_KEY) as string | null,
  },
  mutations: {
    updateToken(state, payload: string) {
      state.token = payload;

      localStorage.setItem(TOKEN_KEY, payload);
    },
    clearToken(state) {
      state.token = null;

      localStorage.removeItem(TOKEN_KEY);
    },
  },
  actions: {
    login({ commit }, token: string) {
      commit('updateToken', token);
    },
    logout({ commit }) {
      commit('updateToken', null);
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return state.token !== null;
    },
  },
  modules: {
  },
});
