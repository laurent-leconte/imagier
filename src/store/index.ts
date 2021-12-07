import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    letters: Array<string>(),
  },
  getters: {
    currentWord(state): string {
      return state.letters.join("");
    },
  },
  mutations: {
    pushLetter(state, letter: string) {
      state.letters = [...state.letters, letter];
    },
  },
  actions: {},
  modules: {},
});
