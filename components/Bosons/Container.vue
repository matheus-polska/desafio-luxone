<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
.container {
  width: 90%;
  max-width: 850px;
  margin: 0 auto;
}
</style>
