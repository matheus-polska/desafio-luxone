<template>
  <div class="user-info">
    <Profile :user="user" />
    <Repo :repos="repos" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true
    },
    repos: {
      type: Array,
      required: true
    }
  }
})
</script>

<style scoped>
.user-info {
  display: grid;
  grid-template-columns: 190px 1fr;
  grid-gap: 2rem;
}

@media (max-width: 714px) {
  .user-info {
    grid-template-columns: 1fr;
  }
}
</style>
