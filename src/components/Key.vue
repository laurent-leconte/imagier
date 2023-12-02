<template>
  <button
    type="button"
    ref="button"
    class="letter"
    :class="{ wrong: wrongClick, right: rightClick }"
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
    ...mapMutations(["updateWrongLetter", "updateRightLetter"]),
  },
  computed: {
    ...mapState({
      wrongLetter: "wrongLetter",
      rightLetter: "rightLetter",
    }),
  },
})
export default class Key extends Vue {
  @Prop() private letter!: string;
  @Prop() private color!: string;

  private wrongClick = false;
  private rightClick = false;

  // declare the dynamically-loaded methods and objects
  pressLetter!: (letter: string) => void;
  updateWrongLetter!: (letter: string) => void;
  updateRightLetter!: (letter: string) => void;
  wrongLetter!: string;
  rightLetter!: string;

  mounted(): void {
    // this resets the animation once it's been run, allowing it to fire again
    (this.$refs.button as HTMLElement).addEventListener("animationend", () => {
      this.wrongClick = false;
      this.rightClick = false;
      /* it's necesary to reset the state here, otherwise the animation won't fire again
        if the same letter is pressed twice in a row */
      this.updateWrongLetter("");
      this.updateRightLetter("");
    });
  }

  pushKey(): void {
    // this.wrongClick = true;
    this.keyAudio.play();
    this.pressLetter(this.letter);
  }

  @Watch("wrongLetter")
  onWrongLetterChanged(value: string): void {
    if (this.letter === value) {
      this.wrongClick = true;
    }
  }

  @Watch("rightLetter")
  onRightLetterChanged(value: string): void {
    console.log(
      `In onRightLetterChanged for ${this.letter} with value ${value}`
    );
    if (this.letter === value) {
      console.log(`In right letter for ${this.letter}`);
      this.rightClick = true;
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

.right {
  animation: explode 0.2s none ease-in;
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

@keyframes explode {
  0% {
    opacity: 1;
  }

  80% {
    transform: scale(1.3);
    opacity: 0;
    box-shadow: 0 0 10px 10px #ff0, 0 0 20px 20px rgb(255, 187, 0);
  }
  100% {
    opacity: 0;
  }
}
</style>
