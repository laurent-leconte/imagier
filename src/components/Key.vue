<template>
  <button type="button" class="letter" @click="pushKey" :style="cssProps">
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
  @Prop() private color!: string;

  pressLetter!: (letter: string) => void; // declare the dynamically-loaded pressLetter method
  pushKey(): void {
    this.pressLetter(this.letter);
  }

  get cssProps(): { [key: string]: string } {
    return {
      "--background-color": this.color,
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.letter {
  padding: 0 10px 0 10px;
  margin: 10px;
  background-color: var(--background-color);
  min-width: 50px;
  min-height: 50px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.2em;
}

@media screen and (max-width: 800px) {
  .letter {
    min-width: 30px;
    min-height: 30px;
  }
}
</style>
