<template>
  <div>
    <img :src="imageUrl" @click="playSound" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import { Image } from "@/models";

@Component({
  computed: {
    ...mapState({
      image: "currentImage",
    }),
  },
})
export default class ImageDisplay extends Vue {
  image!: Image;
  get imageUrl(): string {
    return require("@/assets/images/images/" + this.image.image);
  }
  get imageLabel(): string {
    return this.image.label.toUpperCase();
  }
  // imageSound is only used in imageAudio, but refactoring the 2 methods in one yields a linter error "require not in import"
  get imageSound(): string {
    return require("@/assets/images/sounds/" + this.image.sound);
  }
  get imageAudio(): HTMLAudioElement {
    return new Audio(this.imageSound);
  }

  playSound(): void {
    this.imageAudio.play();
  }

  @Watch("image")
  onImageChanged = (): void => {
    this.playSound();
  };
}
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 400px;
}

h2 {
  font-size: 2em;
}
</style>
