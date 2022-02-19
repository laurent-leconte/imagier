import Vue from "vue";
import Vuex from "vuex";
import images from "@/assets/images.json";
import { Image } from "@/models";

Vue.use(Vuex);

class State {
  imageList: Image[] = images;
  currentImage: Image =
    this.imageList[Math.floor(Math.random() * this.imageList.length)];
  currentIndex = 0;
  currentLabel: string = this.currentImage.label.toLocaleUpperCase();
  guessed: boolean[] = Array(this.currentImage.label.length).fill(false);
}

export default new Vuex.Store({
  state: new State(),
  getters: {
    currentImage(state: State): Image {
      return state.currentImage;
    },
    guessed(state: State): boolean[] {
      return state.guessed;
    },
    currentLabel(state: State): string {
      return state.currentLabel;
    },
  },
  mutations: {
    pushLetter(state: State, letter: string) {
      if (state.currentLabel.charAt(state.currentIndex) === letter) {
        state.guessed[state.currentIndex] = true;
        state.currentIndex++;
      }
    },
    newImage(state: State) {
      state.currentImage =
        state.imageList[Math.floor(Math.random() * state.imageList.length)];
      state.guessed = Array(state.currentImage.label.length).fill(false);
      state.currentIndex = 0;
    },
  },
  actions: {},
  modules: {},
});
