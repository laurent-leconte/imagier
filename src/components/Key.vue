<template>
  <button
    type="button"
    ref="button"
    class="letter"
    :class="{ wrong: wrongClick }"
    @click="pushKey"
    :style="cssProps"
  >
    {{ letter }}
  </button>
</template>

<script lang="ts">
import { mapActions, mapState, mapMutations } from "vuex";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  methods: {
    ...mapActions(["pressLetter"]),
    ...mapMutations(["updateWrongLetter"]),
  },
  computed: {
    ...mapState({
      wrongLetter: "wrongLetter",
    }),
  },
})
export default class Key extends Vue {
  @Prop() private letter!: string;
  @Prop() private color!: string;

  private wrongClick = false;

  // declare the dynamically-loaded methods and objects
  pressLetter!: (letter: string) => void;
  updateWrongLetter!: (letter: string) => void;
  wrongLetter!: string;

  mounted(): void {
    // this resets the animation once it's been run, allowing it to fire again
    (this.$refs.button as HTMLElement).addEventListener("animationend", () => {
      this.wrongClick = false;
      this.updateWrongLetter("");
    });
  }

  pushKey(): void {
    // this.wrongClick = true;
    this.keyAudio.play();
    this.pressLetter(this.letter);
  }

  @Watch("wrongLetter")
  onWrongImageChanged(value: string): void {
    console.log(`Watcher called from ${this.letter} with value ${value}`);
    if (this.letter === this.wrongLetter) {
      this.wrongClick = true;
    }
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

.wrong {
  animation: shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
