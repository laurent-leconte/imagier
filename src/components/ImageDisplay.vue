<template>
  <div>
    <h2>{{ imageLabel }}</h2>
    <img :src="imageUrl" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Image } from "@/models";

@Component
export default class ImageDisplay extends Vue {
  get image(): Image {
    return this.$store.getters.currentImage;
  }
  get imageUrl(): string {
    return require("@/assets/images/" + this.image.image);
  }
  get imageLabel(): string {
    return this.image.label.toUpperCase();
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 360px;
}

h2 {
  font-size: 2em;
}
</style>
