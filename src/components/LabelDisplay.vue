<template>
  <div>
    <h2>
      <span
        v-for="(letter, index) in label"
        :key="index"
        :class="{ active: currentIndex === index }"
        :style="cssProps"
      >
        {{ letter }}
      </span>
    </h2>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters } from "vuex";
import { rainbow } from "@/services/constants";

@Component({
  computed: {
    ...mapState(["currentIndex"]),
    ...mapGetters({
      label: "currentLabel",
      currentLetter: "currentLetter",
    }),
  },
})
export default class LabelDisplay extends Vue {
  currentLetter!: string;
  get cssProps(): { [key: string]: string } {
    return {
      "--background-color": rainbow[this.currentLetter],
    };
  }
}
</script>

<style scoped>
h2 {
  font-size: 3em;
}
.active {
  font-size: 1.5em;
  color: var(--background-color);
}
</style>
