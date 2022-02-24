import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import images from "@/assets/images.json";
import { Image } from "@/models";

Vue.use(Vuex);

class State {
  imageList: Image[] = images;
  currentImage: Image =
    this.imageList[Math.floor(Math.random() * this.imageList.length)];
  currentIndex = 0;
  guessed: boolean[] = Array(this.currentImage.label.length).fill(false);
}

type Context = ActionContext<State, State>;

export default new Vuex.Store({
  state: new State(),
  getters: {
    currentLabel(state: State): string {
      return state.currentImage.label.toLocaleUpperCase();
    },
    currentLetter(state: State, getters): string {
      return getters.currentLabel[state.currentIndex];
    },
    is_won(state: State, getters): boolean {
      return state.currentIndex === getters.currentLabel.length;
    },
  },
  mutations: {
    incrementGuessed(state: State) {
      state.guessed[state.currentIndex] = true;
      state.guessed = [...state.guessed];
      state.currentIndex++;
    },
    newImage(state: State) {
      state.currentImage =
        state.imageList[Math.floor(Math.random() * state.imageList.length)];
      state.guessed = Array(state.currentImage.label.length).fill(false);
      state.currentIndex = 0;
    },
  },
  actions: {
    pressLetter({ getters, commit }: Context, letter: string) {
      if (getters.currentLetter === letter) {
        commit("incrementGuessed");
      }
      if (getters.is_won) {
        setTimeout(() => commit("newImage"), 2000);
      }
    },
  },
  modules: {},
});
