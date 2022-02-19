import Vue from "vue";
import Vuex from "vuex";
import images from "@/assets/images.json";
import { Image } from "@/models";

Vue.use(Vuex);

class State {
  letters: string[] = [];
  imageList: Image[] = images;
  currentImage: Image =
    this.imageList[Math.floor(Math.random() * this.imageList.length)];
  guessed: boolean[] = Array(this.currentImage.label.length).fill(true);
}

export default new Vuex.Store({
  state: new State(),
  getters: {
    currentGuess(state: State): string {
      return state.letters.join("");
    },
    currentImage(state: State): Image {
      return state.currentImage;
    },
    guessed(state: State): boolean[] {
      return state.guessed;
    },
  },
  mutations: {
    pushLetter(state: State, letter: string) {
      state.letters = [...state.letters, letter];
    },
    newImage(state: State) {
      state.currentImage =
        state.imageList[Math.floor(Math.random() * state.imageList.length)];
      state.guessed = Array(state.currentImage.label.length).fill(false);
    },
  },
  actions: {},
  modules: {},
});
