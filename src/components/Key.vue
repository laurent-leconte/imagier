<template>
  <button type="button" class="letter" @click="pushKey">
    {{ letter }}
  </button>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  methods: { ...mapActions(["pressLetter"]) },
})
export default class Key extends Vue {
  @Prop() private letter!: string;

  pressLetter!: (letter: string) => void;
  pushKey(): void {
    this.pressLetter(this.letter);
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
  border-radius: 5px;
}

@media screen and (max-width: 800px) {
  .letter {
    min-width: 30px;
    min-height: 30px;
  }
}
</style>
