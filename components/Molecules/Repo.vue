<template>
  <ul class="repo-list">
    <li v-for="repo in repos" :key="repo.id">
      <div class="repo-name">
        <a :href="repo.html_url">{{ repo.name }}</a>
      </div>
      <div class="repo-details">
        <span class="repo-chip repo-stars"
          >Stars: {{ repo.stargazers_count }}</span
        >
        <span class="repo-chip repo-watch"
          >Watch: {{ repo.watchers_count }}</span
        >
        <span class="repo-chip repo-forks">Forks: {{ repo.forks_count }}</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    repos: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style scoped>
.repo-list {
  display: grid;
  grid-auto-flow: row;
  grid-gap: 0.5rem;
  height: max-content;
}
.repo-list li {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  padding: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 0.313rem;
}
.repo-chip {
  padding: 0.313rem;
  color: white;
  font-size: 0.825rem;
}
.repo-stars {
  background: #ffc107;
}
.repo-watch {
  background: #6c757d;
}
.repo-forks {
  background: #198754;
}
</style>
