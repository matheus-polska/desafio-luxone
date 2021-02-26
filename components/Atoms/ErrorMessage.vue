<template>
  <p>{{ text }}</p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
p {
  color: red;
  text-align: center;
}
</style>
