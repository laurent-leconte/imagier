<template>
  <div class="guessbox">
    <p :class="{ hidden: !visible }">{{ letter }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GuessBox extends Vue {
  @Prop({ default: " " }) readonly letter!: string;
  @Prop({ default: false }) visible!: boolean;
}
</script>

<style scoped>
.hidden {
  display: none;
}

p {
  font-size: 3em;
}
.guessbox {
  border-bottom: thick solid;
  min-height: 80px;
  max-width: 80px;
  flex: 1 auto;
  margin: 0 10px 0 10px;
}
</style>
