<template>
  <div class="guess-panel">
    <div class="guess-panel-row">
      <guess
        v-for="(letter, index) in imageLabel"
        :key="index"
        :letter="letter"
        :visible="guessed[index]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { Image } from "@/models";
import GuessBox from "@/components/GuessBox.vue";

@Component({
  components: { GuessBox },
  computed: {
    ...mapState({
      image: "currentImage",
      guessed: "guessed",
    }),
    ...mapGetters({
      imageLabel: "currentLabel",
    }),
  },
})
export default class GuessPanel extends Vue {
  image!: Image;
  imageLabel!: string;
  guessed!: boolean[];
}
</script>

<style scoped>
.guess-panel {
  height: 100%;
  display: flex;
}
.guess-panel-row {
  flex: 1 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  max-height: 120px;
}
</style>
