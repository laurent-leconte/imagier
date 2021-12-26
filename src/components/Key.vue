<template>
  <button type="button" class="letter" @click="pushKey">{{ letter }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

@Component
export default class Key extends Vue {
  @Prop() private letter!: string;

  private pushKey() {
    store.commit("pushLetter", this.letter);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.letter {
  padding: 0 10px 0 10px;
  margin: 10px;
  background-color: #ecf0f1;
  min-width: 50px;
  min-height: 50px;
}

@media screen and (max-width: 800px) {
  .letter {
    min-width: 30px;
    min-height: 30px;
  }
}
</style>
