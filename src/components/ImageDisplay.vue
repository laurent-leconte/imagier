<template>
  <div>
    <h2>{{ imageLabel }}</h2>
    <img :src="imageUrl" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
