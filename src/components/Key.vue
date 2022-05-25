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
    this.keyAudio.play();
    this.pressLetter(this.letter);
  }

  get cssProps(): { [key: string]: string } {
    return {
      "--background-color": this.color,
      "--font-color": this.color,
    };
  }
  get keySound(): string {
    return require("@/assets/letters/" + this.letter + ".mp3");
  }
  get keyAudio(): HTMLAudioElement {
    return new Audio(this.keySound);
  }
}
</script>

<style scoped>
.letter {
  padding: 0 10px 0 10px;
  margin: 10px;
  background-color: #eee;
  color: var(--font-color);
  min-width: 60px;
  min-height: 60px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.5rem;
}

.letter:hover {
  background-color: #ccc;
}

@media screen and (max-width: 800px) {
  .letter {
    min-width: 30px;
    min-height: 30px;
  }
}
</style>
