import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null as string | null,
  },
  mutations: {
    updateToken(state, payload: string) {
      state.token = payload;
    },
  },
  actions: {
    saveToken({ commit }, token: string) {
      commit('updateToken', token);
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
