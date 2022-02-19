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
        <guess-panel />
      </div>
    </div>
    <div id="app-footer">
      <key
        v-for="letter of alphabet"
        v-bind:key="letter"
        v-bind:letter="letter"
      >
      </key>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Key from "@/components/Key.vue";
import ImageDisplay from "@/components/ImageDisplay.vue";
import GuessPanel from "@/components/GuessPanel.vue";

@Component({
  components: {
    Key,
    ImageDisplay,
    GuessPanel,
  },
})
export default class App extends Vue {
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
}
#app-body-right {
  min-width: 400px;
  flex: 1 auto;
}
#app-footer {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 100px 0 100px;
}

@media screen and (max-width: 800px) {
  #app-body {
    flex-direction: column;
  }
}
</style>
