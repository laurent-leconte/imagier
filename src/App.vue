<template>
  <div id="app">
    <div id="app-header">
      <h1>😻 Imagier 🦄</h1>
    </div>
    <div id="app-body">
      <div id="app-body-left">
        <image-display />
      </div>
      <div id="app-body-right">
        <label-display />
        <guess-panel />
      </div>
    </div>
    <div id="app-footer">
      <div id="keyboard">
        <key
          v-for="letter of alphabet"
          v-bind:key="letter"
          v-bind:letter="letter"
          v-bind:color="rainbow[letter]"
        >
        </key>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import { alphabet, darkRainbow } from "@/services/constants";
import Key from "@/components/Key.vue";
import ImageDisplay from "@/components/ImageDisplay.vue";
import LabelDisplay from "@/components/LabelDisplay.vue";
import GuessPanel from "@/components/GuessPanel.vue";

@Component({
  components: {
    Key,
    ImageDisplay,
    GuessPanel,
    LabelDisplay,
  },
  computed: { ...mapGetters(["is_won"]) },
  methods: { ...mapActions(["pressLetter"]) },
})
export default class App extends Vue {
  alphabet = alphabet; // maps the imported alphabet constant to a property that can be accessed from the template
  rainbow = darkRainbow;
  is_won!: boolean;
  pressLetter!: (letter: string) => void;

  mounted(): void {
    window.addEventListener("keypress", (e) => {
      const key = e.key.toUpperCase();
      if (alphabet.includes(key)) {
        this.pressLetter(key);
      }
    });
  }

  @Watch("is_won")
  onWonChanged = (newval: boolean): void => {
    if (newval) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$confetti.start();
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$confetti.stop();
    }
  };
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app-body {
  display: flex;
  flex-direction: row;
  flex: 1 auto;
}
#app-body-left {
  min-width: 400px;
  min-height: 400px;
  max-width: 50%;
  flex: 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#app-body-right {
  min-width: 400px;
  flex: 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
#app-footer {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 100px 0 100px;
}

#keyboard {
  margin: 0 auto;
  max-width: 800px;
}

@media screen and (max-width: 820px) {
  #app-body {
    flex-direction: column;
  }
  #app-body-left {
    max-width: 100%;
  }
  #app-footer {
    padding: 0;
  }
}
</style>
