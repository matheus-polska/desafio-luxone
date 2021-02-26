<template>
  <h1 class="main-title center">
    <span class="bold">{{ bold }}</span>
    <span class="italic">{{ italic }}</span>
  </h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    bold: {
      type: String,
      required: true,
    },
    italic: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.main-title {
  font-size: 4rem;
}
.main-title .bold {
  font-weight: 700;
}
.main-title .italic {
  font-style: italic;
  font-weight: 400;
}
@media (max-width: 714px) {
  .main-title {
    font-size: 3rem;
  }
}
</style>
