<template>
  <div id="app">
    <div id="app-header">
      <h1>Title</h1>
    </div>
    <div id="app-body">
      <div id="app-body-left">
        <h2>Left</h2>
      </div>
      <div id="app-body-right">
        <h2>Right</h2>
      </div>
    </div>
    <div id="app-footer">
      <div v-for="letter of alphabet" v-bind:key="letter" class="letter">
        <p>{{ letter }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
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

#app-header {
  border-color: blueviolet;
  border-width: 2px;
  border-style: solid;

}
#app-body {
  border-color: red;
  border-style: solid;
  display: flex;
  flex-direction: row;
  flex: 1 auto;
}
#app-body-left {
  border-color: green;
  border-style: solid;
  min-width: 400px;
  min-height: 400px;
  flex: 1 auto;
}
#app-body-right {
  border-color: orange;
  border-style: solid;
  min-width: 400px;
  flex: 1 auto;
}
#app-footer {
  border-color: purple;
  border-style: solid;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 100px 0 100px;
}

.letter {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  padding: 0 10px 0 10px;
  margin: 10px;
  background-color: #ecf0f1;
  min-width: 50px;
}

@media screen and (max-width: 800px) {
  #app-body {
    flex-direction: column;
  }

  .letter {
    min-width: 30px;
    min-height: 30px;
  }
}

</style>
