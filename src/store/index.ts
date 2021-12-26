import Vue from "vue";
import Vuex from "vuex";
import images from "@/assets/images.json";
import { Image } from "@/models";

Vue.use(Vuex);

class State {
  letters: string[] = [];
  imageList: Image[] = images;
  currentImage: Image = this.imageList[Math.floor(Math.random() * this.imageList.length)];
}

export default new Vuex.Store({
  state: new State(),
  getters: {
    currentWord(state): string {
      return state.letters.join("");
    },
    currentImage(state): Image {
      return state.currentImage;
    }
  },
  mutations: {
    pushLetter(state, letter: string) {
      state.letters = [...state.letters, letter];
    },
    newImage(state) {
      state.currentImage = state.imageList[
        Math.floor(Math.random() * state.imageList.length)
      ];
    }
  },
  actions: {},
  modules: {},
});
